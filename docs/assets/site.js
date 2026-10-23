(() => {
  const instagramSlot = document.querySelector('.instagram-slot');
  if (instagramSlot) {
    const titleInstagram = () => {
      const frame = instagramSlot.querySelector('iframe');
      if (frame) {
        frame.title = 'FM Studios Music School Instagram profile and recent posts';
        observer.disconnect();
      }
    };
    const observer = new MutationObserver(titleInstagram);
    observer.observe(instagramSlot, { childList: true, subtree: true });
    titleInstagram();
  }
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-navigation');
  const closeMenu = () => {
    menu?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('open');
  };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('focusin', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  matchMedia('(min-width: 821px)').addEventListener('change', closeMenu);

  const field = document.querySelector('#review-notes');
  if (!field) return;
  const copy = document.querySelector('#copy-review');
  const email = document.querySelector('#email-review');
  const clear = document.querySelector('#clear-review');
  const status = document.querySelector('#review-status');
  const storageNote = document.querySelector('#review-storage');
  const key = 'fm-studios-preview-review-notes';
  const recipient = 'admin@stoneridgedigital.com';
  const subject = 'FM Studios website feedback';
  let canSave = true;
  const storageUnavailable = () => {
    canSave = false;
    storageNote.textContent = 'Browser saving is unavailable. Copy your notes before leaving this page. Nothing is sent automatically.';
  };
  try { field.value = localStorage.getItem(key) || ''; }
  catch { storageUnavailable(); }
  const page = new URLSearchParams(location.search).get('page');
  const pageLink = [...document.querySelectorAll('.review-page-link')]
    .find(link => link.getAttribute('href') === page + '.html');
  if (pageLink) {
    const heading = 'Page: ' + pageLink.textContent.trim();
    if (!field.value.includes(heading)) field.value += (field.value.trim() ? '\n\n' : '') + heading + '\n';
  }
  const feedback = () => subject + '\n\n' + field.value.trim();
  const updateEmail = () => {
    const body = encodeURIComponent(feedback().replace(/\r?\n/g, '\r\n'));
    const base = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject);
    const full = base + '&body=' + body;
    const includeBody = full.length <= 1800;
    email.href = includeBody ? full : base;
    email.dataset.copyRequired = String(!includeBody);
    email.textContent = includeBody ? 'Open feedback email' : 'Open email (paste notes)';
    document.querySelector('#review-email-help').textContent = includeBody
      ? 'Your email app can prepare a draft with your notes. You choose when to send it.'
      : 'These notes are too long for an email link. Use Copy feedback, open the email, then paste your notes.';
  };
  const save = () => {
    if (canSave) {
      try {
        if (field.value) localStorage.setItem(key, field.value);
        else localStorage.removeItem(key);
      } catch { storageUnavailable(); }
    }
    updateEmail();
  };
  save();
  field.addEventListener('input', save);
  copy.addEventListener('click', async () => {
    if (!field.value.trim()) {
      status.textContent = 'Add your notes above, then copy them to share.';
      field.focus();
      return;
    }
    try {
      await navigator.clipboard.writeText(feedback());
      status.textContent = 'Feedback copied. Paste it into your reply or email ' + recipient + '.';
    } catch {
      field.focus();
      field.select();
      status.textContent = 'Your notes are selected. Use Copy, then paste them into an email to ' + recipient + '.';
    }
  });
  email.addEventListener('click', event => {
    if (!field.value.trim()) {
      event.preventDefault();
      status.textContent = 'Add your notes above to prepare your feedback email.';
      field.focus();
    } else if (email.dataset.copyRequired === 'true') {
      status.textContent = 'These notes are too long for an email link. Use Copy feedback, then paste them into the email that opens.';
    } else {
      status.textContent = 'Your email app can open a draft with these notes. Review it and send it when ready. If no email app opens, use Copy feedback and paste into your email.';
    }
  });
  clear.addEventListener('click', () => {
    field.value = '';
    let cleared = true;
    try { localStorage.removeItem(key); }
    catch { cleared = false; storageUnavailable(); }
    updateEmail();
    status.textContent = cleared ? 'Saved notes cleared from this browser.' : 'Notes cleared on this page, but saved notes could not be removed from browser storage.';
    field.focus();
  });
})();

