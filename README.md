# shopify-listing-seo

A skill for writing Shopify product listings that rank — and for auditing the
ones you already have. Works with **Claude Code** and **Codex**.

It carries the character budgets Google actually renders, the content structure
buyers actually search for, and the Shopify Admin API behaviours that silently
destroy data during a bulk edit.

## Why it exists

Most listing SEO advice is right in outline and wrong in the details that matter:

- Most of the numbers in circulation have no source. "45-70 character product
  titles" and "250-word minimum descriptions" appear in no Google or Shopify
  document — Google says in writing it has no preferred word count, and Merchant
  Center's actual guidance is "Use all 150 characters, put the most important
  details first". This skill labels every threshold as a hard rule, a documented
  recommendation, or unsourced convention.
- Storefronts append `" | Brand"` to the page title, so the SEO title budget is
  the observed ~60 minus that suffix. Nobody mentions the suffix.
- `productUpdate(input: {seo: {title}})` **replaces** the whole `seo` object.
  A title-only bulk edit nulls every meta description in the catalog. This is
  documented nowhere prominent and shows up as "our meta descriptions vanished".
- A Shopify listing is indexed by two systems that read different fields.
  Shopify's own storefront search never looks at the SEO title or meta
  description — it reads title, body, product type, vendor, tags, variant title,
  SKU and barcode. Optimising only for Google leaves on-site search untouched.
- Tags are a search field, so tags used as internal flags (`dept:gifts`,
  `customName`) become index noise. On one live shop a single internal tag
  matched 246 of 273 products.

This skill exists so an agent handles those correctly without being told.

## Install

**Claude Code** — clone into your skills directory:

```bash
git clone https://github.com/wecat-team/shopify-listing-seo \
  ~/.claude/skills/shopify-listing-seo
```

The repository root is the skill directory, so it is picked up as soon as it
lands there. Project-scoped instead of global: clone to
`.claude/skills/shopify-listing-seo` inside the project.

**Codex** — clone it somewhere and point your project's `AGENTS.md` at it:

```bash
git clone https://github.com/wecat-team/shopify-listing-seo vendor/shopify-listing-seo
```

```markdown
<!-- in your project's AGENTS.md -->
When working on Shopify product listings, follow
vendor/shopify-listing-seo/AGENTS.md.
```

Or run Codex with this repository as the working directory, and its `AGENTS.md`
is read directly.

## Use

Ask for what you want in plain language:

> Rewrite the meta descriptions for these 40 table runner listings — they're all
> sharing the same one right now.

> Our product titles are 150 characters with a comma tail of keywords. Fix them.

> Audit this catalog export and tell me what's blocking these products from
> ranking.

## Validate

```bash
node scripts/check-listing.mjs examples/listing.json --suffix " | Brand"
node scripts/check-listing.mjs examples/catalog.json --suffix " | Brand" --catalog
```

Zero dependencies, Node 18+. Exits non-zero on failure, so it drops into a
pre-publish hook or CI step.

The catalog mode is where the value is: duplicate meta descriptions, duplicate
body openings, duplicate SEO titles and two listings fighting over one keyword
are all invisible when you check listings one at a time.

```
Brand suffix " | Brand" → SEO title budget 52 chars

  FAIL  custom-wedding-sign
        x title: word "Personalized" repeated back to back
        x metaDescription: 15 chars, want 120-155
        x body: no concrete dimensions — long-tail size queries cannot match
        ! images: image 1 filename "IMG_4821.jpg" is not descriptive

  across the catalog
        x duplicate-meta: meta description shared by 5: ...
```

## What's inside

| Path | What it is |
| --- | --- |
| `SKILL.md` | The skill — workflow, budgets, entry point |
| `AGENTS.md` | Codex entry point |
| `references/field-rules.md` | The eight fields, thresholds, worked examples |
| `references/shopify-api-traps.md` | Admin API behaviours that cost data |
| `references/sources.md` | Primary docs, and how to measure |
| `scripts/check-listing.mjs` | Dependency-free validator |
| `examples/` | A passing listing, a failing one, a catalog |

## Scope

It will not invent product specifications, promise rankings from field edits
alone, or write hidden pages for AI crawlers. Those are the three ways listing
SEO work usually goes wrong.

## License

MIT
