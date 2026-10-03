/**
 * Wires between DOM elements, drawn in an SVG overlay (the Experience system
 * map and the Skills ecosystem). Geometry is measured from layout, so CSS
 * decides where things sit and the wires follow them at every breakpoint.
 */

export const SVG_NS = "http://www.w3.org/2000/svg";

export type Point = [number, number];

export interface Box {
  l: number;
  r: number;
  t: number;
  b: number;
  cx: number;
  cy: number;
}

export function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
  return el;
}

/**
 * Sizes `svg` to `field` and returns helpers in the field's coordinates:
 * `box` measures an element, `sx`/`sy` snap to pixel centres so 1px strokes
 * stay crisp. (The browser paints the SVG from a whole-pixel origin, so the
 * snapping is relative to that.)
 */
export function frame(field: HTMLElement, svg: SVGSVGElement) {
  const f = field.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${f.width} ${f.height}`);
  const ox = f.left - Math.round(f.left);
  const oy = f.top - Math.round(f.top);
  const sx = (v: number) => Math.round(v + ox) + 0.5;
  const sy = (v: number) => Math.round(v + oy) + 0.5;
  const box = (el: Element): Box => {
    const r = el.getBoundingClientRect();
    const l = r.left - f.left;
    const t = r.top - f.top;
    return { l, t, r: l + r.width, b: t + r.height, cx: l + r.width / 2, cy: t + r.height / 2 };
  };
  return { width: f.width, height: f.height, sx, sy, box };
}

/**
 * Orthogonal route from box `a` to box `b`, leaving and entering on the
 * facing sides. Straight when the boxes share a row or column, otherwise a
 * Z with its bend at `bend` (0–1) of the way across the gap; wires into the
 * same target with the same bend merge into one line.
 */
export function orthoRoute(a: Box, b: Box, bend = 0.5): Point[] {
  const across = Math.max(b.l - a.r, a.l - b.r);
  const down = Math.max(b.t - a.b, a.t - b.b);
  const inside = (v: number, lo: number, hi: number) => v > lo + 6 && v < hi - 6;

  if (across >= down) {
    const [x1, x2] = b.cx > a.cx ? [a.r, b.l] : [a.l, b.r];
    if (inside(b.cy, a.t, a.b))
      return [
        [x1, b.cy],
        [x2, b.cy],
      ];
    if (inside(a.cy, b.t, b.b))
      return [
        [x1, a.cy],
        [x2, a.cy],
      ];
    const xm = x1 + (x2 - x1) * bend;
    return [
      [x1, a.cy],
      [xm, a.cy],
      [xm, b.cy],
      [x2, b.cy],
    ];
  }

  const [y1, y2] = b.cy > a.cy ? [a.b, b.t] : [a.t, b.b];
  if (inside(b.cx, a.l, a.r))
    return [
      [b.cx, y1],
      [b.cx, y2],
    ];
  if (inside(a.cx, b.l, b.r))
    return [
      [a.cx, y1],
      [a.cx, y2],
    ];
  const ym = y1 + (y2 - y1) * bend;
  return [
    [a.cx, y1],
    [a.cx, ym],
    [b.cx, ym],
    [b.cx, y2],
  ];
}

/** Path data for an orthogonal polyline with softly rounded corners. */
export function roundedPath(points: Point[], radius = 4): string {
  const [first, ...rest] = points;
  let d = `M${first[0]},${first[1]}`;
  rest.forEach(([x, y], i) => {
    const next = rest[i + 1];
    if (!next) {
      d += ` L${x},${y}`;
      return;
    }
    const [px, py] = points[i];
    const r = Math.min(
      radius,
      Math.hypot(x - px, y - py) / 2,
      Math.hypot(next[0] - x, next[1] - y) / 2,
    );
    const ax = x - Math.sign(x - px) * r;
    const ay = y - Math.sign(y - py) * r;
    const bx = x + Math.sign(next[0] - x) * r;
    const by = y + Math.sign(next[1] - y) * r;
    d += ` L${ax},${ay} Q${x},${y} ${bx},${by}`;
  });
  return d;
}

/** An open chevron whose tip sits on the last point, pointing along the wire. */
export function arrowPath(points: Point[], size = 4.5): string {
  const [x, y] = points[points.length - 1];
  const [px, py] = points[points.length - 2];
  const len = Math.hypot(x - px, y - py) || 1;
  const ux = (x - px) / len;
  const uy = (y - py) / len;
  const bx = x - ux * size;
  const by = y - uy * size;
  return `M${bx - uy * size},${by + ux * size} L${x},${y} L${bx + uy * size},${by - ux * size}`;
}

export interface Rect {
  l: number;
  t: number;
  r: number;
  b: number;
}

const overlaps = (a: Rect, b: Rect, pad = 2) =>
  a.l < b.r + pad && b.l < a.r + pad && a.t < b.b + pad && b.t < a.b + pad;

/** Thin rects along a polyline's segments, to keep labels off other wires. */
export function segmentRects(points: Point[]): Rect[] {
  return points.slice(1).map(([x, y], i) => {
    const [px, py] = points[i];
    return { l: Math.min(x, px), r: Math.max(x, px), t: Math.min(y, py), b: Math.max(y, py) };
  });
}

/**
 * Where a wire's label goes: beside the wire, preferring the middle of its
 * longest runs, at the first spot clear of every obstacle (components, other
 * wires, labels already placed) and inside `bounds`. Null when nothing fits.
 */
export function placeLabel(
  points: Point[],
  size: { w: number; h: number },
  obstacles: Rect[],
  bounds: Rect,
  gap = 4,
): Rect | null {
  const segments = points
    .slice(1)
    .map((end, i) => ({ start: points[i], end }))
    .sort(
      (a, b) =>
        Math.hypot(b.end[0] - b.start[0], b.end[1] - b.start[1]) -
        Math.hypot(a.end[0] - a.start[0], a.end[1] - a.start[1]),
    );
  for (const { start, end } of segments) {
    const vertical = start[0] === end[0];
    // From the middle outwards in small steps.
    const steps = Array.from(
      { length: 37 },
      (_, i) => 0.5 + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * 0.0125,
    );
    for (const t of steps) {
      const x = start[0] + (end[0] - start[0]) * t;
      const y = start[1] + (end[1] - start[1]) * t;
      for (const side of [1, -1]) {
        const l = vertical ? (side > 0 ? x + gap + 2 : x - gap - 2 - size.w) : x - size.w / 2;
        const top = vertical ? y - size.h / 2 : side > 0 ? y - gap - size.h : y + gap;
        const rect = { l, t: top, r: l + size.w, b: top + size.h };
        const inside =
          rect.l >= bounds.l && rect.r <= bounds.r && rect.t >= bounds.t && rect.b <= bounds.b;
        if (inside && !obstacles.some((o) => overlaps(rect, o))) return rect;
      }
    }
  }
  return null;
}

/** Total length of a polyline, and the point at distance `d` along it. */
export function polyline(points: Point[]) {
  const lengths = points
    .slice(1)
    .map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  const total = lengths.reduce((sum, l) => sum + l, 0);
  const at = (d: number): Point => {
    let left = Math.max(0, Math.min(d, total));
    for (let i = 0; i < lengths.length; i++) {
      if (left <= lengths[i] || i === lengths.length - 1) {
        const t = lengths[i] ? left / lengths[i] : 0;
        const [ax, ay] = points[i];
        const [bx, by] = points[i + 1];
        return [ax + (bx - ax) * t, ay + (by - ay) * t];
      }
      left -= lengths[i];
    }
    return points[points.length - 1];
  };
  return { total, at };
}
