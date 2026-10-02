/**
 * Reveals [data-reveal] elements as they enter the viewport.
 * Elements are only hidden when <html> has the `js` class (set inline in <head>),
 * and reduced-motion users get them immediately via CSS.
 */
const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (!("IntersectionObserver" in window)) {
  elements.forEach((el) => el.classList.add("is-revealed"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
  );

  elements.forEach((el) => observer.observe(el));
}
