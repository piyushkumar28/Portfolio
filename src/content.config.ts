import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const layer = z.object({
  id: z.string(),
  tier: z.string(),
  name: z.string(),
  detail: z.string(),
  text: z.string(),
});

/**
 * Roles, newest first by `start`. `end: null` marks the current role.
 * Only facts belong here: no invented metrics, team sizes or outcomes.
 *
 * - `tools` is the single source for the "used in my current role" marks in
 *   the Skills section.
 * - `stack` is the path of a request through the work, top to bottom; the
 *   `runtime` wraps the layers listed in `runtimeWraps`.
 */
const experience = defineCollection({
  loader: file("src/content/experience.yaml"),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    start: z.number().int(),
    end: z.number().int().nullable(),
    summary: z.string(),
    tools: z.array(z.string()),
    stack: z.object({
      intro: z.string(),
      layers: z.array(layer.extend({ handoff: z.string().optional() })),
      runtime: layer,
      runtimeWraps: z.array(z.string()),
    }),
  }),
});

export const collections = { experience };
