import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Roles, newest first by `start`. `end: null` marks the current role.
 * Only facts belong here: no invented metrics, team sizes or outcomes.
 * The tools listed under `areas` are the single source for the
 * "used in my current role" marks in the Skills section.
 */
const experience = defineCollection({
  loader: file("src/content/experience.yaml"),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    start: z.number().int(),
    end: z.number().int().nullable(),
    summary: z.string(),
    areas: z.array(
      z.object({
        title: z.string(),
        text: z.string(),
        tools: z.array(z.string()),
      }),
    ),
    learnings: z.array(z.string()),
  }),
});

export const collections = { experience };
