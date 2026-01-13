"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vscodeTheme = exports.theme = exports.colors = void 0;
const types_1 = require("../types");
const color_1 = __importDefault(require("color"));
exports.colors = {
    "#8e93b0c2": "#8e93b0c2",
    "#4d4e6e": "#4d4e6e",
    "#887a77d9": "#887a77d9",
    "#c3dc8f": "#c3dc8f",
    "#998fe1cf": "#998fe1cf",
    "#cdf6ff": "#cdf6ff",
    "#9aa1c7": "#9aa1c7",
    "#baf8e5": "#baf8e5",
    "#ffb389": "#ffb389",
    "#6cfaa0": "#6cfaa0",
    "#e60063": "#e60063",
    "#0e0e15": "#0e0e15",
    "#8a8276": "#8a8276",
    "#e0a2b1": "#e0a2b1",
    "#383d51": "#383d51",
    "#33b3cc": "#33b3cc",
    "#d1d3d9": "#d1d3d9",
    "#96a5b6": "#96a5b6",
    "#ffd014d4": "#ffd014d4",
    "#7ce6bc": "#7ce6bc",
};
exports.theme = {
    [types_1.TokenType.Background]: exports.colors["#0e0e15"],
    [types_1.TokenType.Source]: exports.colors["#8e93b0c2"],
    [types_1.TokenType.Strings]: exports.colors["#c3dc8f"],
    [types_1.TokenType.Keyword]: exports.colors["#998fe1cf"],
    [types_1.TokenType.Struct]: exports.colors["#cdf6ff"],
    [types_1.TokenType.Variable]: exports.colors["#9aa1c7"],
    [types_1.TokenType.Method]: exports.colors["#7ce6bc"],
    [types_1.TokenType.Constant]: exports.colors["#8e93b0c2"],
    [types_1.TokenType.Property]: exports.colors["#8a8276"],
    [types_1.TokenType.Macro]: exports.colors["#ffb389"],
    [types_1.TokenType.Operator]: exports.colors["#e60063"],
    [types_1.TokenType.Comment]: exports.colors["#383d51"],
    [types_1.TokenType.Type]: exports.colors["#ffb389"],
    [types_1.TokenType.Number]: exports.colors["#33b3cc"],
    [types_1.TokenType.Regexp]: exports.colors["#e60063"],
    [types_1.TokenType.Label]: exports.colors["#e0a2b1"],
    [types_1.TokenType.Function]: exports.colors["#7ce6bc"],
    [types_1.TokenType.Namespace]: exports.colors["#cdf6ff"],
    [types_1.TokenType.Class]: exports.colors["#cdf6ff"],
    [types_1.TokenType.Interface]: exports.colors["#cdf6ff"],
    [types_1.TokenType.Enum]: exports.colors["#9aa1c7"],
    [types_1.TokenType.EnumMember]: exports.colors["#33b3cc"],
    [types_1.TokenType.TypeParameter]: exports.colors["#cdf6ff"],
    [types_1.TokenType.Decorator]: exports.colors["#ffb389"],
    [types_1.TokenType.Parameter]: exports.colors["#9aa1c7"],
};
exports.vscodeTheme = {
    mapping: {
        [types_1.SemanticTokenType.namespace]: types_1.TokenType.Struct,
        [types_1.SemanticTokenType.class]: types_1.TokenType.Struct,
        [types_1.SemanticTokenType.enum]: types_1.TokenType.Variable,
        [types_1.SemanticTokenType.interface]: types_1.TokenType.Struct,
        [types_1.SemanticTokenType.typeParameter]: types_1.TokenType.Type,
        [types_1.SemanticTokenType.type]: types_1.TokenType.Struct,
        [types_1.SemanticTokenType.parameter]: types_1.TokenType.Variable,
        [types_1.SemanticTokenType.variable]: types_1.TokenType.Variable,
        [types_1.SemanticTokenType.comment]: types_1.TokenType.Comment,
        [types_1.SemanticTokenType.string]: types_1.TokenType.Strings,
        [types_1.SemanticTokenType.keyword]: types_1.TokenType.Keyword,
        [types_1.SemanticTokenType.number]: types_1.TokenType.Number,
        [types_1.SemanticTokenType.regexp]: types_1.TokenType.Regexp,
        [types_1.SemanticTokenType.operator]: types_1.TokenType.Operator,
        [types_1.SemanticTokenType.label]: types_1.TokenType.Label,
        [types_1.SemanticTokenType.struct]: types_1.TokenType.Struct,
        [types_1.SemanticTokenType.function]: types_1.TokenType.Method,
        [types_1.SemanticTokenType.method]: types_1.TokenType.Method,
        [types_1.SemanticTokenType.decorator]: types_1.TokenType.Macro,
        [types_1.SemanticTokenType.macro]: types_1.TokenType.Macro,
        [types_1.SemanticTokenType.property]: types_1.TokenType.Property,
    },
    modifiers: {
        // Global: no special styling for declarations
        [types_1.SemanticTokenModifier.declaration]: {},
        // Global: documentation uses comment color with italic
        [types_1.SemanticTokenModifier.documentation]: {
            global: { foreground: exports.colors["#383d51"], fontStyle: "italic" },
        },
        // Global: readonly gets a specific color
        [types_1.SemanticTokenModifier.readonly]: {
            global: { foreground: exports.colors["#96a5b6"] },
        },
        // Global: static has no fontStyle (reset any inherited italic)
        [types_1.SemanticTokenModifier.static]: {
            global: { fontStyle: "" },
        },
        // Global: abstract (no special styling)
        [types_1.SemanticTokenModifier.abstract]: {},
        // Global: deprecated gets strikethrough
        [types_1.SemanticTokenModifier.deprecated]: {
            global: { fontStyle: "strikethrough" },
        },
        // Global color + per-token transform: modification gets highlighted
        [types_1.SemanticTokenModifier.modification]: {
        // global: { foreground: colors["#ffd014d4"] },
        // Also lighten based on base token color
        // transform: (color: string) => Color(color).lighten(0.1).hex(),
        },
        // Per-token transform: async tokens get mixed with keyword color
        [types_1.SemanticTokenModifier.async]: {
            transform: (color) => (0, color_1.default)(color).mix((0, color_1.default)(exports.colors["#998fe1cf"]), 0.1).hex(),
        },
    },
};
//# sourceMappingURL=minted.legacy.js.map