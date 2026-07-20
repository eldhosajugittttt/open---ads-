---
name: batch-generate-ad-images
description: Turn one approved campaign brief or image prompt into a controlled batch of distinct advertising image concepts. Use when the user asks for batch image generation, multiple concepts at once, several campaign images, creative variations, product lifestyle options, mood explorations, or parallel image generation for fashion, retail, Meta, Instagram, banners, or Google ads.
---

# Batch Generate Ad Images

Accept one brief, expand it into a deliberate prompt matrix, and return a reviewed set of distinct image assets.

## Workflow

1. Load the standard `imagegen` skill and read `references/batch-workflow.md`.
2. Identify the campaign ID, product-truth reference, output count, master ratio, audience, brand mood, required negative space, and prohibited content.
3. If count is unspecified, create four concepts in one batch. Use a maximum of eight concepts per wave unless the user requests a larger production plan.
4. Freeze all invariants before varying anything: product details, identity, brand palette, ratio, copy-safe space, and `no text/logo/CTA/watermark` rules.
5. Create a prompt matrix with one named concept per output. Change only one or two meaningful axes per concept, such as environment, camera distance, lighting, model action, or composition.
6. Use the built-in image-generation path by default. Issue one image-generation call per distinct concept and run up to four independent calls concurrently when the tool surface supports it. Do not use `n` as a substitute for distinct prompts.
7. Treat a local input image as visible context only after inspecting it with `view_image`. Label every input as product truth, edit target, style reference, or supporting insert.
8. Save every requested deliverable in the workspace with deterministic filenames. Do not leave project assets only in the default generated-images directory.
9. Inspect every output for product drift, anatomy errors, repeated concepts, text artifacts, crop risk, copy-space failure, and brand inconsistency.
10. Reject duplicates and failed outputs individually. Preserve successful outputs instead of restarting the complete batch.
11. Return a batch manifest containing concept ID, concept name, prompt summary, ratio, source references, saved path, review status, and rejection reason where applicable.

## Batch rules

- Make concepts visibly distinct, not seed-like repetitions of the same scene.
- Keep one campaign art direction across the batch so the outputs still belong together.
- Generate textless visual assets. Add typography, logos, prices, offers, CTAs, and legal copy in Figma.
- Preserve exact product color, silhouette, construction, pattern, labels, and logo placement. When exact truth is critical, protect the real product layer and generate only the environment.
- Generate one master image per concept, then crop, recompose, or outpaint it for platform ratios. Do not regenerate the same scene for every ad size.
- Use the first batch for exploration. Refine or regenerate only selected winners after review.
- If the user explicitly requests CLI or API batch generation, follow the standard imagegen CLI `generate-batch` workflow. Do not switch to CLI merely because the word `batch` was used.

## Completion gate

Approve the batch only when:

- every requested concept has a saved file or a documented failure;
- each accepted output is meaningfully different;
- product truth and human anatomy pass review;
- the composition supports the intended placement;
- filenames and manifest entries are unique;
- the user can compare the batch without reopening the generation process.
