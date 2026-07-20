---
name: compose-platform-ads
description: Compose a structured, editable master ad and platform-specific creative for Meta Feed, Instagram Feed, Stories, Reels, banners, and Google Performance Max. Use when deciding canvas ratios, hierarchy, Meta 9:16 critical-content zones, product placement, editable copy, AI side-expansion for wide banners, PMax overlay-free assets, Figma layer structure, or overlap-safe responsive layouts.
---

# Compose Platform Ads

Build one clear master concept, then respect how each platform consumes creative.

## Workflow

1. Read `references/platform-rules.md`.
2. Validate campaign approvals and target placement IDs.
3. Choose the hardest target ratio as the composition stress test and decide whether each ratio needs a crop, re-layout, or image outpaint.
4. Place the product or service benefit as the primary focal point.
5. Keep logos, copy, prices, CTA, and legal content as editable layers.
6. Use a textless or overlay-free visual master where PMax requires flexible assembly.
7. Create a semantic layer structure compatible with the Open Ads IR.
8. For wide banners, side-expand the approved image when cropping would remove or weaken the product, model, face, hands, or garment.
9. For Meta 9:16, apply the critical-content zone and default overlay rules in `references/platform-rules.md`.
10. Define decorative strokes, brackets, borders, and corner curves as exclusion zones.
11. Run the decoration-collision pass in `references/platform-rules.md`.
12. Check the composition at actual export size after the final edit, not only zoomed in.

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

## Ratio-transition gate

- Compare the approved source ratio with every target ratio before placing the image.
- Never stretch a photograph or force one crop across unrelated aspect ratios.
- If a landscape or banner crop would cut the product, face, hands, garment, or intended negative space, generate a new wide-safe image by extending the left and right sides.
- Treat the approved image's subject, product details, identity, pose, lighting, perspective, and central composition as invariants. Generate only the missing side context.
- Keep the generated image free of logos, copy, prices, CTAs, borders, and watermarks. Add those as editable Figma layers.
- Inspect side seams, repeated patterns, anatomy, and product truth before using the expansion.

## Meta Story/Reel critical-content gate

For a 1080x1920 Story or Reel, create a hidden guide named `SAFE_ZONE / Meta Story Critical Content` at `x=64`, `y=128`, `width=952`, `height=1200`.

- Keep the hero product/model, face, callouts, and all essential message text entirely inside this zone.
- Background imagery and decorative framing may extend outside it.
- Omit the logo, product title, price/offer, CTA button, `SHOP NOW`, and `BUY NOW` by default. Meta supplies identity and action UI around the creative.
- Include a normally omitted overlay only when the campaign brief explicitly requires it, then keep it inside the critical zone.
- Keep the guide hidden in exported assets.

## Decorative-frame collision gate

Passing a frame-bounds check is not enough. Content can remain inside the canvas while colliding with an ornamental border.

- Keep text and logos at least 24 px from straight decorative strokes.
- Keep logos, prices, and CTAs at least 40 px from curves, corner radii, and line endpoints.
- Never make a content edge tangent to a border by sharing the same x or y coordinate.
- Place content clearly inside or clearly outside an ornamental frame; never straddle it.
- Treat the logo/top border, callout/bracket endpoints, footer/left curve, and CTA/right-bottom curve as mandatory review pairs.
- If geometry-based QA cannot interpret a vector path, create explicit `DECORATION_EXCLUSION` rectangles or a temporary safe-zone overlay around its occupied areas.
- After cloning or reparenting an SVG, logo, or grouped asset, explicitly set its intended Figma constraints. Use `{ horizontal: "MIN", vertical: "MIN" }` for art-directed absolute positioning unless another behavior is intentional.
- Do not trust coordinates returned only by the write call. Re-read cloned or reparented assets in a separate Figma call to confirm their x/y values remain stable after constraint resolution.
- Take a final screenshot after all repositioning. Do not approve the ad until the exclusion overlay can be hidden without revealing collisions or awkward tangencies.
