import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const defaultSpecsPath = path.resolve(moduleDir, "../config/platform-specs.json");

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function loadSpecs(filePath = defaultSpecsPath) {
  return readJson(filePath);
}

function issue(level, code, message, pathName = "$") {
  return { level, code, path: pathName, message };
}

function countCharacters(value) {
  return [...String(value ?? "")].length;
}

function validatePmaxCopy(campaign, limits, issues) {
  const copy = campaign.pmax_copy;
  if (!copy) {
    issues.push(issue("error", "PMAX_COPY_MISSING", "Google PMax targets require pmax_copy.", "$.pmax_copy"));
    return;
  }

  const checks = [
    ["headlines", limits.headlines_min, limits.headlines_max, limits.headline_max_chars],
    ["long_headlines", limits.long_headlines_min, limits.long_headlines_max, limits.long_headline_max_chars],
    ["descriptions", limits.descriptions_min, limits.descriptions_max, limits.description_max_chars]
  ];

  for (const [field, minimum, maximum, characterLimit] of checks) {
    const values = Array.isArray(copy[field]) ? copy[field] : [];
    if (values.length < minimum || values.length > maximum) {
      issues.push(issue("error", "PMAX_COPY_COUNT", `${field} must contain ${minimum}-${maximum} values; found ${values.length}.`, `$.pmax_copy.${field}`));
    }
    values.forEach((value, index) => {
      if (countCharacters(value) > characterLimit) {
        issues.push(issue("error", "PMAX_COPY_LENGTH", `${field}[${index}] exceeds ${characterLimit} characters.`, `$.pmax_copy.${field}[${index}]`));
      }
    });
  }

  if (!copy.headlines?.some((value) => countCharacters(value) <= limits.short_headline_required_max_chars)) {
    issues.push(issue("error", "PMAX_SHORT_HEADLINE", `At least one headline must be ${limits.short_headline_required_max_chars} characters or fewer.`, "$.pmax_copy.headlines"));
  }

  if (countCharacters(copy.business_name) > limits.business_name_max_chars) {
    issues.push(issue("error", "PMAX_BUSINESS_NAME", `business_name exceeds ${limits.business_name_max_chars} characters.`, "$.pmax_copy.business_name"));
  }
}

export function validateCampaign(campaign, specs = loadSpecs()) {
  const issues = [];
  const required = ["campaign_id", "client", "concept", "approvals", "targets"];
  for (const field of required) {
    if (campaign[field] === undefined || campaign[field] === null || campaign[field] === "") {
      issues.push(issue("error", "REQUIRED_FIELD", `${field} is required.`, `$.${field}`));
    }
  }

  if (!Array.isArray(campaign.targets) || campaign.targets.length === 0) {
    issues.push(issue("error", "TARGETS_EMPTY", "At least one target placement is required.", "$.targets"));
  } else {
    const seen = new Set();
    campaign.targets.forEach((target, index) => {
      if (!specs.placements[target]) {
        issues.push(issue("error", "UNKNOWN_TARGET", `Unsupported target: ${target}.`, `$.targets[${index}]`));
      }
      if (seen.has(target)) {
        issues.push(issue("error", "DUPLICATE_TARGET", `Target is duplicated: ${target}.`, `$.targets[${index}]`));
      }
      seen.add(target);
    });
  }

  const concept = campaign.concept ?? {};
  for (const field of ["name", "headline", "cta", "product_asset"]) {
    if (!concept[field]) {
      issues.push(issue("error", "CONCEPT_FIELD", `concept.${field} is required.`, `$.concept.${field}`));
    }
  }

  const approvals = campaign.approvals ?? {};
  for (const field of ["concept", "product_truth"]) {
    if (approvals[field] !== "approved") {
      issues.push(issue("error", "APPROVAL_REQUIRED", `${field} must be approved before generation.`, `$.approvals.${field}`));
    }
  }
  if ((concept.offer || concept.price) && approvals.offer !== "approved") {
    issues.push(issue("error", "OFFER_UNAPPROVED", "Offer or price content exists but offer approval is not approved.", "$.approvals.offer"));
  }
  if (concept.legal_copy && approvals.legal !== "approved") {
    issues.push(issue("error", "LEGAL_UNAPPROVED", "Legal copy exists but legal approval is not approved.", "$.approvals.legal"));
  }
  if (concept.generated_product_scene && approvals.product_truth !== "approved") {
    issues.push(issue("error", "PRODUCT_SCENE_UNREVIEWED", "Generated product scenes require approved product-truth review.", "$.approvals.product_truth"));
  }
  if (approvals.publishing === "approved") {
    issues.push(issue("warning", "PUBLISHING_OUT_OF_SCOPE", "Publishing approval is recorded, but Open Ads does not publish campaigns.", "$.approvals.publishing"));
  }

  const hasPmaxTarget = campaign.targets?.some((target) => target.startsWith("google-pmax-"));
  if (hasPmaxTarget) {
    validatePmaxCopy(campaign, specs.copy_limits["google-pmax"], issues);
  }

  const pmaxTargets = new Set(campaign.targets?.filter((target) => target.startsWith("google-pmax-")) ?? []);
  if (pmaxTargets.size > 0) {
    for (const recommended of ["google-pmax-landscape", "google-pmax-square", "google-pmax-portrait"]) {
      if (!pmaxTargets.has(recommended)) {
        issues.push(issue("warning", "PMAX_COVERAGE", `Add ${recommended} for stronger PMax aspect-ratio coverage.`, "$.targets"));
      }
    }
  }

  return {
    valid: !issues.some((item) => item.level === "error"),
    errors: issues.filter((item) => item.level === "error"),
    warnings: issues.filter((item) => item.level === "warning")
  };
}

