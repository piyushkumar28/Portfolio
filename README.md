# Piyush Kumar — Portfolio

Personal portfolio of Piyush Kumar, Software Engineer. Built with an
"Editorial Engineering" direction: typography-led, calm and restrained.

## Stack

- [Astro 7](https://astro.build) (static output, TypeScript strict)
- [Tailwind CSS v4](https://tailwindcss.com) — design tokens defined in CSS
- Self-hosted variable fonts via Astro's Fonts API:
  **Newsreader** (display serif, optical sizes) and **Instrument Sans** (UI/body)

## Getting started

Requires Node 22 (see `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
npm run format    # Prettier (Astro + Tailwind plugins)
```

## Structure

```
src/
├─ assets/images/portrait/   # portrait source image (optimised at build time)
├─ components/
│  ├─ ui/                    # primitives: Button, Arrow, ArrowSwap
│  ├─ layout/                # SiteHeader, SkipLink, Section, SectionHeader
│  └─ sections/              # one folder per page section (hero/, about/, experience/, skills/)
├─ content/experience.yaml   # roles (content collection, schema in content.config.ts)
├─ data/site.ts              # site-wide facts: name, role, availability, contact, nav
├─ data/skills.ts            # skill groups (no levels or percentages)
├─ layouts/BaseLayout.astro  # <head>, meta, fonts, structured data
├─ pages/index.astro         # composes the sections in order
├─ scripts/reveal.ts         # scroll reveal (progressive enhancement)
└─ styles/
   ├─ tokens.css             # palette, semantic colours, type scale, motion
   └─ global.css             # base styles, editorial grid, motion utilities
```

**Content rule:** site-wide facts live in `src/data/site.ts`; bespoke editorial
copy lives with its section; repeatable records live in content collections
(`experience` so far). The Skills section derives its "used in my current
role" marks from the current role's tools, so the two sections can't disagree.

## Design system — "Ink & Paper"

**Palette.** A two-tone foundation with three small accents, each with one job:

| Colour | Values                                     | Job                                                                                                                                                      |
| ------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paper  | Ivory `#F5F2EB`, Stone `#ECE8DF`           | Reading sections; the hero. The portrait only ever sits on paper.                                                                                        |
| Ink    | `#16212B`, raised `#1F2B37`                | Text on paper; masthead and statement sections in reverse.                                                                                               |
| Cobalt | `#315F98`, light `#8FB0DD`, deep `#26497A` | Action only: buttons, links, focus.                                                                                                                      |
| Copper | `#B77A4B`, light `#C48A5A`                 | Signature. The headline's full stop, the active principle, and a small square that always means "now": availability, the current role, tools used in it. |
| Sage   | deep `#4E6249`, light `#A7B99D`            | Quiet: small labels and indices. (A `sage` field tone exists but is unused.)                                                                             |

**Tones.** Components use semantic tokens only (`bg`, `fg`, `fg-muted`, `mark`,
`signature`, `accent`, `action`, `rule`, …). A section's `tone` — `paper`
(default), `ink` or `sage` — re-maps them, and every tone is AA-accessible on
its own.

**Section rhythm.** Neighbouring sections never share a tone (the hero's ink
band deliberately runs into About). Planned order: Hero (paper) → About (ink) →
Experience (paper) → Skills & Learning (ink) → Projects (paper) → AI &
Engineering (ink) → Research & Certifications (paper/stone) → Contact & Footer
(ink).

**Motion.** One vocabulary: type rises from its baseline, rules draw from the
left, the portrait emerges from the band it stands on.

- Load choreography uses `data-enter="rise | mask | draw | emerge | stamp"`.
  It runs only with JS and starts once the fonts are in (`html.is-ready`, set
  in `BaseLayout`), so type never swaps faces mid-reveal.
- Scroll reveals use `data-reveal`; `data-inview` only signals visibility.
- Links share one gesture: `ArrowSwap` (the arrow leaves, a fresh one arrives),
  triggered by hover or keyboard focus on a `.swap-trigger` ancestor.
- The About principles have one active row: the hovered row with a mouse,
  otherwise the row crossing the middle of the screen.
- Skills has a switch (`role="switch"`) that highlights current-role tools.
- On phones the sections move into a full-screen `<dialog>` menu.
- Without JS everything is static and visible; with `prefers-reduced-motion`
  everything appears in its final state.

**Grid.** `.grid-editorial` is a 12-column grid (6 on mobile) with full-bleed
outer tracks. Place items with named lines, e.g.
`grid-column: col-start 3 / span 4` or `col-start 9 / full-end` to bleed.

**Type.** Fluid scale — `display`, `title`, `heading`, `standfirst`, `lead`,
`body`, `small`, `label`.

## Before launch

- [ ] Replace the placeholder contact email in `src/data/site.ts`.
- [ ] Add `site` to `astro.config.mjs` once the domain is known (canonical URLs).

## Roadmap

1. ✅ Hero + About
2. ✅ Experience + Skills
3. Projects + AI / Engineering
4. Research / Publications + Certifications + Contact
5. Footer, responsive polish, accessibility, performance, final refinement
