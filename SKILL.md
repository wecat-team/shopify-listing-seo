---
name: shopify-listing-seo
description: Write and audit Shopify product listings that rank - product title, SEO title, meta description, URL handle, body copy, images, collections and structured data, with the exact character budgets and the Shopify Admin API traps that silently destroy data. Use this whenever the user is writing, rewriting, bulk-editing or auditing Shopify product listings, product descriptions, meta titles or meta descriptions; whenever they mention product SEO, listing SEO, PDP copy, catalog cleanup, keyword cannibalization or migrating listings from Etsy/Amazon to Shopify; and whenever they are about to write product fields through the Shopify Admin API - even if they never say the word "SEO".
---

# Shopify listing SEO

A listing ranks when it answers one shopper's buying question completely. Nothing
here is a trick: the character budgets exist because Google truncates, and the
content rules exist because Google's spam policy targets pages that add nothing.

## Before writing anything: find the brand suffix

Almost every Shopify theme and headless storefront appends the shop name to the
page title — `Product name | Brand`. Google renders about **60 characters**, so
the real budget for the SEO title field is:

```
seo.title budget = 60 - length(" | Brand")
```

A shop called `Aster & Fig` gets 48. A shop called `Nordic Home Supply` gets 39.
Getting this wrong is the single most common listing SEO mistake, because every
guide on the internet says "60 characters" and no guide mentions the suffix.

Confirm it by fetching one live product page and reading its `<title>`:

```bash
curl -s https://SHOP/products/HANDLE | grep -o '<title>[^<]*</title>'
```

If the title tag is longer than the product's own SEO title field, the difference
is the suffix. Subtract it from 60 and use that number for the rest of the work.

## The eight fields

Work in this order. Later fields depend on decisions made in earlier ones, so
jumping around means redoing work.

| # | Field | Budget |
| --- | --- | --- |
| 1 | Primary keyword | one per listing, two supporting at most |
| 2 | Product title | 45-70 characters |
| 3 | SEO title | 60 minus the brand suffix |
| 4 | Meta description | 120-155 characters, unique |
| 5 | URL handle | 3-5 words, set once |
| 6 | Body copy | 250+ words, six sections, unique |
| 7 | Images | descriptive filenames, alt on every image |
| 8 | Collection + internal links | one canonical URL per product |

Full rules, thresholds and worked examples: [references/field-rules.md](references/field-rules.md).

## Keyword choice comes first

Pick **one** primary keyword before writing a word of copy. Then check the shop's
own catalog for a listing already targeting it — two listings on one keyword
split the ranking signal and neither wins. This is the most common failure in
catalogs that grew fast, and it is invisible unless you look for it.

A useful test: if you cannot write 250 words of true, specific copy around the
keyword, the keyword is wrong for this product.

Long-tail is where a small shop actually wins. `custom wedding welcome sign with
couple portrait 24x36` converts; `wedding sign` does not rank. This is why the
specs section of the body copy matters so much — it is what makes the long-tail
query match.

## Etsy titles do not port to Google

Catalogs migrated from Etsy arrive with 150-character comma-stuffed titles.
Etsy's internal search matches strings; Google evaluates whether the text reads
naturally and truncates at ~60 characters. Porting an Etsy title verbatim gives
you a title that is cut off in results and reads as keyword stuffing.

Rewrite: keep the primary keyword in the first 30 characters, drop the comma
tail, and put the discarded phrases into the body copy where they belong.

## Near-identical product families

Shops that sell one design in twelve colourways end up with twelve listings whose
copy differs by one word. Deduplicating these mechanically produces twelve
identical meta descriptions, which is exactly the shape Google's *scaled content
abuse* policy names.

The fix that works: **lead with the artwork**, because in a family of near-clones
the artwork is the only real differentiator. Not "Personalized linen table
runner" twelve times, but "Burgundy rose", "White anemone", "Talavera sunflower".

## Writing to the Shopify Admin API

If the task involves writing fields back through the API rather than the admin
UI, read [references/shopify-api-traps.md](references/shopify-api-traps.md)
**before the first write**. It covers the `SEOInput` replacement behaviour that
silently nulls meta descriptions, how image alt behaves on shared files, and the
probe-one-first protocol that catches this class of bug at a cost of one product
instead of hundreds.

The short version, because it is worth repeating here:

- `productUpdate(input: {seo: {title}})` **replaces the whole `seo` object**.
  Send both `title` and `description` on every write, carrying the live value for
  the field you are not changing.
- Never change a handle on a ranking product without a 301 redirect in the same
  change. A handle that reads badly but ranks beats a pretty handle that lost its
  history.
- Probe one product, read it back, and confirm nothing else moved before running
  the batch.

## Validate before publishing

```bash
node scripts/check-listing.mjs listing.json --suffix " | Brand"
node scripts/check-listing.mjs catalog.json --suffix " | Brand" --catalog
```

The checker takes one listing or a whole catalog array and reports every rule
that fails, including cross-listing duplicates that a single-listing check cannot
see. See [examples/listing.json](examples/listing.json) for the input shape. It
exits non-zero when something fails, so it drops into a pre-publish hook.

Run it and fix what it reports rather than eyeballing character counts — counting
by hand is where the off-by-a-few errors come from.

## What this skill deliberately does not do

- **Invent specifications.** Sizes, materials and production times must come from
  the shop's own variant data and policies. A confident, wrong "ships in 2 days"
  costs more than a missing sentence.
- **Write for AI crawlers separately.** Complete structured data and clear specs
  are what get a product cited in AI answers. A separate hidden page or a block
  of fake Q&A at the bottom of every listing is the thin-content pattern that gets
  penalised.
- **Promise rankings from field edits alone.** Titles and meta descriptions are
  proposals; Google rewrites most of them. Measure in Search Console over weeks,
  not days.
