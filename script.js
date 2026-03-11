

/* ---- SCROLL PROGRESS BAR ---- */
(function () {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    bar.style.width = ((scrolled / maxScroll) * 100) + '%';
  });
})();

/* ---- CUSTOM CURSOR ---- */
(function () {
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (!cursor || !cursorRing) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .panel, .tool-badge').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width      = '20px';
      cursor.style.height     = '20px';
      cursorRing.style.width  = '54px';
      cursorRing.style.height = '54px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width      = '12px';
      cursor.style.height     = '12px';
      cursorRing.style.width  = '36px';
      cursorRing.style.height = '36px';
    });
  });
})();

/* ---- CANVAS NEURAL NETWORK BACKGROUND ---- */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initNodes(); });

  function initNodes() {
    nodes = [];
    const count = Math.floor((W * H) / 16000);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r:  Math.random() * 1.6 + 0.4
      });
    }
  }
  initNodes();

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - dist / 140)})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,245,255,0.55)';
      ctx.fill();

      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---- ANTI-GRAVITY FLOATING PARTICLES ---- */
(function () {
  const colors = ['#00f5ff', '#00ff88', '#ff003c'];

  function spawn() {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}vw;
      bottom: 0;
      --dx: ${(Math.random() - 0.5) * 220}px;
      animation-duration: ${4 + Math.random() * 7}s;
      animation-delay: ${Math.random() * 2}s;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      box-shadow: 0 0 6px currentColor;
      width:  ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 11000);
  }

  setInterval(spawn, 220);
})();

/* ---- SCROLL REVEAL ---- */
(function () {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
})();

/* ---- SKILL BARS ---- */
(function () {
  const section = document.getElementById('skills');
  if (!section) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.querySelectorAll('.skill-bar').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(section);
})();

/* ---- COUNT-UP ANIMATION ---- */
(function () {
  const section = document.getElementById('about');
  if (!section) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.querySelectorAll('[data-count]').forEach(el => {
          const target = parseInt(el.dataset.count);
          let cur = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = cur + '+';
            if (cur >= target) clearInterval(timer);
          }, 45);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(section);
})();

/* ---- MOBILE NAV TOGGLE ---- */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

/* ---- CERTIFICATE MODAL ---- */
(function () {
  const modal   = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const closeBtn = document.getElementById('close-cert');
  if (!modal) return;

  document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.img;
      if (!src) return;
      modalImg.src = src;
      modal.classList.add('open');
    });
  });

  function closeModal() { modal.classList.remove('open'); modalImg.src = ''; }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ---- CONTACT FORM (basic feedback — wire up your own backend/EmailJS) ---- */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const original = btn.textContent;
    btn.textContent = '[ TRANSMISSION_SENT ✓ ]';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
})();

/* ---- NAVBAR SCROLL SHRINK ---- */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(2,8,16,0.98)';
      nav.style.paddingTop    = '12px';
      nav.style.paddingBottom = '12px';
    } else {
      nav.style.background = '';
      nav.style.paddingTop    = '';
      nav.style.paddingBottom = '';
    }
  });
})();

