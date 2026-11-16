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
engine title rather than the product title. Pass `--shop-words "wedding,christmas"`
with the occasion words every listing in the shop carries, so the generic-title
check ignores them the way the generic test in SKILL.md does. For a batch
rewrite, put the shop's existing titles in the catalog file too: uniqueness in
a batch is not uniqueness in the shop.

Do not invent specifications. Sizes, materials and lead times must come from the
shop's own variant data and published policies; leave a sentence out rather than
guess at it.

Titles lead with the design — the artwork or motif that tells this listing from
its siblings — never with `Personalized` + the product type alone. Run the
generic test in SKILL.md (*Writing the title: the design leads*) on every title,
and use most of the SEO title's pixel budget instead of stopping at 30
characters. When a title must lose words, cut personalization, then
material, then design — never the occasion phrase buyers search (`First
Christmas Married`, `Baby's First Christmas`) or the product type. The product
title does not open with `Personalized`: a phone card shows about 35
characters.

When the piece has no drawn motif, the design is the printed saying (quoted as
printed) or the art style of a photo piece (`Watercolor Pet Portrait`). Name a
recipient only when the listing names one, the way it is searched
(`Anniversary Gift for Husband`), and never more than two. A product title past
50 characters is normal; where the type keyword lands is not checked. A long
product title still needs its own SEO title, or `<title>` is cut.

Do not enforce a product-title character range: the checker's under-45 warning
is advice, not a gate. Do not present Shopify's
250-word page recommendation as a Google rule, and do not present it as folklore
either — it is published advice from the platform being published on.
Neither exists in any Google or Shopify document — see
[references/sources.md](references/sources.md) for the register of every number.