function slug(value) {
  return String(value)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function layoutStrategy(spec) {
  if (spec.platform === "google" && spec.asset_type === "logo") {
    return {
      mode: "logo-only",
      text_in_image: false,
      image_fit: "contain",
      rules: ["Use the official logo asset.", "Center the logo inside the safe area.", "Do not add offer, CTA, or decorative copy."]
    };
  }
  if (spec.platform === "google") {
    return {
      mode: "responsive-asset",
      text_in_image: false,
      image_fit: "cover-with-protected-focal-point",
      rules: ["Create an overlay-free master for this ratio.", "Keep critical product content inside the center 80%.", "Supply headlines and descriptions as PMax text assets, not baked into the image."]
    };
  }
  if (spec.surface === "stories" || spec.surface === "reels") {
    return {
      mode: "full-screen-vertical",
      text_in_image: true,
      image_fit: "cover-with-protected-focal-point",
      rules: ["Recompose vertically; do not stretch the feed design.", "Keep logo, headline, offer, and product away from interface overlays.", "Reserve the lower region for the platform CTA."]
    };
  }
  return {
    mode: "mobile-feed",
    text_in_image: true,
    image_fit: "cover-with-protected-focal-point",
    rules: ["Keep one clear focal point.", "Use short editable on-image copy.", "Wrap text before reducing it below the approved minimum size."]
  };
}

export function planVariants(campaign, specs = loadSpecs()) {
  const validation = validateCampaign(campaign, specs);
  if (!validation.valid) {
    const error = new Error("Campaign validation failed.");
    error.validation = validation;
    throw error;
  }

  const variants = campaign.targets.map((target, index) => {
    const spec = specs.placements[target];
    const insetX = Math.round(spec.width * (spec.safe_inset_percent / 100));
    const insetY = Math.round(spec.height * (spec.safe_inset_percent / 100));
    return {
      id: `${campaign.campaign_id}-${String(index + 1).padStart(2, "0")}`,
      target,
      platform: spec.platform,
      surface: spec.surface,
      canvas: { width: spec.width, height: spec.height, ratio: spec.ratio },
      safe_zone: {
        x: insetX,
        y: insetY,
        width: spec.width - insetX * 2,
        height: spec.height - insetY * 2
      },
      layout: layoutStrategy(spec),
      semantic_layers: spec.asset_type === "logo"
        ? ["LOGO"]
        : spec.platform === "google"
          ? ["BACKGROUND", "PRODUCT_IMAGE"]
          : ["BACKGROUND", "PRODUCT_IMAGE", "LOGO", "HEADLINE", "SUBHEADLINE", "OFFER", "CTA", "LEGAL"],
      export_name: `${slug(campaign.client)}_${slug(campaign.campaign_id)}_${slug(target)}_${slug(campaign.locale ?? "und")}_V01.png`,
      review_required: true
    };
  });

  return {
    schema_version: "1.0.0",
    generated_from: campaign.campaign_id,
    platform_specs_verified_at: specs.verified_at,
    warnings: validation.warnings,
    variants
  };
}
