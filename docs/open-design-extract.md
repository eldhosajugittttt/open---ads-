# Open Design extraction

Reviewed upstream: `nexu-io/open-design` at commit `9fcda743b7f782030ed7e65b67e63d5a2a6aee1e`.

## Reused foundation

| Open Design idea | Open Ads use |
|---|---|
| Structured Figma IR | `schemas/ad-ir.schema.json` and the future Figma importer contract |
| Staged design migration | analyze, normalize, build, verify workflow in `$reconstruct-flat-ad` |
| Token mapping | colors, typography, spacing, and radii become reusable IR tokens |
| E-commerce image workflow | product truth, reference-only art direction, and textless generation rules |
| Brand extraction | separate observed brand evidence from inferred design decisions |
| Visual-diff thinking | planned screenshot comparison and explicit QA tolerances |

## Deliberately excluded

- The desktop app, local server, and broad plugin catalog
- Stub skills whose implementation lives elsewhere
- Web-cloning workflows unrelated to advertising
- Absolute-position-only Figma importer code as a final architecture
- Provider-specific image APIs in the core schema

## Limitations inherited from the useful prototype

The upstream importer is a proof of concept: it emphasizes absolute geometry, supports a small node set, rasterizes SVG, falls back when fonts are unavailable, and does not create Auto Layout, components, variables, or responsive constraints. Open Ads keeps the IR idea but requires the future importer to add these native Figma behaviors.

## License

Open Design is Apache-2.0. Open Ads is also Apache-2.0 and preserves attribution in `NOTICE`. No MIT-licensed visual-diff source was copied into this repository; only the general verification pattern was retained.
