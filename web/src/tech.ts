// Kept apart from portfolio.ts so pages can import it without bundling that file's YAML read.

// URL segment for a Technology's page, e.g. `Tailwind CSS` -> `tailwind-css`.
export const techSlug = (technology: string) =>
  technology.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
