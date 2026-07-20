# Open Ads Operating Rules

- Treat approved product images, brand assets, copy, prices, offers, claims, and legal text as immutable source data.
- Never invent a price, discount, product property, certification, deadline, URL, or legal claim.
- Keep generated imagery free of text, logos, prices, buttons, borders, and watermarks unless a user explicitly approves a flattened export-only treatment.
- Preserve editable text and vector layers in the ad IR and Figma output.
- Do not redraw an exact product when truthful color, border, embroidery, fabric, packaging, or logo placement matters. Prefer compositing the real product image into a generated scene.
- Flag uncertain OCR, font matches, inpainting, logo extraction, product fidelity, or legal readability for designer review.
- Use platform rules from `config/platform-specs.json`; do not rely on memory when a rule exists there.
- Use `config/canvas-presets.json` for default Figma canvas dimensions. Explicit campaign dimensions win first; named platform requirements win second; house canvas presets are the fallback.
- Recompose layouts for each ratio. Do not stretch a finished ad or apply one blind crop to every placement.
- Protect safe zones, focal subjects, faces, hands, products, logos, CTA content, and legal copy.
- Keep Meta and Google variants separate when their asset behavior differs.
- Run `npm test` and `npm run validate:sample` after changing schemas, platform rules, planner logic, or validation logic.
- Do not publish, upload, or overwrite approved campaign assets without explicit authorization.
