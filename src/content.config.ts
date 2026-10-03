import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const component = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.string(),
  text: z.string(),
});

/**
 * Roles, newest first by `start`. `end: null` marks the current role.
 * Only facts belong here: no invented metrics, team sizes or outcomes.
 *
 * - `tools` is the single source for the "used in my current role" marks in
 *   the Skills section.
 * - `system` is the role's system map: the components, the container that
 *   wraps some of them, the wires between them (`flow: false` for a relation
 *   that is not a data flow) and a request traced through them step by step.
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
    system: z.object({
      nodes: z.array(component.extend({ external: z.boolean().optional() })),
      container: component.extend({ wraps: z.array(z.string()) }),
      wires: z.array(
        z.object({
          from: z.string(),
          to: z.string(),
          label: z.string(),
          flow: z.boolean().default(true),
        }),
      ),
      trace: z.array(
        z.object({ path: z.array(z.string()).min(2), step: z.string(), text: z.string() }),
      ),
    }),
  }),
});

export const collections = { experience };
