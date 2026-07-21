# Product truth

Preserve the supplied product's type, exact color, material, texture, silhouette, fit, seams, border, embroidery, pattern, buttons, closures, labels, packaging, and logo placement.

Treat any logo attached to the product as product truth: preserve its exact lettering or mark, orientation, scale, color, and physical placement. If image generation mutates it, composite the real approved product or logo region instead of accepting an approximate mark. Keep standalone campaign logos out of generated imagery and add the official asset later in Figma.

For apparel, do not add an outer layer or accessory that changes the advertised product. For sarees, protect the border, pallu, motif placement, weave appearance, and color relationships.

Use safe compositing when exact truth matters:

```text
real approved product layer
+ generated environment/background
+ editable Figma copy and branding
```

Use full reference-guided generation only when a model must wear or hold the product and the client accepts review risk.

Prompt for extra background around subjects, full visibility of important anatomy and product parts, and no text, logo, watermark, border, badge, or promotional graphic. Reject outputs with invented details even when the image is visually attractive.
