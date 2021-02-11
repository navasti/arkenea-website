import Swiper, { Pagination, Autoplay } from "swiper";

Swiper.use([Pagination, Autoplay]);

const swiper = new Swiper(".swiper-container", {
  autoplay: {
    delay: 4000,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
});
