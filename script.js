// Announcement bar close
(function() {
  const bar = document.getElementById('announceBar');
  const btn = document.getElementById('announceClose');
  if (!bar || !btn) return;

  btn.addEventListener('click', () => {
    bar.style.maxHeight = bar.offsetHeight + 'px';
    requestAnimationFrame(() => {
      bar.style.transition = 'max-height .3s ease, padding .3s ease, opacity .3s ease';
      bar.style.maxHeight = '0';
      bar.style.paddingTop = '0';
      bar.style.paddingBottom = '0';
      bar.style.opacity = '0';
      bar.style.overflow = 'hidden';
    });
  });
})();

// Sticky price bar
(function() {
  const bar  = document.getElementById('priceBar');
  const hero = document.getElementById('hero');
  if (!bar || !hero) return;

  window.addEventListener('scroll', () => {
    const below = hero.getBoundingClientRect().bottom < 0;
    bar.classList.toggle('is-visible', below);
    bar.setAttribute('aria-hidden', String(!below));
  }, { passive: true });
})();

// Hamburger mobile nav
(function() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('is-open');
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    nav.setAttribute('aria-hidden', String(!open));
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('is-open');
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
    });
  });
})();

// Product image carousel + zoom
(function() {
  const wrap   = document.getElementById('pzWrap');
  const img    = document.getElementById('pzImg');
  const lens   = document.getElementById('pzLens');
  const prev   = document.getElementById('pzPreview');
  const prevImg = document.getElementById('pzPreviewImg');
  const thumbs = document.getElementById('pcThumbs');
  const pcPrev = document.getElementById('pcPrev');
  const pcNext = document.getElementById('pcNext');

  if (!wrap || !img) return;

  const ZOOM = 3;
  let images = [];
  let current = 0;

  if (thumbs) {
    images = Array.from(thumbs.querySelectorAll('.pc-thumb')).map(t => t.dataset.src);
  }

  function goTo(idx) {
    current = (idx + images.length) % images.length;
    const src = images[current];
    img.src = src;
    if (prevImg) prevImg.src = src;
    thumbs && thumbs.querySelectorAll('.pc-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === current);
      t.setAttribute('aria-selected', String(i === current));
    });
  }

  if (pcPrev) pcPrev.addEventListener('click', () => goTo(current - 1));
  if (pcNext) pcNext.addEventListener('click', () => goTo(current + 1));

  if (thumbs) {
    thumbs.querySelectorAll('.pc-thumb').forEach((t, i) => {
      t.addEventListener('click', () => goTo(i));
    });
  }

  // Zoom on hover
  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lw = lens ? lens.offsetWidth / 2 : 55;
    const lh = lens ? lens.offsetHeight / 2 : 55;

    const cx = Math.max(lw, Math.min(x, rect.width - lw));
    const cy = Math.max(lh, Math.min(y, rect.height - lh));

    if (lens) {
      lens.style.left = (cx - lw) + 'px';
      lens.style.top  = (cy - lh) + 'px';
    }

    if (prev && prevImg) {
      const pw = prev.offsetWidth;
      const ph = prev.offsetHeight;
      prevImg.style.width  = (rect.width * ZOOM) + 'px';
      prevImg.style.height = (rect.height * ZOOM) + 'px';
      prevImg.style.left   = -(cx * ZOOM - pw / 2) + 'px';
      prevImg.style.top    = -(cy * ZOOM - ph / 2) + 'px';
    }
  });
})();

// Process tabs
(function() {
  const tabs = document.querySelectorAll('.process-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('process-tab--active'));
      tab.classList.add('process-tab--active');
    });
  });
})();

// Applications carousel scroll
(function() {
  const track = document.getElementById('appsTrack');
  const prev  = document.getElementById('appsPrev');
  const next  = document.getElementById('appsNext');
  if (!track || !prev || !next) return;

  const step = () => (track.querySelector('.app-card')?.offsetWidth || 420) + 16;

  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));
})();

// FAQ accordion
(function() {
  const list = document.getElementById('faqList');
  if (!list) return;

  list.addEventListener('click', e => {
    const btn = e.target.closest('.faq__q');
    if (!btn) return;

    const item   = btn.closest('.faq__item');
    const answer = item.querySelector('.faq__a');
    const icon   = btn.querySelector('.faq__icon');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    list.querySelectorAll('.faq__item').forEach(i => {
      i.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      i.querySelector('.faq__a').hidden = true;
      i.querySelector('.faq__icon').classList.remove('faq__icon--open');
      i.classList.remove('faq__item--open');
    });

    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
      icon.classList.add('faq__icon--open');
      item.classList.add('faq__item--open');
    }
  });
})();

// Contact form
(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('#emailAddr');
    if (!email || !emailRe.test(email.value.trim())) {
      email && email.classList.add('is-error');
      return;
    }
    email.classList.remove('is-error');

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Request Custom Quote';
      const msg = document.getElementById('formSuccess');
      if (msg) {
        msg.textContent = '✓ Request sent! We\'ll be in touch within 24 hours.';
        setTimeout(() => { msg.textContent = ''; }, 5000);
      }
    }, 1200);
  });
})();

// Catalogue form
(function() {
  const form = document.getElementById('catalogueForm');
  if (!form) return;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('#catEmail');
    if (!email || !emailRe.test(email.value.trim())) {
      email && email.classList.add('is-error');
      return;
    }
    email.classList.remove('is-error');

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Request Catalogue';
    }, 1000);
  });
})();

// Modals
(function() {
  function open(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function close(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) close(overlay.id);
    });
  });

  document.getElementById('catalogueModalClose')?.addEventListener('click', () => close('catalogueModal'));
  document.getElementById('callbackModalClose')?.addEventListener('click',  () => close('callbackModal'));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      close('catalogueModal');
      close('callbackModal');
    }
  });

  document.querySelector('.catalogue-bar__btn')?.addEventListener('click', e => {
    e.preventDefault();
    open('catalogueModal');
  });

  document.querySelectorAll('.portfolio-cta-bar__btn, .contact-fold__submit').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      open('callbackModal');
    });
  });

  document.getElementById('catalogueModalForm')?.addEventListener('submit', e => {
    e.preventDefault();
    close('catalogueModal');
  });

  document.getElementById('callbackModalForm')?.addEventListener('submit', e => {
    e.preventDefault();
    close('callbackModal');
  });
})();
