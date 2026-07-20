---
name: compose-platform-ads
description: Compose a structured, editable master ad and platform-specific creative for Meta Feed, Instagram Feed, Stories, Reels, and Google Performance Max. Use when deciding canvas ratios, hierarchy, safe zones, product placement, editable copy, PMax overlay-free assets, or Figma layer structure.
---

# Compose Platform Ads

Build one clear master concept, then respect how each platform consumes creative.

## Workflow

1. Read `references/platform-rules.md`.
2. Validate campaign approvals and target placement IDs.
3. Choose the hardest target ratio as the composition stress test.
4. Place the product or service benefit as the primary focal point.
5. Keep logos, copy, prices, CTA, and legal content as editable layers.
6. Use a textless or overlay-free visual master where PMax requires flexible assembly.
7. Create a semantic layer structure compatible with the Open Ads IR.
8. Check the composition at actual export size, not only zoomed in.

## Figma layer order

```text
BACKGROUND
PRODUCT_IMAGE
DECORATIONS
LOGO
CONTENT
  HEADLINE
  SUBHEADLINE
  OFFER
  PRICE
  CTA
LEGAL
SAFE_ZONE
```

Use Auto Layout for content groups where text changes should reflow. Keep art-directed imagery independently positionable. Do not flatten the complete composition.
