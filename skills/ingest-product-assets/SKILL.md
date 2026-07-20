---
name: ingest-product-assets
description: Fetch and normalize approved e-commerce product data and images for advertising, especially from Shopify Storefront API product URLs. Use when a campaign provides a Shopify product link, needs variant-specific images, price or destination verification, product provenance, image caching, or a product asset manifest.
---

# Ingest Product Assets

Create a truthful product manifest before planning imagery or ads.

## Workflow

1. Read `references/shopify-storefront.md`.
2. Parse the shop domain and product handle from the supplied URL.
3. Prefer the shop's supported Shopify Storefront GraphQL API over brittle HTML scraping.
4. Use the versioned `product(handle: ...)` query; avoid deprecated queries in new integrations.
5. Fetch the title, handle, online-store URL, featured image, image list, selected or first available variant, price range, and required variant fields.
6. Preserve image URLs, dimensions, alt text, variant association, and API version in the manifest.
7. Download or cache only the assets required for the campaign.
8. Ask the designer to select the exact advertised variant when images or colors differ.
9. Mark price, availability, sale language, and product claims as approval-sensitive.
10. Never expose private Storefront tokens in client code, logs, prompts, or repository files.

## Output

Return a product manifest with source URL, shop, handle, API version, retrieved time, title, selected variant, price evidence, destination URL, image records, chosen product-truth image, and review status.

If API access is unavailable, request an approved product export or local assets. Do not silently scrape a storefront and treat the result as authoritative.
