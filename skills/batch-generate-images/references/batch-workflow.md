# Batch workflow

## Input contract

Capture these fields when the brief provides them:

```text
job_id
asset_type
intended_use
batch_mode
asset_count
asset_roles
ratios
edit_targets
identity_or_product_references
style_references
shared_art_direction
must_preserve
must_vary
must_avoid
output_directory
```

Do not block a useful first batch when optional fields are missing. Default to four assets, one suitable master ratio, and explicit assumptions in the manifest.

## Batch modes

### Variations

Generate alternative interpretations of one idea. Keep the core subject and use case fixed while varying a small number of creative axes.

### Asset set

Generate different visual roles from one workflow, such as a hero image, background, texture, thumbnail, supporting illustration, and social crop. Give every output a separate role-specific prompt.

### Sequence

Generate connected scenes or frames. Preserve character, object, palette, world, and camera rules across the sequence while changing only the requested narrative beat.

## Variation matrix

Choose axes that match the asset type:

| Asset type | Useful axes |
| --- | --- |
| Photography | Environment, lens, viewpoint, lighting, action |
| Illustration | Composition, medium, palette, character action |
| Texture/background | Material, scale, density, lighting, repeat behavior |
| Mockup | Object angle, setting, surface, shadow, camera distance |
| Thumbnail/social visual | Focal subject, hierarchy, crop, negative space, energy |
| Story sequence | Narrative beat, gesture, framing, camera movement |

Do not change every axis randomly. Hold the necessary invariants while creating useful diversity.

## Prompt template

```text
Use case: <imagegen taxonomy slug>
Asset type: <role>, asset <ID> of <COUNT>
Primary request: <asset-specific direction>
Input images: <label each image and its role>
Scene/backdrop: <environment or surface>
Subject: <main subject>
Style/medium: <photo, illustration, 3D, texture, mockup, etc.>
Composition/framing: <ratio, viewpoint, placement, negative space>
Lighting/mood: <lighting and mood>
Constraints: preserve <shared invariants>; fulfil <asset role>
Avoid: <asset-specific failures, unwanted text, logos, watermarks>
```

## Naming

Use deterministic names:

```text
<JOB>_<ASSET-ID>_<ROLE>_<RATIO>_DRAFT-V01.png
<JOB>_<ASSET-ID>_<ROLE>_<RATIO>_FINAL-V01.png
```

## Manifest

Return one record per requested asset:

```json
{
  "job_id": "PROJECT-01",
  "asset_id": "A01",
  "role": "hero-background",
  "ratio": "16:9",
  "source_references": ["reference-01.png"],
  "prompt_summary": "Wide atmospheric hero with left copy space",
  "saved_path": "generated/PROJECT-01_A01_HERO_16X9_DRAFT-V01.png",
  "review_status": "accepted",
  "rejection_reason": null
}
```

## Review

Review the batch twice: first as a set for diversity or continuity, then one asset at a time for subject accuracy, anatomy, artifacts, text errors, crop risk, dimensions, and suitability for its role. Keep accepted assets when another output fails.
