# Platform rules

Use `config/platform-specs.json` as the machine-readable authority when available. It was verified on 2026-07-20 and must be rechecked periodically.

## Default Figma canvas sizes

Use `config/canvas-presets.json` as the machine-readable authority for ratio-based Figma canvases. Apply this priority:

1. Explicit dimensions in the approved brief.
2. Named placement dimensions from `config/platform-specs.json`.
3. The Open Ads house preset below.

| Ratio | Default dimensions | Common use |
| --- | --- | --- |
| 9:16 | 1080 × 1920 | Reels, Stories, Shorts |
| 4:5 | 1080 × 1350 | Instagram Feed Portrait |
| 1:1 | 1080 × 1080 | Instagram Square |
| 1.91:1 | 1200 × 628 | Facebook/LinkedIn link previews |
| 16:9 | 1920 × 1080 | YouTube, landscape video |
| 3:4 | 1080 × 1440 | Portrait photos |
| 2:3 | 1080 × 1620 | Photography prints |
| 3:2 | 1620 × 1080 | DSLR landscape |
| 5:4 | 1350 × 1080 | Landscape feed |
| 21:9 | 2520 × 1080 | Ultrawide banners |
| 2:1 | 2160 × 1080 | Wide banners |

For 1.91:1, use 1200 × 628 by default. Use 1080 × 566 only when a 1080-pixel-wide alternate is explicitly useful.

## Meta and Instagram

- Feed: prefer 4:5 for mobile impact; keep a 1:1 option for reusable square creative.
- Stories and Reels: use 9:16 and keep the hero visual, callouts, and every essential message inside the critical-content zone.
- Use one focal point, short on-image copy, and a clear action.
- Keep important content away from top identity controls and lower CTA/interface overlays.
- When decorative borders or corner brackets are present, add a second safe zone inside the ornament: 24 px from straight strokes and 40 px from curves or endpoints. Frame-bounds validation alone does not satisfy this rule.
- Reels video should feel native, vertical, and use appropriate audio when rights permit.

Working sizes in the registry are 1080×1350 for 4:5, 1080×1080 for 1:1, and 1080×1920 for 9:16.

### Meta 9:16 house rule

For a 1080×1920 Story or Reel, use the reference-tested critical-content rectangle `x=64`, `y=128`, `width=952`, `height=1200`.

- Put the model or product, face, callouts, and essential text fully inside this rectangle.
- Allow only background imagery and nonessential decoration outside it.
- Default to no embedded logo, product title, price, offer, CTA button, `SHOP NOW`, or `BUY NOW`; the placement UI provides identity and action controls.
- Add a normally omitted overlay only when explicitly required by the brief, and keep it inside the rectangle.
- Store the rectangle as a hidden Figma layer named `SAFE_ZONE / Meta Story Critical Content`; never export the guide.

## Google Performance Max

- Landscape image: 1.91:1, 1200×628 recommended.
- Square image: 1:1, 1200×1200 recommended.
- Portrait image: 4:5, 960×1200 recommended.
- Keep critical content within the center 80%.
- Provide at least one image without text or graphic overlays for every supplied ratio.
- Treat headlines, long headlines, descriptions, business name, CTA, and URL as separate PMax assets.
- Use official square and landscape logos; do not bake a logo into every PMax scene.

Platform acceptance does not guarantee good design. Review cropping, contrast, product prominence, and asset combinations.

## Wide-banner image expansion

Do not solve a portrait-to-landscape transition by cropping the product or shrinking it into an unintentional composition.

1. Compare source and target aspect ratios.
2. Test the crop against the face, hands, garment, product silhouette, and required copy space.
3. If any critical area is lost or crowded, use image generation to extend the left and right sides.
4. Preserve the approved center: identical subject, product details, identity, pose, lighting, perspective, and color.
5. Generate only the missing environment. Do not generate text, logos, CTAs, borders, or prices into the bitmap.
6. Inspect seams, repeated textures, anatomy, and product truth before layout.
7. Place the wide-safe image at the target ratio without distortion.

## Final collision review

At actual export size, check these pairs separately:

1. Logo against top and side decoration.
2. Callout text against bracket endpoints and image focal features.
3. Product title, price, and legal copy against lower corner curves.
4. CTA against the right stroke, bottom stroke, and rounded corner.

Reject exact tangencies even when nodes do not technically overlap. A gap must be visually obvious at export size. Run this review after the last layout adjustment and capture a fresh screenshot.

Also reject content collisions with other content: text-on-text, callout-on-face, CTA-on-price, logo-on-callout, and any accidental edge contact. Check the actual exported pixels after the final edit; a clean node tree alone is not proof of a clean layout.

For cloned logos and SVG assets, pin constraints explicitly and verify their coordinates again in a separate read. A successful write response is not sufficient because inherited center or scale constraints can reposition the asset when Figma resolves the frame.
