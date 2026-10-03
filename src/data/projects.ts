/**
 * Projects.
 *
 * DRAFT CONTENT — only the project names (and, for two of them, the core
 * technology: Azure AI OCR, gem5) have been confirmed. Each `summary` says no
 * more than the name implies, `stack` lists only confirmed technologies, and
 * the previews are illustrative mockups built for the portfolio, not
 * screenshots. Replace with real details (problem, what you built, stack,
 * links, screenshots) as they become available — every optional field below
 * renders automatically once it is filled in.
 */
export interface Project {
  id: string;
  name: string;
  category: "Platform" | "AI" | "Research";
  /** One or two sentences: what the product is. */
  summary: string;
  /** Case file (optional): each renders only when present. */
  problem?: string;
  engineering?: string;
  result?: string;
  /** Tool ids from data/skills.ts or data/icons.ts; confirmed only. */
  stack: { id: string; name: string }[];
  /** Which illustrative mockup to draw in the preview. */
  mock: "board" | "voice" | "document" | "dashboard" | "resume" | "cache";
  /** Frame tint (a muted hue that stays within the palette's warmth). */
  hue: string;
  links?: { code?: string; live?: string };
  /** True while the copy above is unconfirmed. */
  draft: boolean;
}

export const projects: Project[] = [
  {
    id: "inflow",
    name: "Inflow Work Management Platform",
    category: "Platform",
    summary:
      "A work management platform for organising work and following it from start to finish.",
    stack: [],
    mock: "board",
    hue: "211 148 98",
    draft: true,
  },
  {
    id: "voice-assistant",
    name: "Voice Personal Assistant",
    category: "AI",
    summary: "A personal assistant you talk to: it listens to spoken requests and answers back.",
    stack: [],
    mock: "voice",
    hue: "143 176 221",
    draft: true,
  },
  {
    id: "document-extraction",
    name: "Intelligent Document Text Extraction",
    category: "AI",
    summary:
      "Extracts text from documents with Azure AI OCR, turning scans and images into text an application can use.",
    stack: [
      { id: "azure-ai", name: "Azure AI" },
      { id: "ocr", name: "OCR" },
    ],
    mock: "document",
    hue: "167 185 157",
    draft: true,
  },
  {
    id: "healthcare",
    name: "Centralized Platform for Healthcare",
    category: "Platform",
    summary:
      "A single platform that brings healthcare information and workflows together in one place.",
    stack: [],
    mock: "dashboard",
    hue: "125 178 176",
    draft: true,
  },
  {
    id: "resume-builder",
    name: "Resume Builder",
    category: "Platform",
    summary: "A tool for building a résumé section by section and seeing it laid out as you go.",
    stack: [],
    mock: "resume",
    hue: "217 192 138",
    draft: true,
  },
  {
    id: "llcwhisp",
    name: "LLCWhisp",
    category: "Research",
    summary:
      "A research project on the last-level cache (LLC) of a processor, studied with the gem5 architecture simulator.",
    stack: [{ id: "gem5", name: "gem5" }],
    mock: "cache",
    hue: "196 160 206",
    draft: true,
  },
];

export const categories = ["Platform", "AI", "Research"] as const;
