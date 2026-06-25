
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header__burger");
  const navMenu = document.querySelector(".header__nav");
  const navLinks = document.querySelectorAll(".header__nav-link");
  const headerLogo = document.querySelector(".header__logo");
  const body = document.body;

  burger.addEventListener("click", () => {
    navMenu.classList.toggle("open-menu");
    burger.classList.toggle("open-menu");
    headerLogo.classList.toggle("open-menu");
    body.classList.toggle("toggle");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open-menu");
      burger.classList.remove("open-menu");
      headerLogo.classList.remove("open-menu");
      body.classList.remove("toggle");
    });
  });
});

