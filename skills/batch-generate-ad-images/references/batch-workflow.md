# Batch workflow

## Input contract

Capture these fields before generation when the brief provides them:

```text
campaign_id
product_name
product_truth_reference
style_references
audience
brand_mood
master_ratio
concept_count
copy_safe_area
must_preserve
must_avoid
output_directory
```

Do not block a useful first batch when optional fields are missing. Default to four textless concepts at one master ratio and mark assumptions in the manifest.

## Concept matrix

Keep product truth, audience, ratio, palette, and campaign tone fixed. Vary only meaningful creative axes.

| Concept | Environment | Camera | Lighting | Subject action |
| --- | --- | --- | --- | --- |
| C01 | Minimal architecture | Full body | Soft daylight | Standing |
| C02 | Premium interior | Three-quarter | Window light | Walking |
| C03 | Urban exterior | Medium-wide | Golden hour | Turning |
| C04 | Graphic studio | Product-led close shot | Directional | Static hero |

Do not change every axis randomly. The batch must be diverse enough to compare while remaining one campaign family.

## Prompt template

```text
Use case: ads-marketing
Asset type: campaign master image, concept <ID> of <COUNT>
Primary request: <concept-specific direction>
Input images: Image 1 is the product-truth reference; Image 2 is a style reference
Scene/backdrop: <environment>
Subject: <product/model/action>
Style/medium: photorealistic advertising photography
Composition/framing: <ratio, camera, subject position, negative space>
Lighting/mood: <lighting and campaign mood>
Constraints: preserve <product and identity invariants>; image only; no text, logo, CTA, price, border, or watermark
Avoid: product drift, duplicated anatomy, illegible pseudo-text, repeated composition, crop risk
```

## Naming

Use deterministic names:

```text
<CAMPAIGN>_<CONCEPT-ID>_<RATIO>_DRAFT-V01.png
<CAMPAIGN>_<CONCEPT-ID>_<RATIO>_FINAL-V01.png
```

## Manifest

Return one record per requested output:

```json
{
  "campaign_id": "SUMMER-01",
  "concept_id": "C01",
  "concept_name": "Minimal Architecture",
  "ratio": "4:5",
  "source_references": ["product-front.png"],
  "prompt_summary": "Full-body product-led daylight scene",
  "saved_path": "generated/SUMMER-01_C01_4X5_DRAFT-V01.png",
  "review_status": "accepted",
  "rejection_reason": null
}
```

## Review

Compare the whole batch for diversity, then inspect each output for product truth. Reject a visually attractive image when it changes the advertised product. Keep accepted files even when another concept fails.
