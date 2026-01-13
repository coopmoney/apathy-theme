"use strict";
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
const minted_1 = require("./themes/minted");
const apathy_1 = require("./themes/apathy");
const vscode_1 = require("./integrations/vscode");
async function bumpversion(part) {
    const bumpType = part;
    if (!["patch", "minor", "major"].includes(bumpType)) {
        throw new Error("Invalid bump type. Use patch, minor, or major.");
    }
    const pkgPath = "./package.json";
    const pkg = await bun.file(pkgPath).json();
    const [major, minor, patch] = pkg.version.split(".").map(Number);
    let newVersion = "";
    if (bumpType === "patch") {
        newVersion = `${major}.${minor}.${patch + 1}`;
    }
    else if (bumpType === "minor") {
        newVersion = `${major}.${minor + 1}.0`;
    }
    else if (bumpType === "major") {
        newVersion = `${major + 1}.0.0`;
    }
    pkg.version = newVersion;
    await bun.write(pkgPath, JSON.stringify(pkg, null, 2));
    console.log(`Bumped version to ${newVersion}`);
    return;
}
const themes = [
    {
        name: "Minted",
        outputPath: "./themes/minted.json",
        // Use existing JSONC as base for values not yet defined in code
        basePath: "./themes/minted.jsonc",
        theme: minted_1.theme,
        vscodeTheme: minted_1.vscodeTheme,
    },
    {
        name: "Apathy",
        outputPath: "./themes/Apathy-color-theme.json",
        basePath: "./themes/Apathy-color-theme.json",
        theme: apathy_1.theme,
        vscodeTheme: apathy_1.vscodeTheme,
    },
];
async function main() {
    const args = bun.argv.slice(2);
    if (args.includes("bump")) {
        const part = args[args.indexOf("bump") + 1];
        if (!part || !["patch", "minor", "major"].includes(part)) {
            throw new Error("Please specify bump type: patch, minor, or major.");
        }
        await bumpversion(part);
        return;
    }
    // Build all themes
    for (const config of themes) {
        const themeFile = (0, vscode_1.buildVSCodeTheme)(config.theme, config.vscodeTheme, {
            name: config.name,
            type: "dark",
            basePath: config.basePath,
        });
        await bun.write(config.outputPath, JSON.stringify(themeFile, null, "\t"));
        console.log(`Built theme: ${config.name} -> ${config.outputPath}`);
        if (config.basePath) {
            console.log(`  (migrated from ${config.basePath})`);
        }
    }
}
main()
    .then(() => console.log("Done!"))
    .catch((err) => console.error(err));
//# sourceMappingURL=main.legacy.js.map