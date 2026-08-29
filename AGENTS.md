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

1. **Title truncation is measured in pixels, not characters.** Google publishes
   no `<title>` limit. The storefront's `" | Brand"` suffix eats roughly a fifth
   of the budget, and Arial character widths vary four-fold, so a character count
   mis-sizes wide titles. Use `scripts/check-listing.mjs`, which measures.

2. **`productUpdate(input: {seo: {...}})` replaces the whole `seo` object.**
   Sending only `title` sets `description` to null. Always send both fields,
   carrying the live value for the one you are not changing.

Validate before publishing:

```bash
node scripts/check-listing.mjs listing.json --suffix " | Brand" --feed-title product
```

```bash
node scripts/check-listing.mjs catalog.json --suffix " | Brand" --catalog
```

Pass `--selling-language vi` when the shop actually sells in Vietnamese, and
`--feed-title seo` when the Google & YouTube channel is set to feed the search
engine title rather than the product title.

Do not invent specifications. Sizes, materials and lead times must come from the
shop's own variant data and published policies; leave a sentence out rather than
guess at it.

Do not enforce a product-title character range. Do not present Shopify's
250-word page recommendation as a Google rule, and do not present it as folklore
either — it is published advice from the platform being published on.
Neither exists in any Google or Shopify document — see
[references/sources.md](references/sources.md) for the register of every number.
