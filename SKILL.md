---
name: shopify-listing-seo
description: Write a complete, standards-compliant Shopify product listing from a few facts about the product - product title, SEO title, meta description, URL handle, description HTML, tags and product type - and audit existing listings against the same rules. Every threshold is labelled as a hard rule, a documented recommendation, or unsourced convention, so nothing is enforced that no source supports. Use this whenever someone is writing, rewriting or auditing a Shopify product listing or product description, whenever they mention product SEO, listing SEO, meta title, meta description, product tags or storefront search, and whenever they are about to write product fields through the Shopify Admin API - even if they never say the word "SEO".
---

# Shopify listing SEO

Most listing advice repeats numbers that no Google or Shopify document contains.
This skill separates the three registers and never enforces the third as if it
were the first:

| Register | Meaning |
| --- | --- |
| **HARD RULE** | Published by Google or Shopify, with an enforcement mechanism |
| **RECOMMENDATION** | Published as advice, no enforcement |
| **CONVENTION** | A house style choice. Useful, but not a rule from anyone |

## Default path: interview, then write the whole listing

Most people asking for help do not want a lecture on thresholds — they want a
finished listing they can paste into Shopify. So unless they have explicitly
asked for an audit, work like this:

**Step 1 — ask for the facts.** If they gave you a photo, read it first (see
[Starting from a product photo](#starting-from-a-product-photo)) and skip
anything it already answered. Ask in the language the person is writing in, in
one message, and keep it to what you genuinely cannot infer:

1. What is the product, and what is it made of?
2. What can the buyer personalize? (names, date, photo, custom wording…)
3. What sizes, colours or other options exist? Give exact numbers and units.
4. How long does production take, and how long does delivery take?
5. What occasion or style is it for?
6. What is the shop name? (needed to size the SEO title — see below)

If they have already given some of this, do not ask again. If they answer only
some, write the listing and mark the gaps rather than inventing facts.

**Step 2 — write every field**, in this order, and hand them back as a block
they can copy field by field. Never invent a size, a material or a lead time; if
a fact is missing, leave the sentence out and say what is missing.

**Step 3 — self-check** against [the checklist](#self-check-before-handing-it-over)
and say which items you could not verify.

## Starting from a product photo

The most common real input is a photo plus a line or two of specs — someone has
the mockup they are about to upload and wants the listing written around it.
Read the image first, then ask only for what an image cannot tell you.

**Read from the image:**

| What | Notes |
| --- | --- |
| Product type and form | a runner, a hanging banner, an ornament, a sash |
| Material appearance | linen weave, acrylic, ceramic, wood grain, satin |
| Artwork and style | florals, gothic, coastal, disco, gingerbread |
| Colours actually shown | name the ones you can see, not a guessed palette |
| Personalization fields | listing mockups often label them — "CUSTOM NAME", "CUSTOM DATE", arrows pointing at the editable text |
| Sample text on the mockup | the names and dates printed on it are placeholders; use them to understand the layout, never copy them into the listing |
| Where it is used | a photo staged on a door, a mantel, a sweetheart table tells you the occasion |

**Never read from the image — always ask:**

| What | Why |
| --- | --- |
| Exact dimensions | a photo has no scale; "looks about 30 inches" is a guess that becomes a returns problem |
| Full option lists | one photo shows one colourway. It cannot tell you the other eleven exist |
| Material composition | linen and a linen-look polyester are indistinguishable in a render |
| Production and delivery time | not a visual property |
| Price | not a visual property |

If the image *is* a size chart or a colour grid, that changes things — those
carry real numbers, and you should read them. Say which numbers you took from
which image so the person can correct you.

### Decide: write now, or ask first

Write the full listing immediately when you have the product type, what is
personalizable, at least one exact dimension, and the timings. Everything else
can be inferred from the image or safely left out.

Ask first when a **spec** is missing — dimensions, materials, options, timings.
Ask in one message, list only the genuinely missing items, and say what you
already got from the photo so they are not re-typing it. Never fill the gap with
a plausible number.

The half-way case is common and worth handling well: enough to write most of it,
one thing missing. Write the listing, mark the gap inline in square brackets
(`[cần điền: thời gian sản xuất]`), and list the gaps under the output. That
gets them 90% of the way while making the hole impossible to miss.

## Sizing the SEO title: measure the brand suffix first

Storefronts append the shop name to the page title — `Product name | Shop`. That
suffix eats the display budget, and no guide mentions it.

Google publishes **no character limit** for `<title>`; it truncates "typically to
fit the device width", so truncation is a **pixel** problem, not a character one.
Third-party measurement puts desktop truncation around 580-600px. Arial 20px
character widths vary more than four-fold: `i` is 4.4px, `W` is 18.9px.

Practical method:

1. Measure the suffix. ` | LunaVows` is 11 characters and about **110px** — a
   fifth of the whole budget.
2. Budget ≈ 600px total. Average English sentence-case text runs ~9.9px per
   character, so `600px − suffix` divided by 9.9 gives a character target.
3. That lands near **49 characters** for an 11-character suffix. Treat it as a
   rule of thumb, and tighten it when the title is full of caps or wide letters
   (`M W G O Q`), which is exactly when a character count lies.

CONVENTION, derived from third-party pixel measurement — not a Google rule.

## Product title: front-load, do not truncate

The single most common bad advice is "keep product titles to 45-70 characters".
**No Google or Shopify document contains that range.** The only primary source
that states any title number is the Google Merchant Center feed spec — and if the
shop publishes to the Google & YouTube channel, the Shopify product title *is*
the feed title:

| Google's wording | Register |
| --- | --- |
| "Title [title]: 1–150 characters" | **HARD RULE** — truncation + a feed warning past 150, not disapproval |
| "Users will usually notice only the first 70 or fewer characters of your title, depending on screen size." | Display observation |
| "Use all 150 characters" | **RECOMMENDATION** |
| "Put the most important details first" | **RECOMMENDATION** |

So the fix for a long comma-tail title is **ordering, not deletion**: make the
first ~70 characters identify the product and say what makes it different, keep
the rest up to 150, and remove only repetition.

Keyword stuffing is defined qualitatively by Google — unnatural repetition,
list-like out-of-context keyword blocks — with no character threshold anywhere. A
long title is a dilution and readability problem, not a documented violation. A
title that repeats a word is the actual risk.

## Description: content, not word count

There is **no minimum word count**. Google states it in writing: *"Are you
writing to a particular word count because you've heard or read that Google has a
preferred word count? (No, we don't.)"* A "250-word minimum" is folklore.

Cover these six things, in this order, and the length takes care of itself:

1. What it is — one or two sentences, primary keyword used naturally
2. What the buyer personalizes — every field, and what it accepts
3. Specifications — exact dimensions **with units**, material, mounting
4. Timing — production time, delivery time, order-by guidance
5. Care
6. Occasions

Sections 3 and 4 are the ones most often missing and the ones buyers search for.
A listing with no dimensions can never match `30x40 table runner`.

On near-identical products: scaled content abuse turns on **primary purpose and
lack of user value** — "no matter how it's created" — not on duplication, not on
length, and not on whether AI wrote it. Reused paragraphs are a differentiation
problem first. In a family of near-clones the real differentiator is usually the
**artwork**, so lead with it.

## Description HTML

Write the description as HTML. A safe vocabulary that renders well nearly
everywhere:

`<p>` `<h3>` `<h4>` `<ul>/<li>` `<ol>/<li>` `<strong>` `<em>` `<a href>`

Avoid `style="…"`, `<table>`, `<font>`, `<script>`, `<iframe>`. Tables break on
phones and hand-set colours fight the theme. Do not write `<h1>` or `<h2>` — the
page already supplies those.

```html
<p>One or two sentences: what it is, what is printed on it, where it goes.</p>

<h3>What you personalize</h3>
<p>Add your names, wedding date and venue in the fields on this page.</p>

<h3>Sizes and options</h3>
<ul>
  <li><strong>Sizes:</strong> 20x60, 24x72 and 35x100 inches</li>
  <li><strong>Material:</strong> cotton linen or polyester</li>
</ul>

<h3>Making and delivery</h3>
<p>Made to order. Production takes 1 to 3 business days, then tracked delivery
takes 5 to 12 business days.</p>
```

## Handle: set it once; length does not matter

| Fact | Source | Register |
| --- | --- | --- |
| Maximum 255 characters | Shopify: "Handle is too long (maximum is 255 characters)" | **HARD RULE** |
| Hyphens, not underscores | Google URL structure guidance | **RECOMMENDATION** |
| Readable words, not ID numbers | Google URL structure guidance | **RECOMMENDATION** |
| An optimal length | **Nothing published anywhere** | — |

Google publishes no URL length or word-count guidance, and the handle is not one
of the fields Shopify's storefront search reads, so handle length affects neither
ranking nor on-site findability.

The rule that matters is **set it once**. Changing a handle spends the ranking
equity the old URL earned, even when the redirect works. On a product with
history, leave it alone. See
[references/shopify-api-traps.md](references/shopify-api-traps.md) for the
`redirectNewHandle` mechanics when a change is genuinely required.

## The fields Shopify's own search reads

A listing is indexed by two systems that read different fields. Shopify's
storefront search reads exactly eight:

`title`, `body`, `product_type`, `vendor`, `tag`, `variants.title`,
`variants.sku`, `variants.barcode`

It does **not** read `seo.title`, `seo.description`, `handle`, `category` or
metafields. Two consequences:

- The SEO title and meta description are a Google-only surface. The product
  title carries in both places, which is why it earns the most attention.
- Tags, product type, vendor and variant titles are query matches. Use tags for
  words a shopper types — materials, occasions, recipients, colours — and keep
  internal flags (`dept:gifts`, `needs-photo`) in metafields, which are not
  searched. On one live shop an internal tag matched 246 of 273 products.

Shopify does not publish ranking weights, only the field list. Claims that
"titles outrank descriptions" are not sourced to Shopify.

## Meta description

120-155 characters, unique per product. Both numbers are **CONVENTION** — Google
publishes no limit and is not obliged to use the text at all ("snippets are
primarily created from the page content itself"). Writing a distinct one per page
*is* a documented recommendation.

Lead with what the product is and what is personalizable; mobile shows roughly
the first half.

## Images

| Fact | Register |
| --- | --- |
| Google Merchant Center will require feed images ≥ **500x500 px from 31 January 2027** | **HARD RULE**, feed images only |
| Descriptive, hyphenated filenames | **RECOMMENDATION** |
| Alt text on every image | **RECOMMENDATION** — Google uses it to understand images; also accessibility |

Shoot larger than the minimum. Alt text describes the picture to someone who
cannot see it — it is not a second keyword field. Charts and swatch grids need
alt saying what they are, not the product name.

## Self-check before handing it over

```
[ ] Product title: first ~70 characters identify the product
[ ] Product title: 150 characters or fewer
[ ] Product title: no word repeated back to back, no ALL CAPS, no "Sale"
[ ] SEO title: fits the budget once the brand suffix is added
[ ] Meta description: 120-155 characters, not reused from another product
[ ] Handle: lowercase, hyphens, readable, under 255 characters
[ ] Description: covers all six content sections
[ ] Description: exact dimensions with units
[ ] Description: production and delivery time
[ ] Description HTML uses only the safe tag vocabulary
[ ] Tags: 3-6 words a shopper would type, no internal flags
[ ] Nothing invented — every spec came from the person, not from you
```

Run the checker when the listing exists as JSON:

```bash
node scripts/check-listing.mjs listing.json --suffix " | Shop"
node scripts/check-listing.mjs catalog.json --suffix " | Shop" --catalog
```

Catalog mode is where the value is: duplicate meta descriptions, duplicate body
openings and two listings fighting over one keyword are invisible one at a time.

## What this skill will not do

- **Invent specifications.** A confident wrong "ships in 2 days" costs more than
  a missing sentence.
- **Enforce unsourced numbers.** If a threshold has no source, it is labelled
  CONVENTION and can be overridden.
- **Promise rankings from field edits.** Google rewrites most titles and
  descriptions. Measure in Search Console over weeks.
