(() => {
  const instagramSlot = document.querySelector('.instagram-slot');
  if (instagramSlot) {
    const titleInstagram = () => {
      const frame = instagramSlot.querySelector('iframe');
      if (frame) frame.title = 'FM Studios Music School Instagram profile and recent posts';
    };
    new MutationObserver(titleInstagram).observe(instagramSlot, {childList: true, subtree: true});
    titleInstagram();
  }
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-navigation');
  const close = () => { menu?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('open'); };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); menu?.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) close(); });
  matchMedia('(min-width: 821px)').addEventListener('change', close);
  const copy = document.querySelector('#copy-review');
  copy?.addEventListener('click', async () => {
    const field = document.querySelector('#review-notes');
    const status = document.querySelector('#review-status');
    if (!field.value.trim()) { status.textContent = 'Add your notes above, then copy them to share.'; field.focus(); return; }
    try { await navigator.clipboard.writeText('FM Studios website feedback\n\n' + field.value.trim()); status.textContent = 'Feedback copied. Paste it into your message to Stoneridge Digital.'; }
    catch { field.focus(); field.select(); status.textContent = 'Your notes are selected. Use Copy, then paste them into your message.'; }
  });
})();
