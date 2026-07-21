# Side expansion

## Protected invariants

- original central pixels and crop position;
- subject identity, anatomy, expression, and pose;
- product color, silhouette, construction, material, pattern, labels, and logos;
- camera height, lens feel, perspective, depth of field, light direction, and grain;
- approved visual hierarchy and intended negative-space side.

## Prompt pattern

```text
Use case: precise-object-edit
Asset type: wide-safe advertising image
Primary request: extend only the missing left and right environment to the target ratio
Input image: approved source; edit target and immutable product-truth region
Constraints: preserve the entire original center unchanged; continue its environment, perspective, lighting, palette, texture, and depth naturally
Avoid: changed subject, new people, new product details, duplicated objects, mirrored patterns, text, logos, CTA, badges, borders, watermark, visible seams
```

Prefer generous quiet background on the side assigned to editable Figma copy. Do not generate an identical scene separately for every wide size; create one sufficiently wide master and derive safe crops when possible.
