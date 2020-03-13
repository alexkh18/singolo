const HEADER_NAV_MENU = document.getElementById("header-nav");

HEADER_NAV_MENU.addEventListener('click', (event) => {
  HEADER_NAV_MENU.querySelectorAll('.header-nav__link').forEach(elem => elem.classList.remove('active'));
  event.target.classList.add('active');
})
