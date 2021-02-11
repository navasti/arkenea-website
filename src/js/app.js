import "./modules/Swiper";

const header = document.querySelector(".l-header__inner");
const nav = document.querySelector(".l-header__nav");
const hamburger = document.querySelector(".c-btn--hamburger");

const headerOffsetTop = header.offsetTop;

window.addEventListener("scroll", () => {
  if (window.pageYOffset > headerOffsetTop) {
    nav.classList.add("l-header__nav--white");
    header.classList.add("l-header__inner--sticky");
    hamburger.classList.add("c-btn--hamburger-sticky");
  } else {
    nav.classList.remove("l-header__nav--white");
    header.classList.remove("l-header__inner--sticky");
    hamburger.classList.remove("c-btn--hamburger-sticky");
  }
});

hamburger.addEventListener("click", () => {
  nav.classList.toggle("l-header__nav--open");
  hamburger.classList.toggle("is-active");
});
