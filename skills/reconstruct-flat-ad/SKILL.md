---
name: reconstruct-flat-ad
description: Analyze a flattened ad image and reconstruct it as a semantic, editable Open Ads design IR for Figma. Use when detecting text, matching fonts, removing text by inpainting, separating product and decorative assets, extracting logos, rebuilding layer geometry, or recreating a reference ad.
---

# Reconstruct Flat Ad

Reconstruct appearance and structure without pretending hidden source data is recoverable with certainty.

## Workflow

1. Read `references/reconstruction-method.md`.
2. Inspect the source at original resolution.
3. Record the frame size, grid, dominant colors, hierarchy, and alignment anchors.
4. Detect semantic regions: background, product/model, logo, headline, supporting copy, offer, price, CTA, legal, and decorations.
5. OCR every text region and retain the crop, transcription, geometry, language, and confidence.
6. Match fonts using letterform evidence, then choose an available exact font or documented substitute.
7. Build masks for all text and graphic overlays that must become editable.
8. Inpaint only the masked background. Preserve an untouched source copy.
9. Extract assets only when their edges and content are observable. Prefer official logo/product source files over AI reconstruction.
10. Create an object compatible with `schemas/ad-ir.schema.json`.
11. Set `review.required` when any text, font, logo, inpainted area, or product boundary is uncertain.

## Quality rules

- Keep reconstructed text editable.
- Do not regenerate brand lettering or exact logos from memory.
- Do not erase product detail to obtain a cleaner background.
- Use confidence per layer, not one global accuracy score.
- Report what cannot be recovered because it was hidden by flattened content.
- Preserve the reference image for visual comparison.

The output is a reconstruction draft for designer approval, not proof that the exact original source has been recovered.
