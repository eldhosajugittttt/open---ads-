# Practical integration order

## 1. Structured campaign data

Use the campaign schema, sample data, planner, and validator first. This removes ambiguity before any AI image or Figma work.

## 2. Master ad reconstruction

Implement screenshot analysis, OCR, layer-role detection, font candidates, and an uncertainty report. Keep inpainting and asset separation as explicit jobs, not invisible side effects.

## 3. Figma IR importer

Build a small Figma plugin that accepts `ad-ir.json` and creates native frames, text, image fills, vectors, groups, variables, and Auto Layout where appropriate. Never detach existing instances by default.

## 4. Responsive layout engine

Use `platform-specs.json` and the variant plan to recompose semantic roles for each placement. Protect subject focal points and safe zones; do not scale the entire frame uniformly.

## 5. Product ingestion and imagery

Add authenticated Shopify Storefront API ingestion, local caching, asset provenance, and image generation. Keep exact product images protected and require review before a generated scene becomes approved.

## 6. Visual QA

Render each generated Figma frame, compare it with its reference or master, then run semantic checks for overflow, missing layers, crop loss, low contrast, wrong dimensions, and duplicate names.

## 7. Export packaging

Only after the earlier stages are stable, automate export settings, filenames, manifests, folders, and delivery. Keep publishing outside the automation until separately authorized.
