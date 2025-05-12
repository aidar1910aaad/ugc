document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.about-slide');
  const dots = document.querySelectorAll('.about-dots .dot');
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
});
