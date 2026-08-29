# Sources

Primary documentation. Read these directly when a rule is disputed — everything
in this skill is downstream of them, and they change.

## Google Search Central

- [Merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- [Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Product variant structured data](https://developers.google.com/search/docs/appearance/structured-data/product-variants)
- [Ecommerce SEO best practices](https://developers.google.com/search/docs/specialty/ecommerce)
- [URL structure for ecommerce](https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites)
- [Share product data with Google](https://developers.google.com/search/docs/specialty/ecommerce/share-your-product-data-with-google)
- [Image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) — the *scaled content abuse* and *keyword stuffing* sections
- [Title links](https://developers.google.com/search/docs/appearance/title-link) — no length limit, and the list of reasons Google rewrites a title
- [Snippets](https://developers.google.com/search/docs/appearance/snippet) — no meta description limit, one distinct description per page
- [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — "(No, we don't.)" on word count
- [Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) — what does *not* work for AI Overviews
- [Merchant Center 2026 spec update](https://support.google.com/merchants/answer/16989427) — image minimum dates, new feed attributes

## Register of each number

Everything numeric in this skill traces to one of these, or is labelled
CONVENTION because it traces to nothing.

**Four registers, not three.** Beyond HARD RULE / RECOMMENDATION / CONVENTION
there is **INTERNAL OBSERVATION**: a number this repo measured itself. It is not
folklore — it has a method — but nobody else publishes it and it may not
generalise beyond the catalogue it came from. Label those rather than letting
them pass as convention.

**Two publishers, checked separately.** An earlier version of this table asked
only "does Google publish it?" and wrote *folklore* whenever the answer was no.
That mislabelled three numbers Shopify publishes in the Help Center page linked
below — and the page was already in this file's source list. Google silence is
not the absence of a source. Both columns get checked.

| Number | Google | Shopify | Register |
| --- | --- | --- | --- |
| Feed title 1-150 chars | Merchant Center product data spec | — | **HARD RULE** |
| "first 70 or fewer characters" | Merchant Center product data spec | — | display observation |
| "Use all 150 characters" | Merchant Center product data spec | — | **RECOMMENDATION** |
| No price/sale/shipping wording in feed titles | Merchant Center product data spec | — | **HARD RULE** |
| No capitals for emphasis in feed titles | Merchant Center product data spec | — | **HARD RULE** |
| Handle max 255 chars | — | `productUpdate` error | **HARD RULE** |
| Feed images 500x500 from 2027-01-31 | Merchant Center | — | **HARD RULE** |
| Feed images 1500x1500 | [`image_link` spec](https://support.google.com/merchants/answer/6324350) | — | **RECOMMENDATION** |
| `<title>` length | **no limit published** — "typically to fit the device width" | "consider keeping your title up to 60 characters" | **RECOMMENDATION** (Shopify) |
| `<title>` ~580-600px desktop | — | — | CONVENTION — third-party measurement, no publisher |
| Arial 20px advance widths | — | — | **INTERNAL OBSERVATION** — measured with canvas `measureText`, not published by anyone |
| Median 521px / max 617px over 278 titles | — | — | **INTERNAL OBSERVATION** — one live catalogue, not a general finding |
| Core Web Vitals LCP 2.5s / INP 200ms / CLS 0.1 | [Core Web Vitals](https://web.dev/articles/vitals) | — | **RECOMMENDATION** — page experience, outside this skill's listing-field scope |
| Meta description length | **no limit published**, and Google may ignore the text | "It's recommended that 160 characters is used" | **RECOMMENDATION** (Shopify) |
| One distinct meta description per page | snippet documentation | — | **RECOMMENDATION** |
| Description word count | **none** — "(No, we don't.)" | "at least 250 words of descriptive text" | **RECOMMENDATION** (Shopify) |
| Keyword stuffing threshold | **none** — defined qualitatively | — | — |
| Optimal handle length | **nothing** | **nothing** | folklore |
| Product title 45-70 chars | **nothing** | **nothing** | folklore |
| Meta description 120-155 chars | **nothing** | **nothing** | CONVENTION, this skill's own |
| Primary image 1:1 at 1000x1000 | **nothing** | **nothing** | folklore, removed |
| Tags 3-6 per product | **nothing** | **nothing** | CONVENTION, this skill's own |

A number can be a Shopify RECOMMENDATION and carry no Google weight at the same
time. That is not a contradiction — say which publisher it came from and let the
merchant decide. The one thing this skill will not do is call a published number
folklore.

## Shopify

- [Adding keywords for SEO](https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords)
  — the source of the 60-character title, 160-character description and 250-word
  page recommendations. Read it before calling any of those numbers unsourced.
- [Storefront search behaviour](https://help.shopify.com/en/manual/online-store/storefront-search/search-behavior)
  — the searchable field list. Shopify states "You can't change how results are
  ordered", and publishes no field weighting.
- [`SearchableField` enum](https://shopify.dev/docs/api/storefront/latest/enums/searchablefield)
- [SEO checklist](https://www.shopify.com/blog/seo-checklist-online-store)
- [Admin API productUpdate](https://shopify.dev/docs/api/admin-graphql/latest/mutations/productUpdate)
- [Admin API fileUpdate](https://shopify.dev/docs/api/admin-graphql/latest/mutations/fileUpdate)

## Measurement

Search Console is the only source of truth for whether a change worked:

| Question | Report |
| --- | --- |
| Is the page indexed | Pages / Indexing |
| Which pages have impressions but poor position | Performance, filtered to `/products/` |
| Is the structured data valid | Enhancements / Merchant listings |
| Is the page fast enough | Core Web Vitals — LCP under 2.5s, INP under 200ms, CLS under 0.1 |

Give it weeks, not days. Title and meta edits are proposals; Google rewrites most
of them and re-crawls on its own schedule.
