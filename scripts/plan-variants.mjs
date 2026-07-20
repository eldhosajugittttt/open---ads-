#!/usr/bin/env node
import path from "node:path";
import { planVariants, readJson } from "./open-ads.mjs";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/plan-variants.mjs <campaign.json>");
  process.exit(2);
}

try {
  const campaign = readJson(path.resolve(input));
  console.log(JSON.stringify(planVariants(campaign), null, 2));
} catch (error) {
  if (error.validation) {
    console.error(JSON.stringify(error.validation, null, 2));
    process.exit(1);
  }
  console.error(`Unable to plan variants: ${error.message}`);
  process.exit(2);
}
