---
name: plan-ad-campaign
description: Turn an advertising brief, product link, reference creative, or campaign request into a structured Open Ads campaign record. Use when planning Meta, Instagram, Stories, Reels, Google Performance Max, product-led retail, fashion, mall, or multi-size campaigns before design or image generation.
---

# Plan Ad Campaign

Create an approved production contract before creating artwork.

## Workflow

1. Read `references/campaign-contract.md`.
2. Collect the client, objective, audience, locale, target placements, destination URL, deadline, product assets, logo, copy, offer, price, claims, and legal text.
3. Separate supplied facts from creative suggestions.
4. Mark missing approval-sensitive facts as `pending`; never fill them by guessing.
5. Define one master concept with a single visual hierarchy and focal point.
6. Select targets from `config/platform-specs.json` when working inside Open Ads.
7. Create `pmax_copy` when any Google PMax target is selected.
8. Save or return a campaign object compatible with `schemas/campaign.schema.json`.
9. Run `node scripts/validate-campaign.mjs <campaign.json>` when the repository is available.

## Output

Return:

- the campaign JSON;
- a short list of missing assets and pending approvals;
- the proposed master ratio and why it is the hardest composition;
- risks involving product truth, legal claims, fonts, logos, or source rights.

Do not create final designs until concept and product-truth approvals are `approved`.
