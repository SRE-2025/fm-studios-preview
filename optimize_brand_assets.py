"""Encode the existing logo without changing its artwork; create padded web icons."""
from pathlib import Path
from PIL import Image
import base64, json

root=Path(__file__).parent
source=root/'assets/fm-studios-logo.png'
target=root/'docs/assets'
im=Image.open(source).convert('RGB')
web_logo=im.copy(); web_logo.thumbnail((320,320),Image.Resampling.LANCZOS)
web_logo.save(target/'fm-studios-logo.webp', 'WEBP', lossless=True, method=6)
encoded=base64.b64encode((target/'fm-studios-logo.webp').read_bytes()).decode()
(target/'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="56" fill="white"/><image x="40" y="106" width="432" height="300" preserveAspectRatio="xMidYMid meet" href="data:image/webp;base64,'+encoded+'"/></svg>', encoding='utf-8')
icon=Image.new('RGB',(180,180),'white')
logo=im.copy(); logo.thumbnail((154,108),Image.Resampling.LANCZOS)
icon.paste(logo,((180-logo.width)//2,(180-logo.height)//2))
icon.save(target/'apple-touch-icon.png',optimize=True)
print(json.dumps({'original_bytes':source.stat().st_size,'webp_bytes':(target/'fm-studios-logo.webp').stat().st_size,'original_dimensions':im.size}))

favicon=icon.resize((64,64),Image.Resampling.LANCZOS)
favicon.save(target/'favicon.png',optimize=True)
