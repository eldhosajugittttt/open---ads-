import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { loadSpecs, planVariants, readJson, validateCampaign } from "../scripts/open-ads.mjs";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(testDir, "..");
const sample = readJson(path.join(root, "sample-data/saree-campaign.json"));
const specs = loadSpecs(path.join(root, "config/platform-specs.json"));

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
