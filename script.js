/* === NAV ACTIVE LINK ON SCROLL === */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

/* === SLIDESHOW === */
function initSlideshow() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slideDots');
  let current = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));
  document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));

  // Optional: auto-advance every 6s
  let autoPlay = setInterval(() => goTo(current + 1), 6000);
  document.getElementById('slideshow').addEventListener('mouseenter', () => clearInterval(autoPlay));
  document.getElementById('slideshow').addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goTo(current + 1), 6000);
  });

  /* === KEYBOARD NAV === */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
  });
}

/* === NETWORK SLIDESHOW (separate from main slideshow) === */
function initNetworkSlideshow() {
  const nSlides = document.querySelectorAll('.network-slide');
  const nDotsContainer = document.getElementById('networkSlideDots');
  let nCurrent = 0;

  nSlides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => nGoTo(i));
    nDotsContainer.appendChild(dot);
  });

  function nGoTo(n) {
    nSlides[nCurrent].classList.remove('active');
    nDotsContainer.children[nCurrent].classList.remove('active');
    nCurrent = (n + nSlides.length) % nSlides.length;
    nSlides[nCurrent].classList.add('active');
    nDotsContainer.children[nCurrent].classList.add('active');
  }

  document.getElementById('networkNextBtn').addEventListener('click', () => nGoTo(nCurrent + 1));
  document.getElementById('networkPrevBtn').addEventListener('click', () => nGoTo(nCurrent - 1));

  // auto-advance
  let nAuto = setInterval(() => nGoTo(nCurrent + 1), 6000);
  const container = document.getElementById('networkSlideshow');
  container.addEventListener('mouseenter', () => clearInterval(nAuto));
  container.addEventListener('mouseleave', () => {
    nAuto = setInterval(() => nGoTo(nCurrent + 1), 6000);
  });
}

// initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initSlideshow();
  initNetworkSlideshow();
});

/* === SMOOTH SCROLL FOR NAV LINKS === */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* === FADE-IN ON SCROLL === */
const fadeEls = document.querySelectorAll('.project-card, .featured-project, .about-grid');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity = '1';
      el.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});
