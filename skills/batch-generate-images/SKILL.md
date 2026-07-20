---
name: batch-generate-images
description: Turn one brief or workflow into a controlled batch of distinct raster image assets. Use when the user asks for batch image generation, multiple images at once, variations, photos, illustrations, concept art, backgrounds, textures, sprites, mockups, thumbnails, presentation visuals, social assets, advertising imagery, transparent cutouts, or other bitmap deliverables.
---

# Batch Generate Images

Accept one request, expand it into a deliberate prompt matrix, and return a reviewed set of distinct raster assets.

## Workflow

1. Load the standard `imagegen` skill and read `references/batch-workflow.md`.
2. Identify the job ID, asset type, intended use, count, ratios, references, shared style, required differences, must-preserve details, and prohibited content.
3. If count is unspecified, create four assets. Use a maximum of eight assets per wave unless the user requests a larger production plan.
4. Choose a batch mode: variations of one concept, a set of different asset roles, or a continuous sequence.
5. Freeze shared invariants before varying anything: subject identity, art direction, palette, product truth, character continuity, dimensions, or transparency requirements as applicable.
6. Create one named prompt per output. Change only the axes that make sense for the requested asset type, such as subject, environment, viewpoint, lighting, material, pose, composition, mood, or narrative beat.
7. Use the built-in image-generation path by default. Issue one image-generation call per distinct asset and run up to four independent calls concurrently when the tool surface supports it. Do not use `n` as a substitute for distinct prompts.
8. Inspect local image inputs with `view_image` before generation or editing. Label every input as edit target, identity reference, product truth, style reference, or supporting insert.
9. Save every requested deliverable in the workspace with deterministic filenames. Do not leave project assets only in the default generated-images directory.
10. Inspect every output against the brief and asset-specific failure risks. Reject duplicate, corrupted, inconsistent, or unusable outputs individually while preserving successful results.
11. Return a manifest containing asset ID, role, prompt summary, ratio, source references, saved path, review status, and rejection reason where applicable.

## Batch rules

- Make outputs meaningfully different when the request asks for concepts or options.
- Keep outputs visually coherent when the request asks for a matching set or sequence.
- Preserve exact identities, products, characters, objects, palettes, and styles only when the brief marks them as invariants.
- Avoid generated text, logos, and watermarks unless they are explicitly required. Validate exact text carefully when it is part of the requested visual.
- Generate one master per concept and adapt it when several placements need the same scene. Do not regenerate an identical scene for every size.
- Use the first wave for exploration. Refine or regenerate only selected winners after review.
- Route deterministic SVG, editable vector, diagram, UI, or code-native asset requests to the appropriate non-raster workflow instead of forcing image generation.
- If the user explicitly requests CLI or API batch generation, follow the standard imagegen CLI `generate-batch` workflow. Do not switch to CLI merely because the word `batch` was used.

## Completion gate

Approve the batch only when:

- every requested asset has a saved file or documented failure;
- each accepted output fulfils its assigned role;
- required consistency and required diversity both pass review;
- filenames and manifest records are unique;
- image dimensions and composition suit the intended use;
- the user can compare or use the batch without reopening the generation process.
