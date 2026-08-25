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

**45-70 characters.** Primary keyword inside the first 30.

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

**Good** (55 chars):
`Personalized Wedding Welcome Sign, Couple Portrait Decor`

## 3. SEO title

**60 minus the brand suffix.** See the SKILL.md section on finding the suffix.

Shopify stores this field as null when it equals the product title, so "no SEO
title" means the product title is doing the job — check its length, not the empty
field.

Set an SEO title whenever the product title exceeds the budget. This is the
highest-leverage, lowest-risk edit in listing SEO: it touches no URL, so there is
no ranking risk at all.

## 4. Meta description

**120-155 characters, unique across the catalog.**

Not a ranking factor — a click-through factor. Mobile shows roughly 110-120
characters, so the thing that makes someone click belongs in the first half of
the sentence.

Say what it is, what gets personalized or configured, and how many choices there
are. Google rewrites most hand-written meta descriptions, so spend the effort on
products that already have impressions rather than polishing every one.

**Good** (143 chars):
`Beach bachelorette backdrop for a coastal weekend away, personalised with your names. Six colourways and five sizes, ships in 3 to 5 business days.`

Watch for descriptions far over budget — 400, 900, 1000 characters. Those are
almost always a whole paragraph pasted into the wrong box, not a writing choice.

## 5. URL handle

**3-5 words, lowercase, hyphen-separated, no filler** (`for`, `the`, `and`,
`with`, `your`, `of`).

Set it correctly at creation. Changing it later is the one edit in this document
that can lose rankings outright.

> A handle change without a 301 redirect in the same change discards every link
> and every ranking the old URL earned. If the shop's API credentials lack the
> scope to create redirects, the correct action on an existing handle is: leave
> it alone. An ugly handle that ranks beats a clean handle that does not.

For a catalog full of bad handles, the honest recommendation is usually to fix
the rule going forward and leave the existing URLs.

## 6. Body copy

**250+ words minimum, six sections, unique.**

Structure it as the order a buyer actually asks:

1. **What it is** — one or two sentences, primary keyword used naturally
2. **What gets personalized** — every field, with what it accepts
3. **Specifications** — exact dimensions with units, material, mounting
4. **Timing** — production time, delivery time, order-by guidance
5. **Care**
6. **Occasions**

Sections 3 and 4 are the ones most often missing and the ones buyers search for.
A listing without exact dimensions can never match `30x40 table runner`.

Every fact in sections 3 and 4 must come from the shop's real variant data and
published policies. If a number is not available, leave the sentence out. An
invented lead time is a customer-service problem, not an SEO win.

Copy must be unique. Reusing a paragraph across a product family is precisely
Google's *scaled content abuse* pattern — and note that the policy is about
value, not authorship, so "a human wrote it" is not a defence and "AI wrote it"
is not the violation.

## 7. Images and alt text

- Descriptive, hyphenated, lowercase filenames set **before** upload:
  `linen-table-runner-sweetheart-30x40.jpg`, not `IMG_4821.jpg`
- Primary image 1:1, at least 1000x1000 px (Google Merchant requires a 500x500
  minimum from 31 January 2027, so shoot larger)
- Alt on **every** image, not only the first

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

Required for a product rich result: `name`, `image`, plus an `offers` block with
`price`, `priceCurrency` and `availability`.

Recommended and usually missing:

| Property | Why it earns its place |
| --- | --- |
| `aggregateRating` | Stars in results, the biggest CTR lever in gift categories |
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
