/**
 * Explorable diagrams (the Experience system map and the Skills ecosystem).
 *
 * One node is active at a time. The nodes it stands for and the nodes it links
 * to stay bright while everything else steps back, and the wires joining them
 * light up. Each diagram renders its own readout through `onChange`.
 *
 * Markup contract, inside a root element:
 *  - button[data-node="id"]   data-links="id …"   nodes that stay bright with it
 *                             data-members="id …" optional: the nodes this one
 *                             stands for (a group, a container, a key). Defaults
 *                             to the node itself.
 *  - [data-edge="a b"]        a wire (or its label); lit when one end is active
 *                             and the other is active or linked
 *  - [data-roving]            arrow keys / Home / End move between its nodes,
 *                             which share one tab stop
 *
 * Active = the hovered node (mouse) ?? the focused node ?? the pinned node
 * (click / tap). Escape or a click elsewhere clears the pin.
 */

export interface ExploreState {
  /** The node driving the state, or null at rest. */
  id: string | null;
  /** The nodes it stands for (just itself unless it has data-members). */
  active: Set<string>;
  /** The nodes linked to those. */
  linked: Set<string>;
  pinned: string | null;
}

interface NodeInfo {
  el: HTMLButtonElement;
  members: Set<string>;
  links: Set<string>;
}

const ids = (value: string | undefined) => (value ?? "").split(" ").filter(Boolean);

export function explore(
  root: HTMLElement,
  { onChange }: { onChange?: (state: ExploreState) => void } = {},
) {
  const info = new Map<string, NodeInfo>();
  for (const el of root.querySelectorAll<HTMLButtonElement>("[data-node]")) {
    const id = el.dataset.node!;
    const members = ids(el.dataset.members);
    info.set(id, {
      el,
      members: new Set(members.length ? members : [id]),
      links: new Set(ids(el.dataset.links)),
    });
  }
  const edges = [...root.querySelectorAll<Element>("[data-edge]")];

  let hovered: string | null = null;
  let focused: string | null = null;
  let pinned: string | null = null;

  const render = () => {
    const id = hovered ?? focused ?? pinned;
    const node = id ? info.get(id) : undefined;
    const active = new Set(node?.members ?? []);
    const linked = new Set([...(node?.links ?? [])].filter((key) => !active.has(key)));

    root.classList.toggle("is-exploring", Boolean(node));

    for (const [key, { el }] of info) {
      el.classList.toggle("is-active", key === id || active.has(key));
      el.classList.toggle("is-linked", linked.has(key));
      el.setAttribute("aria-pressed", String(key === pinned));
    }

    for (const edge of edges) {
      const ends = ids(edge.getAttribute("data-edge") ?? "");
      const lit =
        ends.some((end) => active.has(end)) &&
        ends.every((end) => active.has(end) || linked.has(end));
      edge.classList.toggle("is-lit", lit);
    }

    onChange?.({ id: node ? id : null, active, linked, pinned });
  };

  for (const [id, { el }] of info) {
    el.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      hovered = id;
      render();
    });
    el.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "mouse") return;
      hovered = null;
      render();
    });
    el.addEventListener("focus", () => {
      focused = id;
      render();
    });
    el.addEventListener("blur", () => {
      focused = null;
      render();
    });
    el.addEventListener("click", () => {
      if (pinned === id) {
        pinned = null;
        el.blur();
      } else {
        pinned = id;
      }
      render();
    });
  }

  /** Drop the pin (and, by default, focus inside the diagram). */
  const clear = (blur = true) => {
    pinned = null;
    const current = document.activeElement as HTMLElement | null;
    if (blur && current && root.contains(current)) current.blur();
    render();
  };

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && (pinned || focused)) clear();
  });

  document.addEventListener("click", (event) => {
    if (pinned && !root.contains(event.target as Node)) {
      pinned = null;
      render();
    }
  });

  // One tab stop per [data-roving] list; arrows move within it.
  for (const list of root.querySelectorAll<HTMLElement>("[data-roving]")) {
    const items = [...list.querySelectorAll<HTMLButtonElement>("[data-node]")];
    items.forEach((item, i) => (item.tabIndex = i === 0 ? 0 : -1));
    list.addEventListener("keydown", (event) => {
      const current = items.indexOf(document.activeElement as HTMLButtonElement);
      if (current < 0) return;
      const next =
        event.key === "ArrowRight" || event.key === "ArrowDown"
          ? (current + 1) % items.length
          : event.key === "ArrowLeft" || event.key === "ArrowUp"
            ? (current - 1 + items.length) % items.length
            : event.key === "Home"
              ? 0
              : event.key === "End"
                ? items.length - 1
                : -1;
      if (next < 0) return;
      event.preventDefault();
      items[current].tabIndex = -1;
      items[next].tabIndex = 0;
      items[next].focus();
    });
  }

  /** Activate a node programmatically (e.g. from an inspector link). */
  const select = (id: string) => {
    const node = info.get(id);
    if (!node) return;
    pinned = id;
    // Keep the roving tab stop on the selected node.
    const list = node.el.closest<HTMLElement>("[data-roving]");
    list
      ?.querySelectorAll<HTMLButtonElement>("[data-node]")
      .forEach((item) => (item.tabIndex = -1));
    node.el.tabIndex = 0;
    node.el.focus({ preventScroll: true });
    render();
  };

  render();
  return { refresh: render, clear, select };
}
