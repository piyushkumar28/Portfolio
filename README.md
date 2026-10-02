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
│  ├─ ui/                    # primitives: Button, Arrow
│  ├─ layout/                # SiteHeader, SkipLink, Section, SectionHeader
│  └─ sections/              # one folder per page section (hero/, about/, …)
├─ data/site.ts              # site-wide facts: name, role, availability, contact, nav
├─ layouts/BaseLayout.astro  # <head>, meta, fonts, structured data
├─ pages/index.astro         # composes the sections in order
├─ scripts/reveal.ts         # scroll reveal (progressive enhancement)
└─ styles/
   ├─ tokens.css             # palette, semantic colours, type scale, motion
   └─ global.css             # base styles, editorial grid, motion utilities
```

**Content rule:** site-wide facts live in `src/data/site.ts`; bespoke editorial
copy lives with its section; repeatable records (experience, projects, …) will
live in content collections.

## Design system — "Ink, Paper & Sage"

**Palette.** Four colours, each with a fixed job:

| Colour | Values                                     | Job                                                                 |
| ------ | ------------------------------------------ | ------------------------------------------------------------------- |
| Paper  | Ivory `#F5F2EB`, Stone `#ECE8DF`           | Reading sections; the hero. The portrait only ever sits on paper.   |
| Ink    | `#16212B`, raised `#1F2B37`                | Text on paper; masthead and statement sections in reverse.          |
| Sage   | `#B7C2AC`, deep `#4E6249`, light `#A7B99D` | Labels, indices, identity marks; full fields for learning & growth. |
| Cobalt | `#315F98`, light `#8FB0DD`, deep `#26497A` | Action only: buttons, links, focus.                                 |

**Tones.** Components use semantic tokens only (`bg`, `fg`, `fg-muted`, `mark`,
`accent`, `action`, `on-action`, `rule`, …). A section's `tone` — `paper`
(default), `ink` or `sage` — re-maps them, and every tone is AA-accessible on
its own (each defines its own muted text, link and button colours).

**Section rhythm.** Neighbouring sections never share a tone (the hero's ink
band deliberately runs into About). Planned order:

1. Masthead — ink
2. Hero — paper, closing on an ink band the portrait stands on
3. About — ink statement, then the principles on sage
4. Experience — paper
5. Skills & Learning — sage
6. Projects — paper (stone)
7. AI & Engineering — ink
8. Research & Certifications — sage
9. Contact & Footer — ink

**Grid.** `.grid-editorial` is a 12-column grid (6 on mobile) with full-bleed
outer tracks. Place items with named lines, e.g.
`grid-column: col-start 3 / span 4` or `col-start 9 / full-end` to bleed.

**Type.** Fluid scale — `display`, `title`, `heading`, `standfirst`, `lead`,
`body`, `small`, `label`.

**Motion.** 400/600/800ms with one easing curve; everything respects
`prefers-reduced-motion`.

## Before launch

- [ ] Replace the placeholder contact email in `src/data/site.ts`.
- [ ] Add `site` to `astro.config.mjs` once the domain is known (canonical URLs).

## Roadmap

1. ✅ Hero + About
2. Experience + Skills
3. Projects + AI / Engineering
4. Research / Publications + Certifications + Contact
5. Footer, responsive polish, accessibility, performance, final refinement
