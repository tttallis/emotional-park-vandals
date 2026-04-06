// ===== GLITCH EFFECT ON BAND NAME =====
const lines = document.querySelectorAll('.band-name span');
const glitchColors = ['#ff3cac', '#00f5d4', '#ffdd00', '#ccff00', '#ff6d00'];

function randomGlitch() {
  const el = lines[Math.floor(Math.random() * lines.length)];
  const orig = el.style.transform;
  const color = glitchColors[Math.floor(Math.random() * glitchColors.length)];

  el.style.transform = `${orig} skewX(${(Math.random() - 0.5) * 20}deg) translateX(${(Math.random() - 0.5) * 12}px)`;
  el.style.filter = `hue-rotate(${Math.random() * 90}deg)`;

  setTimeout(() => {
    el.style.transform = orig;
    el.style.filter = '';
  }, 80 + Math.random() * 120);
}

setInterval(randomGlitch, 1800 + Math.random() * 1200);

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id], header');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id || 'hero';
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ===== SECTION ENTRANCE ANIMATIONS =====
const revealEls = document.querySelectorAll('.release, .about-inner, .contact-inner, .video-wrap');

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== CURSOR TRAIL =====
const trail = [];
const TRAIL_COUNT = 8;

for (let i = 0; i < TRAIL_COUNT; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: ${6 - i * 0.5}px; height: ${6 - i * 0.5}px;
    border-radius: 50%;
    background: hsl(${(i / TRAIL_COUNT) * 360}, 100%, 60%);
    opacity: ${1 - i / TRAIL_COUNT};
    transition: transform 0.05s;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  let x = mouseX, y = mouseY;
  trail.forEach((dot, i) => {
    dot.el.style.left = x + 'px';
    dot.el.style.top = y + 'px';
    if (i < trail.length - 1) {
      x += (trail[i + 1].x - x) * 0.6;
      y += (trail[i + 1].y - y) * 0.6;
    }
    dot.x = x;
    dot.y = y;
  });
  requestAnimationFrame(animateTrail);
}

animateTrail();
