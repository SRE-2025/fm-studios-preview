from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json

root=Path(__file__).parent/'docs'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.tags=[]; self.h=[]; self.ids=set()
    def handle_starttag(self,tag,attrs):
        a=dict(attrs); self.tags.append((tag,a))
        if tag in ('h1','h2','h3','h4'): self.h.append(int(tag[1]))
        if a.get('id'): self.ids.add(a['id'])
pages={p.name:Page() for p in root.glob('*.html')}
for name,page in pages.items():page.feed((root/name).read_text(encoding='utf-8'))
errors=[]; refs=0
for name,page in pages.items():
    text=(root/name).read_text(encoding='utf-8')
    if page.h.count(1)!=1:errors.append((name,'h1 count'))
    if any(b>a+1 for a,b in zip(page.h,page.h[1:])):errors.append((name,'heading skip',page.h))
    if 'noindex,nofollow,noarchive' not in text:errors.append((name,'indexing directive'))
    if 'id="main" tabindex="-1"' not in text:errors.append((name,'skip target'))
    if '<em>' in text or '?v=5' in text:errors.append((name,'old markup'))
    for tag,a in page.tags:
        if tag=='img' and 'alt' not in a:errors.append((name,'missing alt'))
        if tag=='a' and a.get('target')=='_blank' and 'opens in a new tab' not in (a.get('aria-label','')+text):errors.append((name,'external announcement'))
        for key in ('href','src'):
            if key not in a:continue
            u=urlsplit(a[key]);refs+=1
            if u.scheme or u.netloc:continue
            path=unquote(u.path).removeprefix('/fm-studios-preview/') or name
            if not (root/path).is_file():errors.append((name,'missing file',path))
            elif u.fragment and path in pages and u.fragment not in pages[path].ids:errors.append((name,'missing fragment',path,u.fragment))
    if name=='404.html':
        bad=[a[k] for t,a in page.tags for k in ('href','src') if k in a and not a[k].startswith(('https:','mailto:','tel:','#','/'))]
        if bad:errors.append((name,'relative URLs',bad))
css=(root/'assets/style.css').read_text(encoding='utf-8')
assert '@import' not in css
assert '--feature' not in css
assert '.facebook-slot' not in css
assert '#1470af' in css and '#eaeaee' in css
assert 'localStorage' in (root/'assets/site.js').read_text(encoding='utf-8-sig')
result={'pages':len(pages),'references':refs,'errors':errors}
(root.parent/'audit-validation-results.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result));assert not errors
