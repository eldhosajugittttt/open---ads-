---
name: multiply-ad-variants
description: Recompose one approved master ad into multiple Meta, Instagram, Stories, Reels, Google Performance Max, retail, display, or custom-size variants. Use when resizing ads, adapting crops, changing product or copy variants, generating export plans, or scaling a Figma creative without stretching it.
---

# Multiply Ad Variants

Preserve the creative idea while changing the composition for each target.

## Workflow

1. Read `references/responsive-layout.md` and load `config/canvas-presets.json` when using the Open Ads repository.
2. Run `node scripts/plan-variants.mjs <campaign.json>` when using the Open Ads repository.
3. Lock approved product, logo, offer, price, legal, and destination data.
4. Copy semantic roles rather than raw coordinates from the master.
5. Resolve dimensions using explicit campaign size first, named platform placement second, and the house canvas preset third. Recompose each target using its safe zone, surface behavior, and the layout order in `references/responsive-layout.md`.
6. Shorten copy only from approved alternatives. Never rewrite legal text.
7. Load `$crop-creative-images` only when image-fill cropping is required. Load `$expand-banner-images` only when no safe crop, fit, or recompose can preserve product truth.
8. Name frames and exports deterministically.
9. Mark every generated variant for designer review.
10. Run a final collision pass after all text wrapping, image changes, and logo placement; reject overlaps, clipped content, unsafe tangencies, and inconsistent margins.

Produce a manifest connecting each frame to campaign, target, locale, concept, product asset, source master, and export filename.
