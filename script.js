// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// === MOBILE TOGGLE ===
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// === COUNTER ANIMATION ===
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = +counter.dataset.target;
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// === SCROLL ANIMATIONS ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.closest('.hero-stats')) animateCounters();
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .module-card, .testimonial-card, .ai-feature, .contact-method, .hero-stats').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// === PARTICLE CANVAS ===
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: -1000, y: -1000 };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      this.x -= dx * 0.01;
      this.y -= dy * 0.01;
    }
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 108, 78, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 108, 78, ${0.06 * (1 - dist / 150)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animate);
}
animate();

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// === FORM SUBMIT ===
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '<span>¡Mensaje Enviado!</span> <i class="fas fa-check"></i>';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  setTimeout(() => {
    btn.innerHTML = '<span>Enviar Mensaje</span> <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// === WHATSAPP FLOATING BUTTON ===
const waBtn = document.createElement('a');
waBtn.href = 'https://wa.me/5493413631049?text=Hola!%20Me%20interesa%20saber%20más%20sobre%20RevalSoftIA';
waBtn.target = '_blank';
waBtn.id = 'whatsapp-float';
waBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
waBtn.style.cssText = `
  position:fixed;bottom:28px;right:28px;z-index:9999;
  width:60px;height:60px;border-radius:50%;
  background:#25d366;color:#fff;font-size:1.8rem;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 24px rgba(37,211,102,.4);
  transition:all .3s;cursor:pointer;text-decoration:none;
  animation: waPulse 2s ease-in-out infinite;
`;
document.body.appendChild(waBtn);

const waStyle = document.createElement('style');
waStyle.textContent = `
  @keyframes waPulse{0%,100%{box-shadow:0 4px 24px rgba(37,211,102,.4)}50%{box-shadow:0 4px 40px rgba(37,211,102,.7)}}
  #whatsapp-float:hover{transform:scale(1.1);box-shadow:0 6px 30px rgba(37,211,102,.6)}
`;
document.head.appendChild(waStyle);

// === BAR ANIMATION ON SCROLL ===
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar').forEach((bar, i) => {
        bar.style.animationDelay = `${i * 0.1}s`;
        bar.style.animationPlayState = 'running';
      });
    }
  });
}, { threshold: 0.3 });
const chart = document.querySelector('.mockup-chart');
if (chart) chartObserver.observe(chart);
