# Field rules

Thresholds, the reason each exists, and a worked example. Read the section you
need rather than the whole file.

- [1. Primary keyword](#1-primary-keyword)
- [2. Product title](#2-product-title)
- [3. SEO title](#3-seo-title)
- [4. Meta description](#4-meta-description)
- [5. URL handle](#5-url-handle)
- [6. Body copy](#6-body-copy)
- [7. Images and alt text](#7-images-and-alt-text)
- [8. Collections and internal links](#8-collections-and-internal-links)
- [9. Structured data](#9-structured-data)
- [10. Shopify's own fields: tags, product type, vendor, variants](#10-shopifys-own-fields-tags-product-type-vendor-variants)

## 1. Primary keyword

One primary, at most two supporting. More than that and every one of them ranks
weakly.

Three tiers, and only the third is winnable for most shops:

| Tier | Example | Where it goes |
| --- | --- | --- |
| Category | `wedding welcome sign` | Collection title and H1 |
| Product | `personalized wedding welcome sign` | Product title, SEO title |
| Long-tail | `custom wedding welcome sign with couple portrait 24x36` | Body copy, alt text |

Check cannibalization before committing: search the shop for the keyword and see
what already targets it. If something does, pick a different angle for this
listing — a different use case, material, size or occasion.

## 2. Product title

**First ~70 characters must identify the product. 150 characters maximum** when
the shop feeds Google Shopping.

Provenance matters here, because the widely repeated "45-70 characters" has
none: it is not in any Google or Shopify document. The real numbers belong to
Google Merchant Center's feed `title` attribute — 1-150 characters hard, "Users
will usually notice only the first 70 or fewer characters", and the explicit
best practices "Use all 150 characters" and "Put the most important details
first". If the product is published to the Google & YouTube channel, the Shopify
product title is that feed title.

Truncation past 150 is silent, plus a "Needs attention" feed warning. The item
is not disapproved.

The title does three jobs at once: it is the `<h1>`, the name on collection
grids, and — when no SEO title is set — the `<title>` tag itself. So it has to
read like a sentence a person would say, not a string of tags.

Two failures worth checking for explicitly, because both ship regularly:

- A word repeated back to back (`Personalized Personalized Wedding Hoop`), which
  happens when a bulk edit prepends a prefix that was already there.
- A comma tail of keyword phrases, usually an import artefact. It is truncated
  by Google and it is the visible `<h1>` on the storefront.

**Bad** (162 chars, repeated word, comma tail):
`Personalized Personalized Til Death Do Us Part Glass Ornament, Custom Gothic Wedding Ornament, Skeleton Couple Keepsake, Halloween Wedding Gift, Anniversary Decor`

**Good** (56 chars):
`Personalized Wedding Welcome Sign, Couple Portrait Decor`

## 3. SEO title

**Measured in pixels, not characters.** Google publishes no limit for `<title>`
— it truncates "typically to fit the device width". Third-party measurement puts
the desktop cut near 580-600px.

Character counting mis-sizes titles because Arial character widths vary more than
four-fold (`i` 4.4px, `W` 18.9px at 20px). Two titles of identical length can
differ by 100px. Measured on one live catalogue of 278 titles: median 521px,
maximum 617px, and **every title over 600px was only 48-49 characters long**.

Method:

1. Measure the storefront's brand suffix. ` | Shop` is 7 characters and about
   72px; an 11-character suffix like ` | LunaVows` costs about 110px — nearly a
   fifth of the budget. Measure the real one; do not reuse either number.
2. Divide the remaining pixels by ~9.9px (average width of English sentence-case
   text) for a character rule of thumb.
3. Tighten it when the title carries many capitals or `M W G O Q`.

`scripts/check-listing.mjs` does this measurement for you rather than counting
characters.

Shopify stores this field as null when it equals the product title, so "no SEO
title" means the product title is doing the job — check its width, not the empty
field.

Setting an SEO title is a low-risk edit: it touches no URL, so nothing has to be
redirected or recrawled. It is not a guaranteed win either — Google generates
title links from several sources and rewrites them when it judges the `<title>`
inaccurate, boilerplate or unclear.

## 4. Meta description

**120-160 characters, unique across the catalog.**

| Number | Source | Register |
| --- | --- | --- |
| Any length limit | Google publishes none | — |
| 160 characters | Shopify Help Center: "It's recommended that 160 characters is used" | **RECOMMENDATION** |
| A distinct description per page | Google snippet documentation | **RECOMMENDATION** |
| The 120 floor, and mobile ~110-120 | this skill | CONVENTION |

Uniqueness is the sourced part, so that is the part the checker fails on; length
is advice and only warns. Not a ranking factor either way — a click-through
factor. Narrow screens show roughly 110-120 characters, so the thing that makes
someone click belongs in the first half of the sentence.

Say what it is, what gets personalized or configured, and how many choices there
are. Google rewrites most hand-written meta descriptions, so spend the effort on
products that already have impressions rather than polishing every one.

**Good** (143 chars):
`Beach bachelorette backdrop for a coastal weekend away, personalised with your names. Six colourways and five sizes, ships in 3 to 5 business days.`

Watch for descriptions far over budget — 400, 900, 1000 characters. Those are
almost always a whole paragraph pasted into the wrong box, not a writing choice.

## 5. URL handle

| Fact | Source | Register |
| --- | --- | --- |
| Maximum 255 characters | Shopify: "Handle is too long (maximum is 255 characters)" | **HARD RULE** |
| Hyphens, not underscores | Google URL structure guidance | **RECOMMENDATION** |
| Readable words, not ID numbers | Google URL structure guidance | **RECOMMENDATION** |
| An optimal length or word count | Nothing published, by Google or Shopify | — |

There is no evidence-based optimal handle length. Google publishes no URL length
guidance at all, and the handle is not among the eight fields Shopify's storefront
search reads — so handle length affects neither ranking nor on-site findability.

Short handles are nicer to read and share. That is aesthetics, not a rule.

> The rule that matters is **set it once** — but be accurate about why. Google
> documents a 301 as a canonicalisation signal and does **not** say permanent
> redirects lose PageRank. The costs of a handle change are operational: the
> redirect has to exist, internal links and sitemaps and ad destinations still
> point at the old URL, Google has to recrawl before the new URL settles, and
> chains accumulate if it changes twice. None of that is a ranking penalty. It is
> work, and it is avoidable by getting the handle right the first time.

## 6. Body copy

**Six content sections, unique. Google sets no word-count minimum; Shopify
recommends 250 words.**

Google states its position in writing: "Are you writing to a particular word
count because you've heard or read that Google has a preferred word count? (No,
we don't.)"

Shopify's Help Center is a different publisher and does give a number: "Make sure
that every page has at least 250 words of descriptive text." That is a
RECOMMENDATION — no enforcement, no ranking claim — and an earlier version of this
file wrongly called it folklore.

Neither statement tells you to pad. What matters is whether the copy answers the
buyer's questions, which is what the six sections below are for; on a real
product they land past 250 words without trying.

Structure it as the order a buyer actually asks:

1. **What it is** — one or two sentences, primary keyword used naturally
2. **What gets personalized** — every field, with what it accepts
3. **Specifications** — exact dimensions with units, material, mounting
4. **Timing** — production time, delivery time, order-by guidance
5. **Care** — material-derived care may be written and labelled as standard
   guidance for that material; anything that depends on the print, embroidery,
   engraving or coating is a `[to fill: ...]` marker, because it is not
   inferable from the material name and a wrong line ruins a paid-for piece.
   If the material itself is unconfirmed, the whole section is a marker. See
   *Care: material-derived yes, process-derived no* in SKILL.md
6. **Occasions**

Sections 3 and 4 are the ones most often missing and the ones buyers search for.
A listing without exact dimensions can never match `30x40 table runner`.

Every fact in sections 3 and 4 must come from the shop's real variant data and
published policies. If a number is not available, leave the sentence out. An
invented lead time is a customer-service problem, not an SEO win.

Copy should be unique, but be precise about why. Scaled content abuse is defined
by **primary purpose and lack of user value** — "no matter how it's created" —
not by duplication, not by length, and not by whether AI wrote it. Reused
paragraphs across a product family are a quality and differentiation problem
first; they only become a policy problem when the pages exist mainly to
manipulate rankings.

## 7. Images and alt text

- Descriptive, hyphenated, lowercase filenames set **before** upload:
  `linen-table-runner-sweetheart-30x40.jpg`, not `IMG_4821.jpg`
- Feed images must be at least **500x500 px from 31 January 2027** (Merchant
  Center has warned on smaller images since 14 April 2026) — **HARD RULE**
- Google recommends **1500x1500 or above**; anything over 1024px counts as
  high-resolution for Merchant Center — **RECOMMENDATION**
- A 1:1 primary image is a storefront-theme preference, not a Google requirement
- Alt on every image that **carries information**. Purely decorative images take
  empty alt (`alt=""`) so a screen reader skips them — writing alt on everything
  regardless is bad accessibility advice

Alt text describes the picture to someone who cannot see it. That is the whole
job — it is not a second keyword field, and stuffing it helps nothing.

The trap in a product catalog is that not every image is a product photo.
Size charts, colour swatch grids, care instructions and packaging shots need alt
that says what they are:

| Image type | Alt shape |
| --- | --- |
| Product photo | `<product> <what the frame shows>` |
| Styled scene | `<product> <where it is placed>` |
| Size chart | `Size guide for the <product>: <the actual sizes>` |
| Colour grid | `Colour options for the <product>: <the actual colours>` |
| Packaging | `<product> in a gift box with ...` |

Writing all of these from the product title alone produces confidently wrong alt
on every chart. Look at the images. For a large catalog, a contact sheet — a grid
of numbered thumbnails, one image per tile — lets you classify dozens of images
per look instead of one.

## 8. Collections and internal links

Google's ecommerce guidance is explicit: use the **same URL** in internal links,
in the sitemap and in the canonical tag.

- Link products as `/products/<handle>`, never
  `/collections/<x>/products/<handle>` — the collection-scoped path is a second
  URL for the same product
- Use real `<a href>` anchors, not JavaScript navigation
- No tracking parameters in internal links

Before linking to a collection, open the URL and confirm it returns 200. Deleted
collections linked from hundreds of pages is a common and invisible failure.

## 9. Structured data

**Required** for a merchant listing: `name`, `image`, and an `offers` block
carrying `price` (greater than zero) and `priceCurrency`.

`availability` is **not** required — an earlier version of this file listed it as
such. It sits in the recommended set below, alongside the rest.

Recommended and usually missing:

| Property | Why it earns its place |
| --- | --- |
| `availability` | Stock state in results; cheap and almost always known |
| `aggregateRating` | Stars in results, which lift click-through in gift categories |
| `hasMerchantReturnPolicy` | Returns shown in results, and a top question to AI assistants |
| `shippingDetails` | Same, but only declare it if the number is real and stable |
| `itemCondition` | Constant for new goods, trivially cheap to add |
| `brand`, `sku` | Entity resolution |

Never emit a fabricated or zero-count `aggregateRating`. Only real review data,
and omit the node entirely when there is none.

`shippingDetails` deserves a warning: if the shop's shipping rate varies or has
been edited recently, a hardcoded rate in schema contradicts checkout. Declare it
only from a live value.

Collection pages are usually missing `ItemList`, and variant-heavy products are
usually missing `ProductGroup` with `productGroupID`, `variesBy` and
`hasVariant`. Both are worthwhile once the product-level nodes are correct.

## 10. Shopify's own fields: tags, product type, vendor, variants

These are not SEO fields in the Google sense — Google never sees most of them.
They matter because they are what Shopify's storefront search actually indexes,
so they decide whether a shopper who types a material, a size or an occasion
finds the product at all.

Shopify searches exactly eight product fields: `title`, `body`, `product_type`,
`vendor`, `tag`, `variants.title`, `variants.sku`, `variants.barcode`. It does
not search `seo.title`, `seo.description`, `handle`, `category` or metafields.

### Tags

Tags are search surface, not filing metadata. Every tag is a term a shopper can
match against.

**Use tags for** words a shopper would type: materials (`linen`, `acrylic`),
occasions (`bridal shower`, `anniversary`), recipients (`for the bride`),
colours, styles.

**Never use tags for** internal flags — `dept:gifts`, `customName`,
`needs-photo`, `supplier-3`. They match nothing a shopper types, and when most
of the catalog carries them they match nearly everything. On one live shop an
internal `customDate` tag returned 246 of 273 products through the search API.

Internal flags belong in **metafields**, which are not searched. Moving them is a
data migration, not a copy change, so plan it as one.

### Product type

Free text the merchant defines, and a search field. Keep it a consistent
controlled vocabulary — `Table Runner`, not `table runner` on some products and
`Runner (linen)` on others. Inconsistent values fragment both search and any
reporting built on them.

### Category (Shopify's standard taxonomy)

Distinct from product type: a node in Shopify's standardized taxonomy, used for
classification across Shopify surfaces and integrated marketplaces. Not searched
on the storefront, but it feeds channels and it is cheap to set correctly.

Audit for products left on `Uncategorized` — they are invisible to anything that
keys off the taxonomy.

### Vendor

A search field. If every product shares one vendor value, searching that value
returns the entire catalog — harmless, but it means vendor carries no
discriminating signal for you. Worth setting properly on multi-brand catalogs.

### Variant titles and SKU

Both searchable, which is the practical argument for filling SKU beyond what
Google wants: staff and repeat customers search by it.

Variant titles are also where size queries land. Keep the format consistent —
`30x40 in` and `20X60 Inches` on neighbouring products means one of them misses
a query the other catches. Pick one format and apply it across the catalog.
