/**
 * Technology marks, keyed by tool id (see `toolId` in data/skills.ts).
 *
 * Brand marks come from simple-icons (CC0), read at build time only. Tools
 * without a mark there (concepts such as RAG, and brands that have withdrawn
 * theirs, such as AWS and Azure) get a line glyph drawn in one consistent
 * style. Everything renders in currentColor, so icons follow the theme.
 */
import {
  siDjango,
  siDocker,
  siGit,
  siGithub,
  siJavascript,
  siN8n,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siVite,
} from "simple-icons";

export type IconDef = { type: "brand"; path: string } | { type: "glyph"; markup: string };

const brand = (icon: { path: string }): IconDef => ({ type: "brand", path: icon.path });
const glyph = (markup: string): IconDef => ({ type: "glyph", markup });

const cloud =
  '<path d="M7 18.5h10.25a4.25 4.25 0 0 0 .6-8.46A6 6 0 0 0 6.3 9.4 4.6 4.6 0 0 0 7 18.5Z"/>';

export const icons: Record<string, IconDef> = {
  python: brand(siPython),
  django: brand(siDjango),
  "node-js": brand(siNodedotjs),
  react: brand(siReact),
  javascript: brand(siJavascript),
  "tailwind-css": brand(siTailwindcss),
  vite: brand(siVite),
  postgresql: brand(siPostgresql),
  docker: brand(siDocker),
  git: brand(siGit),
  github: brand(siGithub),
  n8n: brand(siN8n),

  "rest-apis": glyph(
    '<path d="M8 4.5c-1.9 0-2.75.9-2.75 2.6v2.1c0 1.5-.8 2.55-2 2.8 1.2.25 2 1.3 2 2.8v2.1c0 1.7.85 2.6 2.75 2.6M16 4.5c1.9 0 2.75.9 2.75 2.6v2.1c0 1.5.8 2.55 2 2.8-1.2.25-2 1.3-2 2.8v2.1c0 1.7-.85 2.6-2.75 2.6"/><path d="M9.5 12h5M12.5 10l2 2-2 2"/>',
  ),
  sql: glyph(
    '<ellipse cx="12" cy="6" rx="7.5" ry="2.75"/><path d="M4.5 6v12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75V6M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75"/>',
  ),
  "relational-databases": glyph(
    '<rect x="3" y="3.5" width="8" height="7" rx="1.25"/><rect x="13" y="13.5" width="8" height="7" rx="1.25"/><path d="M3 7h8M13 17h8M11 7h2.5a2 2 0 0 1 2 2v4.5"/>',
  ),
  aws: glyph(
    `${cloud}<path d="M9 14.5l1.4-4 1.6 4M9.4 13.4h2.2M13.5 10.5l.8 4 .9-2.6.9 2.6.8-4"/>`,
  ),
  azure: glyph(`${cloud}<path d="M9.5 15l2.5-5.5 2.5 5.5M10.5 13h3"/>`),
  "azure-ai": glyph(
    `${cloud}<path d="M12 9.75l.75 1.75 1.75.75-1.75.75L12 14.75l-.75-1.75-1.75-.75 1.75-.75Z"/>`,
  ),
  ocr: glyph(
    '<path d="M4 8.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3M15.5 4h3A1.5 1.5 0 0 1 20 5.5v3M20 15.5v3a1.5 1.5 0 0 1-1.5 1.5h-3M8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3"/><path d="M8 9.5h8M8 12h8M8 14.5h5"/>',
  ),
  llms: glyph(
    '<path d="M4.5 5.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 3.5V16.5h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"/><path d="M8 9.5h8M8 12.5h5"/>',
  ),
  rag: glyph(
    '<path d="M13 3.5H6.5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1H11M13 3.5l4.5 4.5v2.5M13 3.5V8h4.5"/><circle cx="16.25" cy="16.25" r="3"/><path d="M18.5 18.5l2 2"/>',
  ),
  "ai-agents": glyph(
    '<circle cx="12" cy="12" r="2.75"/><circle cx="5" cy="5.5" r="1.75"/><circle cx="19" cy="5.5" r="1.75"/><circle cx="12" cy="20.25" r="1.75"/><path d="M6.4 6.7l3.6 3.3M17.6 6.7 14 10M12 14.75v3.75"/>',
  ),
  "vector-databases": glyph(
    '<path d="M12 3 20 7.5v9L12 21l-8-4.5v-9Z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
  ),
  systems: glyph(
    '<path d="M9 3.5V8M15 3.5V8M6.5 8h11v2.5a5.5 5.5 0 0 1-11 0Z"/><path d="M12 16v4.5"/>',
  ),
  gem5: glyph(
    '<rect x="6.5" y="6.5" width="11" height="11" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5" rx=".75"/><path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21"/>',
  ),
};

/** Ids used by the Experience system map, mapped to tool icons. */
export const iconFor = (id: string): IconDef | undefined =>
  icons[id] ?? icons[{ rest: "rest-apis", postgres: "postgresql" }[id] ?? ""];
