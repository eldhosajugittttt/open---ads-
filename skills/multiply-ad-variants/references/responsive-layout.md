# Responsive layout

Do not scale the entire master proportionally.

## House canvas presets

| Ratio | Default pixels |
| --- | --- |
| 9:16 | 1080 × 1920 |
| 4:5 | 1080 × 1350 |
| 1:1 | 1080 × 1080 |
| 1.91:1 | 1200 × 628; alternate 1080 × 566 |
| 16:9 | 1920 × 1080 |
| 3:4 | 1080 × 1440 |
| 2:3 | 1080 × 1620 |
| 3:2 | 1620 × 1080 |
| 5:4 | 1350 × 1080 |
| 21:9 | 2520 × 1080 |
| 2:1 | 2160 × 1080 |

Use explicit approved dimensions when supplied. Otherwise, named platform dimensions override these general presets; use the table as the default for ratio-only Figma resizing.

- Square: balance product and copy; use a centered or diagonal relationship.
- Feed portrait: use vertical hierarchy; give the product more area than copy.
- Story/Reel: keep the hero visual, callouts, and essential text inside the registered 9:16 critical-content zone. Default to no embedded logo, price, offer, or CTA.
- Landscape: use side-by-side zones and shorter copy. When a crop would cut or weaken the subject, generate a side-expanded wide-safe image instead.
- PMax: produce clean responsive visual assets; Google supplies text separately and may crop or combine assets.

For each target:

1. Create the exact canvas.
2. Draw the safe zone.
3. Divide it into intentional image, copy, branding, CTA, and legal zones before placing content.
4. Position the focal product first and set an explicit crop focal point.
5. Place the approved logo at its correct aspect ratio, clear space, and minimum size.
6. Place editable copy by hierarchy. Preserve type roles and relative emphasis, not identical font sizes.
7. Wrap text before shrinking it; if hierarchy still fails, change the zone proportions or use an approved shorter line.
8. Align related content to shared anchors and maintain a consistent spacing rhythm.
9. Check edge risk, overlap, contrast, and legibility at 100%.
10. Compare against the master for brand continuity, not identical coordinates.
11. Reject all overlaps, tangencies, clipped text, inconsistent gutters, and content-to-decoration collisions after the last edit.

For a 1080×1920 Meta Story/Reel, use `x=64`, `y=128`, `width=952`, `height=1200` as the critical-content zone. Background and nonessential decoration may extend outside. Keep the guide hidden for export.

For wide banners, preserve the approved subject and product truth. Extend only the missing left/right environment; do not stretch the source, invent new garment details, or bake text and controls into the generated image.

Do not create superficial variants that change only a background color. Useful variation changes hook, product, crop, scene, or composition while retaining campaign coherence.
