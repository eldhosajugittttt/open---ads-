---
name: route-open-ads-skills
description: Select the minimum Open Ads skills required for a request without loading the full skill library. Use when a task spans multiple advertising stages, the correct workflow is unclear, or an agent must map a brief to planning, product ingestion, reconstruction, branding, imagery, cropping, banner expansion, composition, resizing, batch generation, or QA skills. Do not use recursively after the required worker skills are already explicit.
---

# Route Open Ads Skills

Choose first; load later.

## Workflow

1. Read `config/skill-router.json`. Do not open every `SKILL.md` to discover capabilities.
2. Respect any skill the user explicitly names.
3. Match the request to task signals and select the smallest worker set that can complete the current phase.
4. Default to one primary worker skill. Add one supporting skill only when it provides a distinct required capability.
5. Allow three workers only for a genuinely compound current phase. Do not preload skills for later phases.
6. Load the selected worker `SKILL.md` files, then only the references they explicitly require.
7. Re-route at a phase boundary instead of carrying every previous skill forward.

## Routing rules

- Treat `AGENTS.md` as always-on shared safety, not as a worker skill.
- Prefer a specific skill over a broad neighboring skill.
- Do not load image generation for deterministic Figma layout work.
- Do not load cropping when the source already fits safely.
- Do not load banner expansion until crop or recompose has demonstrably failed.
- Do not load brand typography when approved brand rules already answer the question.
- Do not load batch generation for one image.
- Load QA at the delivery/review phase, not throughout every creative action.

Return the selected skills, one-line reasons, execution order, and deliberately skipped adjacent skills.
