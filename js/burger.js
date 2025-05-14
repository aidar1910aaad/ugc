export function initBurgerMenu() {
  const burger = document.getElementById('burger');
  const navWrapper = document.getElementById('navWrapper');
  const catalogLink = document.querySelector('.catalog-link');
  const catalogDropdown = document.querySelector('.catalog-dropdown');

  if (burger && navWrapper) {
    burger.addEventListener('click', () => {
      navWrapper.classList.toggle('active');
    });
  }

  if (catalogLink && catalogDropdown) {
    catalogLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        catalogDropdown.classList.toggle('active');
      }
    });
  }
}
