---
name: audit-ad-creative
description: Audit structured ad campaigns, Figma frames, flattened previews, platform variants, and export manifests for product truth, editable layers, dimensions, safe zones, text overflow, font mismatch, missing assets, approvals, PMax limits, and visual quality. Use before export, handoff, or publishing.
---

# Audit Ad Creative

Fail unsafe work clearly and keep subjective observations separate from mechanical errors.

## Workflow

1. Read `references/qa-checklist.md`.
2. Run `node scripts/validate-campaign.mjs <campaign.json>` when using the repository.
3. Confirm exact dimensions, ratios, filenames, export settings, and required placements.
4. Inspect semantic layers for missing or flattened text, logos, product imagery, CTA, offer, and legal content.
5. Check product truth against the approved source at high zoom.
6. Check crop, safe zone, hierarchy, contrast, wrapping, minimum type, and actual-size readability.
7. Compare reconstructed or resized frames with their master/reference.
8. Classify findings as `blocker`, `needs-review`, or `suggestion`.
9. Do not auto-fix uncertain brand, legal, product, or offer issues.

## Output

Return a compact table with frame, severity, issue, evidence, and recommended action. End with a clear pass/fail decision and the approvals still required.
