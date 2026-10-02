/**
 * Explorable diagrams (the Experience stack and the Skills map).
 *
 * One node is active at a time. Its linked nodes stay bright while everything
 * else steps back, the edges joining them light up, and a caption explains it.
 *
 * Markup contract, inside a root element:
 *  - button[data-node="id"]          data-group, data-links="id id …",
 *                                    data-title, data-text (caption text;
 *                                    falls back to the aria-describedby text)
 *  - [data-group-block="group"]      gets .is-involved when a node in it is
 *                                    active or linked
 *  - [data-edge="a b …"]             endpoints are node ids or group ids; lit
 *                                    when it joins the active node/group to a
 *                                    linked one
 *  - [data-caption="group"]          shows the active node's text when it
 *                                    belongs to that group (data-default
 *                                    holds the resting text); an optional
 *                                    [data-caption-title="group"] shows its title
 *  - [data-roving]                   arrow keys / Home / End move between its
 *                                    nodes, which share one tab stop
 *
 * Active = the hovered node (mouse) ?? the focused node ?? the pinned node
 * (click / tap). Escape or a click elsewhere clears the pin.
 */

interface NodeInfo {
  el: HTMLButtonElement;
  group: string;
  title: string;
  text: string;
  links: Set<string>;
}

export function explore(root: HTMLElement) {
  const info = new Map<string, NodeInfo>();
  for (const el of root.querySelectorAll<HTMLButtonElement>("[data-node]")) {
    const id = el.dataset.node!;
    const describedBy = el.getAttribute("aria-describedby");
    info.set(id, {
      el,
      group: el.dataset.group ?? "",
      title: el.dataset.title ?? el.textContent?.trim() ?? "",
      text:
        el.dataset.text ??
        ((describedBy && document.getElementById(describedBy)?.textContent?.trim()) || ""),
      links: new Set((el.dataset.links ?? "").split(" ").filter(Boolean)),
    });
  }

  let hovered: string | null = null;
  let focused: string | null = null;
  let pinned: string | null = null;
  let shown: string | null | undefined;

  const render = () => {
    const id = hovered ?? focused ?? pinned;
    const active = id ? info.get(id) : undefined;
    const linked = active?.links ?? new Set<string>();

    const activeKeys = new Set<string>(active ? [id!, active.group].filter(Boolean) : []);
    const linkedKeys = new Set<string>();
    for (const key of linked) {
      linkedKeys.add(key);
      const group = info.get(key)?.group;
      if (group) linkedKeys.add(group);
    }

    root.classList.toggle("is-exploring", Boolean(active));

    for (const [key, node] of info) {
      node.el.classList.toggle("is-active", key === id);
      node.el.classList.toggle("is-linked", linked.has(key));
      node.el.setAttribute("aria-pressed", String(key === pinned));
    }

    for (const block of root.querySelectorAll<HTMLElement>("[data-group-block]")) {
      const group = block.dataset.groupBlock!;
      block.classList.toggle("is-involved", activeKeys.has(group) || linkedKeys.has(group));
    }

    for (const edge of root.querySelectorAll<Element>("[data-edge]")) {
      const ends = (edge.getAttribute("data-edge") ?? "").split(" ");
      const touchesActive = ends.some((end) => activeKeys.has(end));
      const reachesLinked = ends.some((end) => !activeKeys.has(end) && linkedKeys.has(end));
      edge.classList.toggle("is-lit", Boolean(active) && touchesActive && reachesLinked);
    }

    // Captions only change when the active node changes, so the swap can animate.
    if (shown === id) return;
    shown = id;
    for (const caption of root.querySelectorAll<HTMLElement>("[data-caption]")) {
      const group = caption.dataset.caption!;
      const mine = active && active.group === group ? active : undefined;
      const text = mine ? mine.text : (caption.dataset.default ?? "");
      if (caption.textContent !== text) {
        caption.textContent = text;
        caption.classList.remove("is-swapping");
        void caption.offsetWidth;
        caption.classList.add("is-swapping");
      }
      const title = root.querySelector<HTMLElement>(`[data-caption-title="${group}"]`);
      if (title) title.textContent = mine ? mine.title : (title.dataset.default ?? "");
    }
  };

  for (const [id, node] of info) {
    const { el } = node;
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

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !(pinned || focused)) return;
    pinned = null;
    (document.activeElement as HTMLElement | null)?.blur();
    render();
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
      const last = items.length - 1;
      const next =
        event.key === "ArrowRight" || event.key === "ArrowDown"
          ? (current + 1) % items.length
          : event.key === "ArrowLeft" || event.key === "ArrowUp"
            ? (current - 1 + items.length) % items.length
            : event.key === "Home"
              ? 0
              : event.key === "End"
                ? last
                : -1;
      if (next < 0) return;
      event.preventDefault();
      items[current].tabIndex = -1;
      items[next].tabIndex = 0;
      items[next].focus();
    });
  }

  return { refresh: render };
}
