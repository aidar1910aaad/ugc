function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length || !dots.length) return;

  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === i);
      dots[idx].classList.toggle('active', idx === i);
    });
    index = i;
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.index));
    });
  });

  setInterval(() => {
    showSlide((index + 1) % slides.length);
  }, 5000);
}
