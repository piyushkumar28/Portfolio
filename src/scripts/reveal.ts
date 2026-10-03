/**
 * Adds `is-revealed` as elements enter the viewport.
 *  - [data-reveal]: fades/rises in (styles in global.css);
 *  - [data-stagger]: its children arrive one after another (sets --i on each);
 *  - [data-inview]: no styling of its own — lets components start an
 *    entrance only once it can be seen.
 * Elements are only hidden when <html> has the `js` class (set inline in <head>),
 * and reduced-motion users get them immediately via CSS.
 */
document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
  [...group.children].forEach((child, i) =>
    (child as HTMLElement).style.setProperty("--i", String(i)),
  );
});

const elements = document.querySelectorAll<HTMLElement>(
  "[data-reveal], [data-inview], [data-stagger]",
);

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
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );

  elements.forEach((el) => observer.observe(el));
}
