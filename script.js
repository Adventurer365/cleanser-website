const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const autoplayVideos = document.querySelectorAll(".autoplay-once");

if (autoplayVideos.length > 0) {
  const videoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.boundingClientRect.top > window.innerHeight) {
          return;
        }

        const video = entry.target;
        video.muted = true;
        video.defaultMuted = true;
        video.play().catch(() => {
          // Browsers may still block playback in some cases.
        });

        observer.unobserve(video);
      });
    },
    { threshold: 0 }
  );

  autoplayVideos.forEach((video) => {
    videoObserver.observe(video);
  });
}
