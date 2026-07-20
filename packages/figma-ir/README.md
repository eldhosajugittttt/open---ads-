# Figma ad IR

This package currently defines the handoff contract rather than a bundled plugin. The canonical schema is `../../schemas/ad-ir.schema.json`.

The future importer should:

- create native Figma text nodes after loading an available font;
- create image fills from approved local or remote assets;
- preserve semantic layer names and groups;
- use Auto Layout for content groups where the reconstructed relationship is clear;
- bind repeatable values to variables or styles;
- keep absolute positioning only where the artwork genuinely requires it;
- report missing fonts and assets instead of silently hiding errors;
- never detach component instances by default;
- add export settings only after the frame passes QA.

Open Design proved the usefulness of a JSON-to-Figma bridge. Open Ads keeps that boundary but expands it for advertising semantics and responsive variants.
