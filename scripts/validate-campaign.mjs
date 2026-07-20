#!/usr/bin/env node
import path from "node:path";
import { readJson, validateCampaign } from "./open-ads.mjs";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/validate-campaign.mjs <campaign.json>");
  process.exit(2);
}

try {
  const campaign = readJson(path.resolve(input));
  const result = validateCampaign(campaign);
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.valid ? 0 : 1);
} catch (error) {
  console.error(`Unable to validate campaign: ${error.message}`);
  process.exit(2);
}
