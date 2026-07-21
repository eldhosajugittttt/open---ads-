# Routing examples

| Request | Load now | Do not preload |
| --- | --- | --- |
| Plan a campaign from a brief | `plan-ad-campaign` | imagery, resize, QA |
| Fetch a Shopify product and verify its logo | `ingest-product-assets` | composition, banner expansion |
| Rebuild a flattened reference | `reconstruct-flat-ad` | platform composition until reconstruction is approved |
| Choose brand fonts and hierarchy | `direct-brand-typography` | image generation |
| Generate one product lifestyle master | `generate-product-imagery` | batch generation |
| Generate four distinct campaign images | `batch-generate-images` | single-image generation workflow |
| Fix a subject cut off by image fill | `crop-creative-images` | banner expansion unless no safe crop exists |
| Adapt a portrait image into 21:9 | `crop-creative-images`, then `expand-banner-images` only if required | campaign planning |
| Build Meta and PMax master layouts | `compose-platform-ads` | reconstruction unless a flattened source is supplied |
| Resize an approved master | `multiply-ad-variants` | planning and product ingestion if already approved |
| Final pre-export review | `audit-ad-creative` | creative generation unless fixing is authorized |

For end-to-end requests, route one phase at a time: plan → ingest/reconstruct → brand/imagery → compose → resize → audit.
