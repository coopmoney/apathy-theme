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
exports.buildVSCodeTheme = buildVSCodeTheme;
const types_1 = require("../types");
const fs = __importStar(require("fs"));
/**
 * Strip JSONC syntax (comments and trailing commas) for JSON.parse
 */
function stripJsonc(content) {
    // Remove block comments
    let result = content.replace(/\/\*[\s\S]*?\*\//g, "");
    // Remove line comments (but not inside strings)
    result = result.replace(/^(\s*)\/\/.*$/gm, "$1");
    // Remove trailing commas before } or ]
    result = result.replace(/,(\s*[}\]])/g, "$1");
    return result;
}
/**
 * Load an existing JSON/JSONC theme file as the base
 */
function loadBaseTheme(basePath) {
    try {
        const content = fs.readFileSync(basePath, "utf-8");
        const jsonContent = stripJsonc(content);
        return JSON.parse(jsonContent);
    }
    catch (err) {
        console.warn(`Could not load base theme from ${basePath}:`, err);
        return null;
    }
}
/**
 * Generate semantic token colors from theme and mapping, including modifiers
 */
function generateSemanticTokenColors(theme, vscodeTheme) {
    const semanticTokenColors = {};
    // Map each semantic token type to its color via the theme's mapping
    for (const [semanticType, tokenType] of Object.entries(vscodeTheme.mapping)) {
        const color = theme[tokenType];
        if (color) {
            semanticTokenColors[semanticType] = color;
        }
    }
    // Generate modifier entries
    if (vscodeTheme.modifiers) {
        for (const [modifier, config] of Object.entries(vscodeTheme.modifiers)) {
            if (!config)
                continue;
            // Global modifiers: *.modifier
            if (config.global) {
                const globalKey = `*.${modifier}`;
                semanticTokenColors[globalKey] = tokenStyleToValue(config.global);
            }
            // Per-token transforms: tokenType.modifier
            if (config.transform) {
                for (const [semanticType, tokenType] of Object.entries(vscodeTheme.mapping)) {
                    const baseColor = theme[tokenType];
                    if (baseColor) {
                        const transformedColor = config.transform(baseColor);
                        const modifierKey = `${semanticType}.${modifier}`;
                        semanticTokenColors[modifierKey] = transformedColor;
                    }
                }
            }
        }
    }
    return semanticTokenColors;
}
/**
 * Convert a TokenStyle to the VS Code semantic token value format
 */
function tokenStyleToValue(style) {
    // If only foreground, return just the string
    if (style.foreground && !style.fontStyle) {
        return style.foreground;
    }
    // Otherwise return object
    return {
        ...(style.foreground && { foreground: style.foreground }),
        ...(style.fontStyle !== undefined && { fontStyle: style.fontStyle }),
    };
}
/**
 * Generate basic tokenColors from theme for common scopes
 */
function generateTokenColors(theme) {
    const tokenColors = [];
    // Map core token types to TextMate scopes
    const scopeMappings = [
        {
            tokenType: types_1.TokenType.Comment,
            name: "Comment",
            scope: ["comment", "punctuation.definition.comment"],
            fontStyle: "italic",
        },
        {
            tokenType: types_1.TokenType.Strings,
            name: "String",
            scope: ["string.quoted.single", "string.quoted.double", "string.template", "string.quoted.other"],
        },
        {
            tokenType: types_1.TokenType.Number,
            name: "Number",
            scope: ["constant.numeric", "constant.numeric.integer", "constant.numeric.float"],
        },
        {
            tokenType: types_1.TokenType.Keyword,
            name: "Keyword",
            scope: ["keyword", "keyword.control", "keyword.operator.logical"],
        },
        {
            tokenType: types_1.TokenType.Operator,
            name: "Operator",
            scope: ["keyword.operator", "punctuation.accessor"],
        },
        {
            tokenType: types_1.TokenType.Variable,
            name: "Variable",
            scope: ["variable", "variable.other"],
        },
        {
            tokenType: types_1.TokenType.Method,
            name: "Function",
            scope: ["entity.name.function", "meta.function-call.generic", "support.function"],
        },
        {
            tokenType: types_1.TokenType.Struct,
            name: "Class/Type",
            scope: ["entity.name.class", "entity.name.type", "support.class", "support.type"],
        },
        {
            tokenType: types_1.TokenType.Macro,
            name: "Decorator/Macro",
            scope: ["entity.name.function.decorator", "punctuation.definition.decorator"],
        },
        {
            tokenType: types_1.TokenType.Regexp,
            name: "Regular Expression",
            scope: ["string.regexp"],
            fontStyle: "italic",
        },
    ];
    for (const mapping of scopeMappings) {
        const color = theme[mapping.tokenType];
        if (color) {
            tokenColors.push({
                name: mapping.name,
                scope: mapping.scope,
                settings: {
                    foreground: color,
                    ...(mapping.fontStyle && { fontStyle: mapping.fontStyle }),
                },
            });
        }
    }
    return tokenColors;
}
/**
 * Generate basic editor colors from theme
 */
