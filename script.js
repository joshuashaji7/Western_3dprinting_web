// Team
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  startX,
  StartScrollLeft,
  StartScrollLeft_slide,
  timeoutID;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens
  .slice(0, cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft +=
      btn.id === "left-btn" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Recording the initila cursor and scroll position of carousel
  startX = e.pageX;
  StartScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) {
    return;
  }
  // Starts scrolling from where you stopped
  carousel.scrollLeft = StartScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
};
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);

carousel.addEventListener("scroll", infiniteScroll);

// landing
// Landing-slide
const carousel_slide = document.querySelector(".slide-carousel");
const slide_firstCardWidth =
  carousel_slide.querySelector(".slide-card").offsetWidth;
const slideChildrens = [...carousel_slide.children];
const slide_wrapper = document.querySelector(".slide-show");

let slidecardPerView = Math.round(
  carousel_slide.offsetWidth / slide_firstCardWidth
);

// add cards at the beggining
slideChildrens
  .slice(-slidecardPerView)
  .reverse()
  .forEach((card) => {
    carousel_slide.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// add cards at the end
slideChildrens
  .slice(0, slidecardPerView)
  .reverse()
  .forEach((card) => {
    carousel_slide.insertAdjacentHTML("beforeend", card.outerHTML);
  });

const dragStart_slide = (e) => {
  isDragging = true;
  carousel_slide.classList.add("dragging");
  console.log("you ahevstarted slideding");

  // Recording the initila cursor and scroll position of carousel
  startX = e.pageX;

  StartScrollLeft_slide = carousel_slide.scrollLeft;
};
const dragging_slide = (e) => {
  if (!isDragging) {
    return;
  }
  // Starts scrolling from where you stopped

  carousel_slide.scrollLeft = StartScrollLeft_slide - (e.pageX - startX);
};

const dragStop_slide = () => {
  isDragging = false;
  carousel_slide.classList.remove("dragging");
};

const autoplay = () => {
  if (window.innerWidth < 800) {
    return;
  }
  timeoutID = setTimeout(
    () => (carousel_slide.scrollLeft += slide_firstCardWidth),
    3500
  );
};
autoplay();

const infiniteslideScroll = () => {
  if (carousel_slide.scrollLeft === 0) {
    carousel_slide.classList.add("no-transition");
    carousel_slide.scrollLeft =
      carousel_slide.scrollWidth - 2 * carousel_slide.offsetWidth;
    carousel_slide.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel_slide.scrollLeft) ===
    carousel_slide.scrollWidth - carousel_slide.offsetWidth
  ) {
    carousel_slide.classList.add("no-transition");
    carousel_slide.scrollLeft = carousel_slide.offsetWidth;
    carousel_slide.classList.remove("no-transition");
  }

  clearTimeout(timeoutID);
  if (!slide_wrapper.matches(":hover")) {
    autoplay();
  }
};

carousel_slide.addEventListener("mousedown", dragStart_slide);
carousel_slide.addEventListener("mousemove", dragging_slide);
carousel_slide.addEventListener("mouseup", dragStop_slide);
carousel_slide.addEventListener("scroll", infiniteslideScroll);
slide_wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutID));
slide_wrapper.addEventListener("mouseleave", autoplay);
