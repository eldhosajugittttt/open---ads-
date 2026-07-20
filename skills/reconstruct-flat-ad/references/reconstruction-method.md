# Reconstruction method

## Text and font matching

Use OCR plus visual evidence. Compare serif shape, stroke contrast, terminal form, aperture, numeral form, x-height, width, slant, weight, letter spacing, and line height. Return up to three candidates with evidence. Mark a font as `exact` only when its source is known; otherwise use `available-substitute` or `inferred`.

Measure typography from the rendered bounds but preserve editable text behavior. Expect a substitute font to change wrapping and spacing; re-fit the layout without silently shrinking below an approved minimum.

## Text removal

Create a mask slightly beyond antialiased glyph edges. Inpaint each coherent region separately. Use surrounding structure, a clean product photo, or another campaign crop when available. Never claim exact recovery where text covered garment details, faces, hands, packaging, or complex patterns.

## Asset separation

- Use original product or model photography when supplied.
- Prefer official transparent logos or SVG assets.
- Extract simple decorations as native vectors when geometry is clear.
- Keep complex photographic decorations as transparent raster assets.
- Record asset provenance and whether pixels were observed, segmented, or generated.

## Suggested confidence bands

- `0.90-1.00`: directly supplied or clearly observed
- `0.70-0.89`: strong match requiring quick review
- `0.40-0.69`: plausible reconstruction requiring designer correction
- below `0.40`: placeholder or unresolved; do not auto-approve
