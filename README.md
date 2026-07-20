# Open Ads

Open Ads is a small, skill-first foundation for turning one approved ad concept into editable, platform-ready creative variants. It is designed for Codex, Figma, image generation, and human art direction.

The repository deliberately reuses only the useful foundation from [Open Design](https://github.com/nexu-io/open-design): a structured design intermediate representation (IR), a staged migration workflow, token thinking, product-image discipline, and visual QA. It does not copy the desktop application or its broad collection of unrelated skills.

## What works now

- Seven reusable Codex skills cover planning, Shopify/product ingestion, flattened-ad reconstruction, platform composition, product imagery, variant multiplication, and QA.
- A machine-readable placement registry covers Meta/Instagram Feed, Stories and Reels plus Google Performance Max image and logo assets.
- `plan-variants.mjs` converts a campaign brief into a deterministic list of platform canvases and layout rules.
- `validate-campaign.mjs` catches missing approvals, invalid copy lengths, duplicate export names, unsafe product-generation states, and unsupported placements.
- JSON Schemas define the campaign contract and the editable Figma ad IR.
- A sample saree campaign and automated tests show the intended workflow.

## Quick start

Requires Node.js 20 or newer. No package installation is needed.

```bash
npm test
npm run validate:sample
npm run plan:sample
```

The variant plan prints JSON to standard output. Save it only after review:

```bash
node scripts/plan-variants.mjs sample-data/saree-campaign.json > variant-plan.json
```

## Workflow

1. Run `$plan-ad-campaign` to turn the brief into approved structured data.
2. Run `$ingest-product-assets` for Shopify or other product sources.
3. If the source is a flattened reference, run `$reconstruct-flat-ad` to produce an editable ad IR and an uncertainty report.
4. Run `$generate-product-imagery` only where new textless imagery is needed.
5. Run `$compose-platform-ads` to create the master composition.
6. Run `$multiply-ad-variants` to recompose it for the target placements.
7. Run `$audit-ad-creative` before export or delivery.

## Repository map

```text
config/                 Versioned placement rules
docs/                   Architecture, provenance, and roadmap
packages/figma-ir/      Contract for the future Figma importer
sample-data/            Valid examples
schemas/                Campaign and ad-IR JSON Schemas
scripts/                Dependency-free planner and validator
skills/                 Seven installable Codex skills
tests/                  Automated checks
```

## Important boundaries

- The system never invents prices, discounts, claims, legal copy, or product details.
- The product image is the source of truth. AI-generated product imagery requires explicit review.
- Text, logos, prices, CTA buttons, and legal copy remain editable layers.
- Flattened-ad reconstruction is an approximation when hidden pixels, exact fonts, or original logos are unavailable.
- The repository prepares assets; it does not publish ads.
- Platform rules change. Check `verified_at` and `sources` in `config/platform-specs.json` before production use.

## License

Apache-2.0. See `LICENSE` and `NOTICE`. Open Design provenance and reuse boundaries are documented in `docs/open-design-extract.md`.
