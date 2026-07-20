# Architecture

Open Ads separates judgment from mechanics.

```text
Brief or flattened ad
        |
        v
Campaign record ----> approvals and product truth
        |
        +----> reconstruction analysis ----> editable ad IR
        |
        +----> product-image generation ----> reviewed textless imagery
        |
        v
Master composition
        |
        v
Platform variant planner ----> Meta / Instagram / Google PMax plans
        |
        v
Figma importer (next milestone) ----> native editable frames
        |
        v
Creative QA ----> designer review ----> export
```

## Contracts

- `campaign.schema.json` is the source-of-truth campaign record.
- `ad-ir.schema.json` is the handoff between reconstruction/composition and Figma.
- `platform-specs.json` is the versioned placement registry.

## Why an intermediate representation

A flattened image contains appearance but not structure. Open Ads first reconstructs semantic roles such as `PRODUCT_IMAGE`, `HEADLINE`, `LOGO`, and `CTA`. The IR preserves geometry, hierarchy, confidence, editability, and asset references without tying the reasoning layer to Figma API calls.

## Human approval gates

1. Product and logo truth
2. OCR and font match
3. Offer, price, claim, and legal approval
4. Generated-image fidelity
5. Crop and layout quality per placement
6. Final publishing authorization
