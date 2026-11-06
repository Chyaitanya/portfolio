const typedText = document.getElementById('typedText');
const phrases = ['Python Developer', 'Django Developer', 'Database Enthusiast'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (!typedText) return;

  if (!isDeleting) {
    charIndex++;
    typedText.textContent = currentPhrase.slice(0, charIndex);
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1100);
      return;
    }
  } else {
    charIndex--;
    typedText.textContent = currentPhrase.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 65 : 110;
  setTimeout(typeLoop, speed);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const skillProgressBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.level || '0%';
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.35 });

skillProgressBars.forEach((bar) => skillObserver.observe(bar));

typeLoop();

const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

if (tabButtons.length && tabPanels.length) {
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;

      tabButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });

      tabPanels.forEach((panel) => {
        const isVisible = panel.dataset.panel === target;
        panel.classList.toggle('active', isVisible);
      });
    });
  });
}

const buttons = document.querySelectorAll('.ripple');
buttons.forEach((button) => {
  button.addEventListener('mousemove', (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  });
});

const scrollProgressBar = document.getElementById('scrollProgressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${progress}%`;
  }
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
  window.addEventListener('pointermove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
    cursorRing.style.left = `${event.clientX}px`;
    cursorRing.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button, .project-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '52px';
      cursorRing.style.height = '52px';
      cursorRing.style.borderColor = 'rgba(167, 139, 250, 0.95)';
    });

    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.borderColor = 'rgba(110, 231, 249, 0.7)';
    });
  });
}

const particlesCanvas = document.getElementById('particleCanvas');
if (particlesCanvas) {
  const ctx = particlesCanvas.getContext('2d');
  const particles = [];

  function resizeCanvas() {
    particlesCanvas.width = window.innerWidth * window.devicePixelRatio;
    particlesCanvas.height = window.innerHeight * window.devicePixelRatio;
    particlesCanvas.style.width = `${window.innerWidth}px`;
    particlesCanvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.8 + 0.2
    };
  }

  function initParticles() {
    particles.length = 0;
    const count = Math.min(90, Math.max(40, Math.floor(window.innerWidth / 18)));
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(110, 231, 249, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167, 139, 250, ${0.12 - dist / 1000})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = (0.5 - (y / rect.height)) * 16;
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
  });
});
