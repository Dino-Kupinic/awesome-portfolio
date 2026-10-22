// The one Portfolio schema, shared by the site and standalone scripts (e.g. the PR check).
import { readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { z } from 'astro/zod';

export const portfoliosDir = new URL('../../portfolios/', import.meta.url);

// Portfolio file names; `_`-prefixed files (e.g. _technologies.yaml) are not Portfolios.
export const portfolioFiles = () =>
  readdirSync(portfoliosDir).filter((name) => name.endsWith('.yaml') && !name.startsWith('_'));

export const technologies: string[] = parse(
  readFileSync(new URL('_technologies.yaml', portfoliosDir), 'utf8'),
);

export const portfolioSchema = z.strictObject({
  author: z.string().min(1),
  url: z.url({ protocol: /^https?$/ }),
  techStack: z
    .array(
      z.string().refine((t) => technologies.includes(t), {
        error: (issue) => `Unknown Technology "${issue.input}"; use one from portfolios/_technologies.yaml`,
      }),
    )
    .min(1),
  // Written by the post-merge bot, never by contributors.
  added: z.coerce.date().optional(),
});

export type Portfolio = z.infer<typeof portfolioSchema>;
