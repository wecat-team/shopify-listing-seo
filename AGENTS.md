# Shopify listing SEO

This repository is a skill. It applies whenever you are writing, rewriting,
auditing or bulk-editing Shopify product listings — product titles, SEO titles,
meta descriptions, URL handles, product descriptions, image alt text — or
writing any of those fields through the Shopify Admin API.

**Read [SKILL.md](SKILL.md) before you write a listing field.** It carries the
workflow and the character budgets. Then read the reference for the job in front
of you:

| Task | Read |
| --- | --- |
| Writing or auditing listing copy | [references/field-rules.md](references/field-rules.md) |
| Writing fields through the Admin API | [references/shopify-api-traps.md](references/shopify-api-traps.md) |
| Settling a disputed rule | [references/sources.md](references/sources.md) |

Two rules cost real data when missed, so they are repeated here:

1. **The SEO title budget is 60 minus the brand suffix**, not 60. Storefronts
   append `" | Brand"` to every page title. Measure the suffix on a live product
   page before writing anything.

2. **`productUpdate(input: {seo: {...}})` replaces the whole `seo` object.**
   Sending only `title` sets `description` to null. Always send both fields,
   carrying the live value for the one you are not changing.

Validate before publishing:

```bash
node scripts/check-listing.mjs listing.json --suffix " | Brand"
node scripts/check-listing.mjs catalog.json --suffix " | Brand" --catalog
```

Do not invent specifications. Sizes, materials and lead times must come from the
shop's own variant data and published policies; leave a sentence out rather than
guess at it.