function generateEditorColors(theme) {
    const colors = {};
    if (theme[types_1.TokenType.Background]) {
        colors["editor.background"] = theme[types_1.TokenType.Background];
    }
    if (theme[types_1.TokenType.Source]) {
        colors["editor.foreground"] = theme[types_1.TokenType.Source];
    }
    return colors;
}
/**
 * Deep merge two objects, with source values taking precedence
 */
function deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        const sourceValue = source[key];
        const targetValue = target[key];
        if (sourceValue === undefined) {
            continue;
        }
        if (typeof sourceValue === "object" &&
            sourceValue !== null &&
            !Array.isArray(sourceValue) &&
            typeof targetValue === "object" &&
            targetValue !== null &&
            !Array.isArray(targetValue)) {
            result[key] = deepMerge(targetValue, sourceValue);
        }
        else {
            result[key] = sourceValue;
        }
    }
    return result;
}
/**
 * Merge token colors arrays, with generated taking precedence for matching scopes
 */
function mergeTokenColors(base, generated) {
    // Create a map of generated scopes for quick lookup
    const generatedScopes = new Set();
    for (const token of generated) {
        const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
        for (const s of scopes) {
            generatedScopes.add(s);
        }
    }
    // Keep base tokens that don't overlap with generated ones
    const filteredBase = base.filter((token) => {
        const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
        // Keep if none of the scopes are in generated
        return !scopes.some((s) => generatedScopes.has(s));
    });
    // Generated tokens first (higher priority), then base tokens
    return [...generated, ...filteredBase];
}
/**
 * Build a complete VS Code theme file from code-defined theme,
 * optionally using an existing JSON theme as the base for undefined values.
 */
function buildVSCodeTheme(theme, vscodeTheme, options) {
    // Load base theme if provided
    const baseTheme = options.basePath ? loadBaseTheme(options.basePath) : null;
    // Generate from code
    const generatedColors = generateEditorColors(theme);
    const generatedTokenColors = generateTokenColors(theme);
    const generatedSemanticTokenColors = generateSemanticTokenColors(theme, vscodeTheme);
    if (baseTheme) {
        // Migration mode: merge with base theme
        return {
            name: options.name,
            type: options.type,
            colors: deepMerge(baseTheme.colors || {}, generatedColors),
            tokenColors: mergeTokenColors(baseTheme.tokenColors || [], generatedTokenColors),
            semanticHighlighting: true,
            semanticTokenColors: deepMerge(baseTheme.semanticTokenColors || {}, generatedSemanticTokenColors),
        };
    }
    // Fresh build: only use generated values
    return {
        name: options.name,
        type: options.type,
        colors: generatedColors,
        tokenColors: generatedTokenColors,
        semanticHighlighting: true,
        semanticTokenColors: generatedSemanticTokenColors,
    };
}
//# sourceMappingURL=vscode.js.map