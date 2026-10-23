import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { portfolioSchema, portfoliosDir } from "@/portfolio"

const portfolios = defineCollection({
  // `_`-prefixed files (e.g. _technologies.yaml) are not Portfolios.
  loader: glob({ pattern: ["*.yaml", "!_*.yaml"], base: portfoliosDir }),
  schema: portfolioSchema,
})

export const collections = { portfolios }
