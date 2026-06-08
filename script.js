const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const track = carousel.querySelector(".work-track");
  const slides = Array.from(carousel.querySelectorAll(".work-slide"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  let activeIndex = 0;
  let autoAdvance;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
    });
  };

  const startAutoAdvance = () => {
    window.clearInterval(autoAdvance);
    autoAdvance = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, 4500);
  };

  prevButton.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startAutoAdvance();
  });

  nextButton.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startAutoAdvance();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      showSlide(dotIndex);
      startAutoAdvance();
    });
  });

  carousel.addEventListener("mouseenter", () => window.clearInterval(autoAdvance));
  carousel.addEventListener("mouseleave", startAutoAdvance);

  showSlide(0);
  startAutoAdvance();
}
