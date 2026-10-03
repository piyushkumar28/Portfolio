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
│  ├─ ui/                    # Button, Icon (technology marks), Arrow, ArrowSwap
│  ├─ layout/                # SiteHeader (floating nav), Section, SectionHead, SkipLink
│  └─ sections/              # hero/, about/, experience/, skills/, projects/, contact/
├─ content/experience.yaml   # roles + each role's system map (schema in content.config.ts)
├─ data/site.ts              # name, role, availability, contact, nav
├─ data/skills.ts            # five areas, tools (kind + one line) and links between tools
├─ data/projects.ts          # projects — DRAFT: only names (+ 2 stacks) are confirmed
├─ data/icons.ts             # brand marks (simple-icons, build time) + line glyphs
├─ scripts/reveal.ts         # scroll reveals and staggered children
├─ scripts/interact.ts       # spotlight, tilt/parallax, magnetic buttons, typer
├─ scripts/explore.ts        # hover/focus/tap exploration shared by map, skills, lenses
├─ scripts/wires.ts          # measured SVG wiring (routing, labels, packets)
└─ styles/                   # tokens.css (Ink & Copper), global.css (base, utilities, motion)
```

## Design system — "Ink & Copper"

A dark, product-grade foundation: five ink steps for page and surfaces, ivory for
text and the primary action, **copper** as the signature (highlights, "now",
active states), cobalt for in-content links, sage for quiet status. Headlines
are Instrument Sans (600, tight); one word per title takes the Newsreader
italic accent (`.accent-word`); IBM Plex Mono is the technical voice (kickers,
chips, diagram labels).

**Interaction language** — every effect writes CSS custom properties and lets
CSS draw:

- Cards light their border under the pointer (`.spot` + `data-spotlight`).
- The portrait card and project previews tilt toward the pointer with layered
  parallax (`data-tilt` / `data-tilt-area`); fine pointers only.
- Experience: a live system map — lenses, stack chips and components light
  their connections; "Trace a request" sends a packet through it.
- Skills: a bento of areas; a technology lights what it works with across
  cards and draws curves to them; area filters; current-role key.
- Projects: tinted preview frames with illustrative mockups that straighten
  and come alive on hover, a tech-reveal strip, filters and an expandable
  case-study track (Problem → Product → Engineering → Technology → Result).
- Everything works by keyboard and touch; reduced motion removes movement,
  and without JS all content is static and visible.

## Before launch

- [ ] Replace the placeholder contact email in `src/data/site.ts` (and add GitHub/LinkedIn).
- [ ] Confirm project details, stacks, links and screenshots in `src/data/projects.ts`.
- [ ] Add `site` to `astro.config.mjs` once the domain is known (canonical URLs).

## Roadmap

1. ✅ Hero + About
2. ✅ Experience + Skills
3. Projects + AI / Engineering
4. Research / Publications + Certifications + Contact
5. Footer, responsive polish, accessibility, performance, final refinement
