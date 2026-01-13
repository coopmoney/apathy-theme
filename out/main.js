"use strict";
/**
 * Build themes from ThemeDefinitions
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const bun = __importStar(require("bun"));
const vscode_1 = require("./integrations/vscode");
const zed_1 = require("./integrations/zed");
const filters_1 = require("./filters");
// Import theme definitions
const minted_1 = require("./themes/minted");
const slate_1 = require("./themes/slate");
const apathy_1 = require("./themes/apathy");
const apatheticOcean_1 = require("./themes/apatheticOcean");
const apathyExperimental_1 = require("./themes/apathyExperimental");
const themes = [
    {
        theme: minted_1.minted,
        outputPath: "./dist/minted.json",
        basePath: "./themes/minted.jsonc",
        zedOutputPath: "./packages/zed/themes/minted.json",
        // Example: You can add filters here to override/add to theme.filters
        // filters: filterPresets.lowContrast,
    },
    {
        theme: slate_1.slate,
        outputPath: "./dist/slate.json",
        zedOutputPath: "./packages/zed/themes/slate.json",
        // No basePath = fresh build
    },
    {
        theme: apathy_1.apathy,
        outputPath: "./dist/apathy.json",
        zedOutputPath: "./packages/zed/themes/apathy.json",
    },
    {
        theme: apatheticOcean_1.apatheticOcean,
        outputPath: "./dist/apathetic-ocean.json",
        zedOutputPath: "./packages/zed/themes/apathetic-ocean.json",
    },
    {
        theme: apathyExperimental_1.apathyExperimental,
        outputPath: "./dist/apathy-experimental.json",
        zedOutputPath: "./packages/zed/themes/apathy-experimental.json",
    },
];
function applyModifiers(obj) {
    const defaultColor = obj.default;
    if (!defaultColor) {
        throw new Error("Default color is required");
    }
    const output = {
        default: defaultColor,
    };
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "function") {
            output[key] = value(defaultColor);
        }
        else {
            output[key] = value;
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
function parseFilterArgs(args) {
    const filters = {};
    for (const arg of args) {
        if (arg.startsWith("--contrast=")) {
            filters.contrast = parseFloat(arg.split("=")[1]);
        }
        else if (arg.startsWith("--brightness=")) {
            filters.brightness = parseFloat(arg.split("=")[1]);
        }
        else if (arg.startsWith("--saturation=")) {
            filters.saturation = parseFloat(arg.split("=")[1]);
        }
        else if (arg.startsWith("--hue-shift=")) {
            filters.hueShift = parseFloat(arg.split("=")[1]);
        }
        else if (arg.startsWith("--fg-lightness=")) {
            filters.foregroundLightness = parseFloat(arg.split("=")[1]);
        }
        else if (arg.startsWith("--bg-lightness=")) {
            filters.backgroundLightness = parseFloat(arg.split("=")[1]);
        }
        else if (arg.startsWith("--preset=")) {
            const presetName = arg.split("=")[1];
            if (filters_1.presets[presetName]) {
                Object.assign(filters, filters_1.presets[presetName]);
            }
            else {
                console.warn(`Unknown preset: ${presetName}. Available: ${Object.keys(filters_1.presets).join(", ")}`);
            }
        }
    }
    return filters;
}
async function main() {
    const args = bun.argv.slice(2);
    // Version bumping
    if (args.includes("bump")) {
        const part = args[args.indexOf("bump") + 1];
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

Available presets: ${Object.keys(filters_1.presets).join(", ")}

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
        const filters = {
            ...config.theme.filters,
            ...config.filters,
            ...cliFilters,
        };
        const vscodeTheme = (0, vscode_1.mapVSCode)(config.theme, {
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
            const zedTheme = (0, zed_1.mapZed)(config.theme, {
                filters: Object.keys(filters).length > 0 ? filters : undefined,
            });
            await bun.write(config.zedOutputPath, JSON.stringify(zedTheme, null, "\t"));
            console.log(`Built: ${config.theme.name} (Zed) -> ${config.zedOutputPath}`);
        }
    }
}
async function bumpVersion(part) {
    const pkgPath = "./package.json";
    const pkg = await bun.file(pkgPath).json();
    const [major, minor, patch] = pkg.version.split(".").map(Number);
    let newVersion = "";
    if (part === "patch") {
        newVersion = `${major}.${minor}.${patch + 1}`;
    }
    else if (part === "minor") {
        newVersion = `${major}.${minor + 1}.0`;
    }
    else if (part === "major") {
        newVersion = `${major + 1}.0.0`;
    }
    pkg.version = newVersion;
    await bun.write(pkgPath, JSON.stringify(pkg, null, 2));
    console.log(`Bumped version to ${newVersion}`);
}
main()
    .then(() => console.log("Done at ", new Date().toLocaleTimeString()))
    .catch((err) => console.error(err));
//# sourceMappingURL=main.js.map