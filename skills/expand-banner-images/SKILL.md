---
name: expand-banner-images
description: Extend the left and right environment of an approved image for wide banner, 1.91:1, 16:9, 2:1, or 21:9 layouts while preserving the original subject, product, identity, pose, lighting, perspective, and central pixels. Use when cropping would cut or weaken a product, model, face, hands, garment, or required copy space. Do not use when a normal crop or layout recompose is sufficient.
---

# Expand Banner Images

Generate missing context, not a replacement image.

## Workflow

1. Load the standard `imagegen` skill and read `references/side-expansion.md`.
2. Inspect the approved source at original resolution and label it as the edit target and product-truth reference.
3. Resolve the exact target from `config/canvas-presets.json` or the approved placement.
4. Create a larger target canvas and lock the original image in place without stretching it.
5. Request generation only for the missing left and right environment. Preserve the original central subject and all product pixels.
6. Continue perspective lines, depth, lighting direction, shadows, grain, palette, and background texture naturally.
7. Keep the expanded image free of text, logos, prices, badges, borders, CTAs, and watermarks.
8. Inspect both seams, repeated objects or patterns, new anatomy, product mutations, lighting discontinuities, and usable copy space.
9. Save the wide-safe master with provenance linking it to the source image and target ratio.

Reject the result if the model changes identity or pose, the garment or product changes, a logo is regenerated, or the side context competes with the focal subject.
