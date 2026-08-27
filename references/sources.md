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
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) — the *scaled content abuse* section

## Register of each number

Everything numeric in this skill traces to one of these, or is labelled
CONVENTION because it traces to nothing:

| Number | Source | Register |
| --- | --- | --- |
| Feed title 1-150 chars | Merchant Center product data spec | HARD RULE |
| "first 70 or fewer characters" | Merchant Center product data spec | display observation |
| "Use all 150 characters" | Merchant Center product data spec | RECOMMENDATION |
| Handle max 255 chars | Shopify `productUpdate` error | HARD RULE |
| Feed images 500x500 from 2027-01-31 | Merchant Center | HARD RULE |
| `<title>` ~580-600px desktop | third-party pixel measurement | CONVENTION |
| Meta description 120-155 chars | third-party measurement | CONVENTION |
| Minimum description word count | **nothing — Google says it has none** | folklore |
| Optimal handle length | **nothing** | folklore |
| Product title 45-70 chars | **nothing** | folklore |

## Shopify

- [Adding keywords for SEO](https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords)
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
