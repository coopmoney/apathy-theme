"use strict";
/**
 * Minted theme - converted to hierarchical slate-style format
 *
 * Since minted was flat, most values just become "default" values.
 * This preserves the exact same output while using the new system.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minted = exports.v = exports.palette = void 0;
const types_1 = require("./types");
const types_2 = require("../types");
const color_1 = __importDefault(require("color"));
const utils_1 = require("./utils");
// ============================================================================
// 1. Color Palette
// ============================================================================
var palette;
(function (palette) {
    // Backgrounds
    // midnight = "#0d1117",
    palette["midnight"] = "#0f0f15";
    palette["midnight2"] = "#0e0e15";
    palette["midnightLight"] = "#161620";
    palette["midnightDark"] = "#07070a";
    palette["black"] = "#0f0f12";
    palette["semiblack"] = "#0a0a0c";
    palette["alphaBlack"] = "#0f0f1280";
    palette["alphaWhite"] = "#e1e2e520";
    palette["#08080c"] = "#08080c";
    // Grays & Neutrals
    palette["charcoal"] = "#383d51";
    palette["darkBlue"] = "#4B6672";
    palette["bluegray"] = "#6372a1";
    palette["#527bb254"] = "#527bb254";
    palette["taupe"] = "#888278ff";
    palette["mist"] = "#868ba5c2";
    palette["steel"] = "#96a5b6";
    palette["slate"] = "#9aa1c7";
    palette["flatwhite"] = "#b1b1bffa";
    palette["devwhite"] = "#afd1e9cf";
    palette["white"] = "#e1e2e5";
    // Greens
    palette["wasabi"] = "#c3dc8f";
    palette["wasabi2"] = "#98bf82";
    palette["seafoam"] = "#7ce6bc";
    // Blues & Cyans
    palette["cyan"] = "#33b3cc";
    palette["ice"] = "#b3e6de";
    // Purples
    palette["lavender"] = "#998fe1cf";
    palette["magenta"] = "#fc00ff";
    // Warm accents
    palette["peach"] = "#ffb389";
    palette["blush"] = "#e0a2b1";
    palette["crimson"] = "#ca175d";
    palette["gold"] = "#ffd014d4";
    // todo
    palette["gray1"] = "#5C5675";
    palette["gray2"] = "#362942";
    palette["orange1"] = "#FF7859";
    // experimental
    /* blue */
    palette["#1abdda"] = "#1abdda";
    /** seafoam */
    palette["#88e6d6"] = "#88e6d6";
    /** waaai */
    palette["#C3E88D"] = "#C3E88D";
    /** peach */
    palette["#ffb389"] = "#ffb389";
    /** crimson */
    palette["#F07178"] = "#F07178";
    /** mint glow */
    palette["#6bffbfdb"] = "#6bffbfdb";
    /** blush */
    palette["#ff9d9ddf"] = "#ff9d9ddf";
    /** frost alpha */
    palette["#efadeab0"] = "#efadeab0";
})(palette || (exports.palette = palette = {}));
const v = (k) => k;
exports.v = v;
// ============================================================================
// 2. Theme Definition
// ============================================================================
const tokens = {
    source: palette.mist,
    comments: palette.charcoal,
    strings: (0, types_1.make)({
        default: palette.wasabi,
        regex: palette.peach,
    }),
    operators: {
        default: palette.crimson,
    },
    literals: {
        default: palette.cyan,
        string: palette.wasabi,
        number: palette.cyan,
        boolean: palette.cyan,
        null: palette.lavender,
        undefined: palette.lavender,
        regex: palette.peach,
    },
    keywords: {
        default: palette.devwhite,
        operator: palette.crimson,
    },
    variables: {
        default: palette.slate,
        local: palette.slate,
        parameter: palette.slate,
        property: palette.taupe,
        global: palette.slate,
        other: palette.flatwhite,
    },
    constants: {
        default: palette.mist,
        numeric: palette.cyan,
        language: palette.cyan,
        userDefined: palette.mist,
    },
    functions: {
        default: palette.seafoam,
        declaration: palette.seafoam,
        call: palette.seafoam,
        method: palette.seafoam,
        builtin: palette.seafoam,
    },
    types: {
        default: palette.ice,
        primitive: palette.peach,
        class: palette.ice,
        interface: palette.ice,
        enum: palette.slate,
        typeParameter: palette.ice,
        namespace: palette.ice,
    },
    punctuation: {
        default: palette.mist,
        definition: palette.gray2,
        delimiter: palette.charcoal,
        bracket: palette.charcoal,
        accessor: palette.charcoal,
    },
    meta: {
        default: palette.peach,
        decorator: palette.peach,
        macro: palette.peach,
        annotation: palette.peach,
        label: palette.blush,
        tag: palette.gray1,
    },
    storage: {
        default: palette.bluegray,
        type: palette.bluegray,
    },
};
const ui = {
    backgrounds: {
        base: palette.midnight,
        darker: (0, utils_1.darken)(palette.midnight, 0.1),
        surface: (0, utils_1.lighten)(palette.midnight, 0.15),
        raised: (0, utils_1.lighten)(palette.midnight, 1),
        overlay: (0, utils_1.lighten)(palette.midnight, 1),
        codeBlock: palette["#08080c"],
    },
    foregrounds: {
        default: tokens.source,
        muted: (0, utils_1.alpha20)(palette.mist),
        subtle: palette.charcoal,
        accent: palette.cyan,
        focused: (0, utils_1.lighten)(palette.mist, 0.3),
    },
    borders: {
        default: (0, utils_1.lighten)(palette.midnight, 0.4),
        active: palette.semiblack,
        subtle: palette.semiblack,
        separator: palette.semiblack,
    },
    accent: {
        primary: palette.cyan,
        primaryForeground: palette.cyan,
        secondary: palette.peach,
    },
    status: {
        error: palette.crimson,
        warning: palette.peach,
        info: palette.cyan,
        success: palette.seafoam,
    },
    selection: {
        background: (0, utils_1.mix)(tokens.source, palette.midnight, 0.5),
        backgroundInactive: (0, utils_1.transparentize)(palette.white, 0.1),
        text: palette.charcoal,
        backgroundActive: palette.darkBlue,
    },
    highlights: {
        wordBackground: (0, utils_1.mix)(tokens.source, palette.midnight, 0.5),
        selectionBackgroundInactive: palette.charcoal,
        selectionBackgroundActive: (0, utils_1.mix)(tokens.source, palette.midnight, 0.5),
    },
    git: {
        // added: mix(palette.seafoam, palette.midnight, 0.5),
        added: palette.seafoam,
        // modified: mix(palette.peach, palette.midnight, 0.2),
        modified: palette.bluegray,
        deleted: palette.crimson,
        untracked: palette.mist,
        ignored: palette.mist,
        conflict: palette.crimson,
    }
};
const components = {
    editor: {
        background: ui.backgrounds.darker,
        foreground: ui.foregrounds.default,
        lineHighlight: ui.highlights?.selectionBackgroundActive || ui.backgrounds.overlay,
        lineHighlightBorder: (0, utils_1.lighten)(ui.backgrounds.base, 0.15),
        findMatchHighlightBackground: (0, utils_1.mix)(ui.backgrounds.surface, palette.lavender, 0.1),
        findRangeHighlightBackground: (0, utils_1.mix)(ui.backgrounds.surface, palette.lavender, 0.1),
        selectionHighlightBackground: (0, utils_1.mix)(ui.backgrounds.darker, palette.lavender, 0.1),
        lineNumberActiveForeground: palette.mist,
        lineNumberForeground: (0, utils_1.darken)(palette.mist, 0.7),
        selectionBackground: (0, utils_1.mix)(tokens.source, palette.midnight, 0.8),
        inactiveSelectionBackground: (0, utils_1.darken)(palette.lavender, 0.8),
        findMatchBackground: (0, utils_1.mix)(palette.midnight, palette['#527bb254'], 0.5),
        // selectionHighlight: lighten(ui.backgrounds.base, 0.15),
        // wordHighlight: transparentize(ui.foregrounds.default, 0.95),
        // wordHighlightStrong: transparentize(ui.foregrounds.default, 0.95),
        // findMatchHighlight: lighten(ui.backgrounds.base, 0.15),
        // findMatch: lighten(ui.backgrounds.base, 0.15),
        // rangeHighlight: lighten(ui.backgrounds.base, 0.15),
        // selectionHighlight: "#1b14395c",
        // wordHighlight: "#383248a5",
        // wordHighlightStrong: "#52486cab",
        // findMatchHighlight: "#18142ddc",
        // findMatch: "#2a2540dc",
        // rangeHighlight: "#2A244120",
    },
    editorGutter: {
        background: ui.backgrounds.darker,
        modifiedBackground: (0, utils_1.mix)(palette.gold, ui.backgrounds.base, 0.6),
        addedBackground: (0, utils_1.mix)(palette.seafoam, ui.backgrounds.base, 0.6),
        deletedBackground: (0, utils_1.mix)(palette.crimson, ui.backgrounds.base, 0.6),
        foldingControl: (0, utils_1.mix)(palette.steel, ui.backgrounds.base, 0.6),
    },
    editorLineNumber: {
        foreground: palette.charcoal,
        activeForeground: palette.mist,
    },
    editorWidget: {
        background: ui.backgrounds.surface,
        foreground: ui.foregrounds.default,
        border: ui.borders.default,
    },
    titleBar: {
        inactiveBackground: ui.backgrounds.base,
        inactiveForeground: palette.mist,
        activeBackground: palette.midnight,
        activeForeground: palette.mist,
    },
    activityBar: {
        background: ui.backgrounds.darker,
        foreground: palette.mist,
        inactiveForeground: palette.mist,
        border: palette.semiblack,
        badgeBackground: palette.alphaBlack,
        badgeForeground: palette.wasabi,
    },
    sideBar: {
        background: ui.backgrounds.base,
        foreground: (0, utils_1.mix)(palette.mist, palette.midnight, 0.2),
        border: ui.borders.default,
        sectionHeaderBackground: palette.midnight,
        sectionHeaderForeground: palette.mist,
    },
    panel: {
        background: ui.backgrounds.base,
        foreground: palette.mist,
        border: ui.borders.default,
        titleActiveForeground: palette.mist,
        titleInactiveForeground: palette.mist,
        titleActiveBorder: palette.steel,
    },
    statusBar: {
        background: palette.midnight,
        foreground: palette.mist,
        border: ui.borders.default,
        debuggingBackground: palette.seafoam,
        debuggingForeground: palette.crimson,
        noFolderBackground: palette.midnight,
        noFolderForeground: palette.mist,
    },
    tabs: {
        activeBackground: palette.midnight,
        activeForeground: palette.mist,
        activeBorder: ui.borders.default,
        activeBorderTop: palette.steel,
        inactiveBackground: palette.midnight,
        inactiveForeground: palette.mist,
        hoverBackground: palette.midnight,
        hoverForeground: palette.mist,
        unfocusedActiveBackground: palette.midnight,
        unfocusedActiveForeground: palette.mist,
        modifiedBorder: palette.peach,
    },
    list: {
        activeSelectionBackground: palette.midnight,
        activeSelectionForeground: palette.mist,
        inactiveSelectionBackground: palette.midnight,
        inactiveSelectionForeground: palette.mist,
        hoverBackground: palette.midnight,
        hoverForeground: palette.mist,
        focusBackground: palette.midnight,
        focusForeground: palette.mist,
        highlightForeground: palette.steel,
    },
    input: {
        background: palette.midnightLight,
        foreground: (0, utils_1.lighten)(palette.mist, 0.1),
        placeholderForeground: (0, utils_1.darken)(palette.mist, 0.2),
        border: palette.charcoal,
    },
    button: {
        background: palette.midnight,
        foreground: palette.mist,
        hoverBackground: palette.midnight,
        secondaryBackground: palette.midnight,
        secondaryForeground: palette.mist,
        secondaryHoverBackground: palette.midnight,
    },
    dropdown: {
        background: palette.midnight,
        foreground: palette.mist,
        border: (0, utils_1.darken)(palette.steel, 0.2),
        listBackground: palette.midnight,
    },
    badge: {
        background: palette.midnight,
        foreground: palette.mist,
        border: (0, utils_1.lighten)(palette.midnight, 0.2),
    },
    scrollbar: {
        shadow: palette.midnight,
        sliderBackground: palette.midnight,
        sliderHoverBackground: palette.midnight,
        sliderActiveBackground: palette.midnight,
    },
    minimap: {
        background: palette.midnight,
        selectionHighlight: palette.mist,
        errorHighlight: palette.crimson,
        warningHighlight: palette.peach,
        findMatchHighlight: (0, utils_1.mix)(ui.backgrounds.surface, palette.lavender, 0.5),
    },
    breadcrumb: {
        background: palette.midnight,
        foreground: palette.mist,
        focusForeground: palette.mist,
        activeSelectionForeground: palette.mist,
    },
    terminal: {
        background: ui.backgrounds.darker,
        foreground: palette.mist,
        cursorForeground: palette.mist,
        selectionBackground: (0, utils_1.l10)(palette.midnight),
        cursor: palette.mist,
        ansiBlack: palette.charcoal,
        ansiRed: palette.crimson,
        ansiGreen: palette.seafoam,
        ansiYellow: palette.peach,
        ansiBlue: palette.cyan,
        ansiMagenta: palette.lavender,
        ansiCyan: palette.ice,
        ansiWhite: palette.white,
        ansiBrightBlack: palette.steel,
        ansiBrightRed: palette.crimson,
        ansiBrightGreen: palette.seafoam,
        ansiBrightYellow: palette.peach,
        ansiBrightBlue: palette.cyan,
        ansiBrightMagenta: palette.lavender,
        ansiBrightCyan: palette.ice,
        ansiBrightWhite: palette.flatwhite,
    },
    notification: {
        background: palette.midnight,
        foreground: palette.mist,
        border: palette.steel,
    },
    peekView: {
        editorBackground: palette.midnight,
        editorBorder: palette.steel,
        resultBackground: palette.midnight,
        resultSelectionBackground: palette.midnight,
        titleBackground: palette.midnight,
        titleForeground: palette.mist,
    },
    diffEditor: {
        insertedTextBackground: "#09131588",
        removedTextBackground: "#2e060982",
        insertedLineBackground: "#09131588",
        removedLineBackground: "#1202049e",
        diagonalFill: palette.steel,
    },
    merge: {
        currentHeaderBackground: palette.midnight,
        incomingHeaderBackground: palette.midnight,
        commonHeaderBackground: palette.midnight,
        currentContentBackground: (0, utils_1.mix)(palette.seafoam, palette.midnight, 0.3),
        incomingContentBackground: palette.peach,
        commonContentBackground: (0, utils_1.mix)(palette.steel, palette.midnight, 0.3),
    },
};
exports.minted = {
    name: "Minted",
    type: "dark",
    palette,
    background: ui.backgrounds.base,
    tokens,
    languageOverrides: {
        go: {
            functions: {
                default: palette.ice
            }
        },
        css: {
            variables: {
                default: palette.slate,
                property: palette.darkBlue
            }
        }
    },
    // Semantic overrides for fine-tuning
    semantic: {
        comment: palette.charcoal,
        string: palette.wasabi,
        keyword: palette.lavender,
        number: palette.cyan,
        regexp: palette.peach,
        operator: palette.crimson,
        namespace: palette.ice,
        type: palette.ice,
        struct: palette.ice,
        class: palette.ice,
        interface: palette.ice,
        enum: palette.slate,
        typeParameter: palette.ice,
        function: palette.seafoam,
        method: palette.seafoam,
        decorator: palette.peach,
        macro: palette.peach,
        variable: palette.slate,
        parameter: palette.slate,
        property: palette.taupe,
        label: palette.blush,
    },
    // Modifier handlers
    modifiers: {
        [types_2.SemanticTokenModifier.documentation]: {
            global: { foreground: palette.charcoal, fontStyle: "italic" },
        },
        [types_2.SemanticTokenModifier.static]: {
            global: { fontStyle: "" },
        },
        [types_2.SemanticTokenModifier.deprecated]: {
            global: { fontStyle: "strikethrough" },
        },
        [types_2.SemanticTokenModifier.async]: {
            transform: (color) => (0, color_1.default)(color).mix((0, color_1.default)(palette.lavender), 0.1).hex(),
        },
    },
    ui: {
        ...ui,
        overrides: components
    }
};
exports.default = exports.minted;
// rgb(144 230 201 / 95%)
//# sourceMappingURL=minted.js.map