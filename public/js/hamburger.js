const hamburgerMenu = document.querySelector('.hamburger-menu');
const links = document.querySelector('.links');
hamburgerMenu.addEventListener('click', () => {
  links.classList.toggle('header-links-display');
});
