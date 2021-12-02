const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__Button--right");
const prevButton = document.querySelector(".carousel__Button--left");
const indicatorContainer = document.querySelector(".indicator__container");
const indicators = Array.from(indicatorContainer.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const hideCarouselBtns = () => {
  prevButton.classList.add("is-hidden");
  nextButton.classList.add("is-hidden");
};

(() => {
  // check length of slides
  if (slides.length === 1) {
    hideCarouselBtns();
    console.log(indicatorContainer);
    indicatorContainer.classList.add("is-hidden");
  }
})();

const setSlidePos = (slide, ind) => {
  slide.style.left = slideWidth * ind + "px";
  console.log(slide.style.left);
};

const transitionToSlide = (track, currentSlide, targettedSlide) => {
  console.log(currentSlide);
  track.style.transform = `translateX(-${targettedSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targettedSlide.classList.add("current-slide");
};

const updateIndicators = (currentIndicator, targetIndicator) => {
  currentIndicator.classList.remove("current-slide");
  targetIndicator.classList.add("current-slide");
};

const toggleCarouselBtnDisplay = (
  prevButton,
  nexButton,
  slides,
  targetIndex
) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

slides.forEach(setSlidePos);

prevButton.addEventListener("click", (evt) => {
  if (slides.length === 1) return;
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentIndicator = indicatorContainer.querySelector(".current-slide");
  const prevIndicator = currentIndicator.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  transitionToSlide(track, currentSlide, prevSlide);
  updateIndicators(currentIndicator, prevIndicator);
  toggleCarouselBtnDisplay(prevButton, nextButton, slides, prevIndex);
});

nextButton.addEventListener("click", (evt) => {
  if (slides.length === 1) return;
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentIndicator = indicatorContainer.querySelector(".current-slide");
  const nextIndicator = currentIndicator.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  transitionToSlide(track, currentSlide, nextSlide);
  updateIndicators(currentIndicator, nextIndicator);
  toggleCarouselBtnDisplay(prevButton, nextButton, slides, nextIndex);
});

indicatorContainer.addEventListener("click", (evt) => {
  if (slides.length === 1) return;
  const targetIndicator = evt.target.closest("button");
  if (!targetIndicator) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentIndicator = indicatorContainer.querySelector(".current-slide");
  const targetIndex = indicators.findIndex(
    (indicator) => indicator == targetIndicator
  );
  const targetSlide = slides[targetIndex];

  toggleCarouselBtnDisplay(prevButton, nextButton, slides, targetIndex);

  transitionToSlide(track, currentSlide, targetSlide);
  updateIndicators(currentIndicator, targetIndicator);
});
