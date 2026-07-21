import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { loadSpecs, planVariants, readJson, validateCampaign } from "../scripts/open-ads.mjs";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(testDir, "..");
const sample = readJson(path.join(root, "sample-data/saree-campaign.json"));
const specs = loadSpecs(path.join(root, "config/platform-specs.json"));
const canvasPresets = readJson(path.join(root, "config/canvas-presets.json"));
const skillRouter = readJson(path.join(root, "config/skill-router.json"));

test("skill router maps every worker skill without encouraging over-reading", () => {
  const routedNames = skillRouter.skills.map((item) => item.name);
  const expectedNames = [
    "audit-ad-creative",
    "batch-generate-images",
    "compose-platform-ads",
    "crop-creative-images",
    "direct-brand-typography",
    "expand-banner-images",
    "generate-product-imagery",
    "ingest-product-assets",
    "multiply-ad-variants",
    "plan-ad-campaign",
    "reconstruct-flat-ad"
  ];
  assert.deepEqual([...routedNames].sort(), expectedNames);
  assert.equal(new Set(routedNames).size, routedNames.length);
  assert.ok(routedNames.every((name) => fs.existsSync(path.join(root, "skills", name, "SKILL.md"))));
  assert.equal(skillRouter.policy.default_primary_skills, 1);
  assert.ok(skillRouter.policy.default_max_worker_skills <= 2);
  assert.ok(skillRouter.policy.compound_phase_max_worker_skills <= 3);
  assert.equal(skillRouter.policy.load_skill_bodies_only_after_selection, true);
});

test("house canvas presets retain approved Figma dimensions", () => {
  const actual = Object.fromEntries(
    Object.values(canvasPresets.presets).map((preset) => [preset.ratio, [preset.width, preset.height]])
  );
  assert.deepEqual(actual, {
    "9:16": [1080, 1920],
    "4:5": [1080, 1350],
    "1:1": [1080, 1080],
    "1.91:1": [1200, 628],
    "16:9": [1920, 1080],
    "3:4": [1080, 1440],
    "2:3": [1080, 1620],
    "3:2": [1620, 1080],
    "5:4": [1350, 1080],
    "21:9": [2520, 1080],
    "2:1": [2160, 1080]
  });
  assert.deepEqual(
    canvasPresets.presets["landscape-link-1_91x1"].alternate_dimensions,
    [{width: 1080, height: 566}]
  );
});

test("sample campaign validates", () => {
  const result = validateCampaign(sample, specs);
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("planner returns every requested target with safe zones", () => {
  const result = planVariants(sample, specs);
  assert.equal(result.variants.length, sample.targets.length);
  assert.equal(new Set(result.variants.map((item) => item.export_name)).size, sample.targets.length);
  assert.ok(result.variants.every((item) => item.safe_zone.width < item.canvas.width));
});

test("PMax images keep text outside the image asset", () => {
  const result = planVariants(sample, specs);
  const pmaxImages = result.variants.filter((item) => item.platform === "google" && item.layout.mode === "responsive-asset");
  assert.ok(pmaxImages.length >= 3);
  assert.ok(pmaxImages.every((item) => item.layout.text_in_image === false));
});

test("unapproved offer fails validation", () => {
  const invalid = structuredClone(sample);
  invalid.approvals.offer = "pending";
  const result = validateCampaign(invalid, specs);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((item) => item.code === "OFFER_UNAPPROVED"));
});

test("too-long PMax headline fails validation", () => {
  const invalid = structuredClone(sample);
  invalid.pmax_copy.headlines[0] = "This headline is intentionally much longer than thirty characters";
  const result = validateCampaign(invalid, specs);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((item) => item.code === "PMAX_COPY_LENGTH"));
});
