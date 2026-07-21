---
name: crop-creative-images
description: Plan and produce intentional crops of approved campaign imagery while protecting products, faces, hands, logos, copy space, and visual hierarchy. Use when adapting one image to a new aspect ratio, setting Figma image-fill crop positions, diagnosing cut-off subjects, or deciding whether to crop, fit, recompose, or expand an image. Do not use for generating unrelated new scenes.
---

# Crop Creative Images

Protect meaning before filling the canvas.

## Workflow

1. Read `references/crop-decisions.md`.
2. Record the source dimensions, target dimensions, focal subject bounds, face/hands bounds, product-truth area, and intended copy zone.
3. Classify the transition as `SAFE_CROP`, `ART_DIRECTED_CROP`, `FIT`, `RECOMPOSE`, or `EXPAND`.
4. Preserve the focal subject and product-truth area with breathing room; never crop through a face, hand, logo, garment feature, package edge, or important product detail.
5. Set an explicit focal point for every Figma image fill. Do not rely on default center-crop behavior.
6. Move editable copy and decorations before sacrificing the product.
7. Use `FIT` with a designed background when no honest crop exists.
8. Route wide-image expansion to `$expand-banner-images` only when crop and re-layout both fail.
9. Review at exact export size and record crop coordinates or focal-point percentages in the variant manifest.

## Completion gate

- The product and intended message remain immediately understandable.
- No protected feature touches the crop edge accidentally.
- Copy space is deliberate rather than leftover space.
- Related variants feel art-directed, not mechanically centered.
- No image is stretched or enlarged beyond acceptable source quality.
