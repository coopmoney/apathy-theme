/**
 * Build themes from ThemeDefinitions
 */

import * as bun from "bun";
import { mapVSCode } from "./integrations/vscode";
import { mapZed } from "./integrations/zed";
import type { Modifier, ThemeDefinition, TokenAssignments } from "./themes/types";
import { presets as filterPresets, type ThemeFilters } from "./filters";

// Import theme definitions
import { minted } from "./themes/minted";
import { slate } from "./themes/slate";
import { apathy } from "./themes/apathy";
import { apatheticOcean } from "./themes/apatheticOcean";
import { apathyExperimental } from "./themes/apathyExperimental";
import { TokenType } from "./types";

interface ThemeConfig {
  theme: ThemeDefinition;
  outputPath: string;
  /** Path to existing JSON for incremental migration */
  basePath?: string;
  /** Build-time filter overrides (merged with theme.filters) */
  filters?: ThemeFilters;
  /** Output path for Zed theme (optional) */
  zedOutputPath?: string;
}

const themes: ThemeConfig[] = [
  {
    theme: minted,
    outputPath: "./dist/minted.json",
    // basePath: "./themes/minted.jsonc",
    zedOutputPath: "./packages/zed/themes/minted.json",
    // Example: You can add filters here to override/add to theme.filters
    // filters: filterPresets.lowContrast,
  },
  {
    theme: slate,
    outputPath: "./dist/slate.json",
    basePath: "./themes/minted.jsonc",
    zedOutputPath: "./packages/zed/themes/slate.json",
    // No basePath = fresh build
  },
  {
    theme: apathy,
    outputPath: "./dist/apathy.json",
    zedOutputPath: "./packages/zed/themes/apathy.json",
  },
  {
    theme: apatheticOcean,
    outputPath: "./dist/apathetic-ocean.json",
    zedOutputPath: "./packages/zed/themes/apathetic-ocean.json",
  },
  {
    theme: apathyExperimental,
    outputPath: "./dist/apathy-experimental.json",
    zedOutputPath: "./packages/zed/themes/apathy-experimental.json",
  },
];

function applyModifiers(obj: Record<string, string | Modifier>): Record<string, string> {
  const defaultColor = obj.default as string;
  if (!defaultColor) {
    throw new Error("Default color is required");
  }
  const output: Record<string, string> = {
    default: defaultColor,
  };
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "function") {
      output[key] = value(defaultColor);
    } else {
      output[key] = value as string;
    }
  }
  return output;
}


/**
 * Parse CLI filter arguments
 *
 * Supports:
 *   --contrast=0.2
 *   --brightness=-0.1
 *   --saturation=0.3
 *   --hue-shift=15
 *   --preset=highContrast
 */
function parseFilterArgs(args: string[]): ThemeFilters {
  const filters: ThemeFilters = {};

  for (const arg of args) {
    if (arg.startsWith("--contrast=")) {
      filters.contrast = parseFloat(arg.split("=")[1]);
    } else if (arg.startsWith("--brightness=")) {
      filters.brightness = parseFloat(arg.split("=")[1]);
    } else if (arg.startsWith("--saturation=")) {
      filters.saturation = parseFloat(arg.split("=")[1]);
    } else if (arg.startsWith("--hue-shift=")) {
      filters.hueShift = parseFloat(arg.split("=")[1]);
    } else if (arg.startsWith("--fg-lightness=")) {
      filters.foregroundLightness = parseFloat(arg.split("=")[1]);
    } else if (arg.startsWith("--bg-lightness=")) {
      filters.backgroundLightness = parseFloat(arg.split("=")[1]);
    } else if (arg.startsWith("--preset=")) {
      const presetName = arg.split("=")[1] as keyof typeof filterPresets;
      if (filterPresets[presetName]) {
        Object.assign(filters, filterPresets[presetName]);
      } else {
        console.warn(`Unknown preset: ${presetName}. Available: ${Object.keys(filterPresets).join(", ")}`);
      }
    }
  }

  return filters;
}

async function main() {
  const args = bun.argv.slice(2);

  // Version bumping
  if (args.includes("bump")) {
    const part = args[args.indexOf("bump") + 1] as "patch" | "minor" | "major";
    if (!part || !["patch", "minor", "major"].includes(part)) {
      throw new Error("Please specify bump type: patch, minor, or major.");
    }
    await bumpVersion(part);
    return;
  }

  // Help
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: bun run build [options]

Filter options (applied to all themes):
  --contrast=<-1 to 1>     Adjust contrast (0 = no change)
  --brightness=<-1 to 1>   Adjust brightness (0 = no change)
  --saturation=<-1 to 1>   Adjust saturation (0 = no change)
  --hue-shift=<0-360>      Shift hue in degrees
  --fg-lightness=<-1 to 1> Adjust foreground lightness
  --bg-lightness=<-1 to 1> Adjust background lightness
  --preset=<name>          Use a filter preset

Available presets: ${Object.keys(filterPresets).join(", ")}

Examples:
  bun run build --contrast=0.2
  bun run build --preset=highContrast
  bun run build --saturation=-0.3 --brightness=0.1
`);
    return;
  }

  // Parse CLI filters
  const cliFilters = parseFilterArgs(args);
  const hasCliFilters = Object.keys(cliFilters).length > 0;

  if (hasCliFilters) {
    console.log("Applying filters:", cliFilters);
  }

  // Build all themes
  for (const config of themes) {
    // Merge filters: theme.filters < config.filters < CLI filters
    const filters: ThemeFilters = {
      ...config.theme.filters,
      ...config.filters,
      ...cliFilters,
    };

    const vscodeTheme = mapVSCode(config.theme, {
      basePath: config.basePath,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    });

    await bun.write(config.outputPath, JSON.stringify(vscodeTheme, null, "\t"));
    console.log(`Built: ${config.theme.name} -> ${config.outputPath}`);

    if (config.basePath) {
      console.log(`  (merged with ${config.basePath})`);
    }

    // Build Zed theme if output path is specified
    if (config.zedOutputPath) {
      const zedTheme = mapZed(config.theme, {
        filters: Object.keys(filters).length > 0 ? filters : undefined,
      });
      await bun.write(config.zedOutputPath, JSON.stringify(zedTheme, null, "\t"));
      console.log(`Built: ${config.theme.name} (Zed) -> ${config.zedOutputPath}`);
    }
  }
}

async function bumpVersion(part: "patch" | "minor" | "major") {
  const pkgPath = "./package.json";
  const pkg = await bun.file(pkgPath).json();
  const [major, minor, patch] = pkg.version.split(".").map(Number);

  let newVersion = "";
  if (part === "patch") {
    newVersion = `${major}.${minor}.${patch + 1}`;
  } else if (part === "minor") {
    newVersion = `${major}.${minor + 1}.0`;
  } else if (part === "major") {
    newVersion = `${major + 1}.0.0`;
  }

  pkg.version = newVersion;
  await bun.write(pkgPath, JSON.stringify(pkg, null, 2));
  console.log(`Bumped version to ${newVersion}`);
}

main()
  .then(() => console.log("Done at ", new Date().toLocaleTimeString()))
  .catch((err) => console.error(err));
