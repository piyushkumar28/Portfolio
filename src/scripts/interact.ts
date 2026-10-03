/**
 * Pointer-driven micro-interactions, shared across sections. No libraries:
 * each writes CSS custom properties and lets CSS do the drawing.
 *
 *  - [data-spotlight]  keeps --mx / --my (pointer position, px) for lit
 *                      borders and washes (`.spot` in global.css).
 *  - [data-tilt]       tilts toward the pointer. Writes --rx / --ry (deg) and
 *                      --px / --py (pointer position, -1…1) on the nearest
 *                      [data-tilt-area] (or the element itself), so siblings
 *                      can drift with it for depth. Fine pointers only.
 *  - [data-magnetic]   drifts a few pixels toward the pointer.
 *  - [data-typer]      types its `data-words` (JSON) one after another.
 *
 * All of it is skipped for reduced motion, and tilt/magnetic for touch.
 */

const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const fine = matchMedia("(hover: hover) and (pointer: fine)");

/** Run `fn` at most once per frame. */
const perFrame = <T extends unknown[]>(fn: (...args: T) => void) => {
  let queued: T | null = null;
  return (...args: T) => {
    if (!queued) requestAnimationFrame(() => (fn(...queued!), (queued = null)));
    queued = args;
  };
};

// Spotlight ----------------------------------------------------------------
document.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((el) => {
  const move = perFrame((x: number, y: number) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${x - r.left}px`);
    el.style.setProperty("--my", `${y - r.top}px`);
  });
  el.addEventListener("pointermove", (e) => move(e.clientX, e.clientY));
});

// Tilt ---------------------------------------------------------------------
document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
  const max = Number(el.dataset.tilt) || 6;
  const target = el.closest<HTMLElement>("[data-tilt-area]") ?? el;
  const set = perFrame((px: number, py: number) => {
    target.style.setProperty("--px", px.toFixed(3));
    target.style.setProperty("--py", py.toFixed(3));
    target.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
    target.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
  });
  target.addEventListener("pointermove", (e) => {
    if (!fine.matches || reduce.matches || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    const py = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    target.classList.add("is-tilting");
    set(px, py);
  });
  target.addEventListener("pointerleave", () => {
    target.classList.remove("is-tilting");
    set(0, 0);
  });
});

// Magnetic -----------------------------------------------------------------
document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
  const pull = Number(el.dataset.magnetic) || 6;
  const set = perFrame((x: number, y: number) => {
    el.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
    el.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
  });
  el.addEventListener("pointermove", (e) => {
    if (!fine.matches || reduce.matches || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    set(
      ((e.clientX - r.left) / r.width - 0.5) * pull * 2,
      ((e.clientY - r.top) / r.height - 0.5) * pull * 2,
    );
  });
  el.addEventListener("pointerleave", () => set(0, 0));
});

// Typer --------------------------------------------------------------------
document.querySelectorAll<HTMLElement>("[data-typer]").forEach((el) => {
  const words: string[] = JSON.parse(el.dataset.words ?? "[]");
  const out = el.querySelector<HTMLElement>("[data-typer-text]");
  if (!out || words.length < 2) return;
  if (reduce.matches) return; // the static first word stays

  let word = 0;
  let chars = words[0].length;
  let deleting = true;
  let visible = true;
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(el);

  const step = () => {
    const current = words[word];
    let delay = deleting ? 38 : 72;
    if (visible) {
      chars += deleting ? -1 : 1;
      out.textContent = current.slice(0, chars);
      if (!deleting && chars === current.length) {
        deleting = true;
        delay = 2200;
      } else if (deleting && chars === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 280;
      }
      if (!deleting) out.textContent = words[word].slice(0, chars);
    } else {
      delay = 600;
    }
    setTimeout(step, delay);
  };
  setTimeout(step, 2600);
});
