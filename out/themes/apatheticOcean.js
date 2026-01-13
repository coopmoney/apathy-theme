"use strict";
/**
 * Apathetic Ocean theme - converted to hierarchical slate-style format
 *
 * A cooler, ocean-inspired variant with muted blues and greens.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apatheticOcean = exports.v = exports.palette = void 0;
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
    palette["background"] = "#0e0e15";
    palette["gutterBg"] = "#0f0f12";
    palette["panelBg"] = "#0f0f12";
    palette["tabBg"] = "#0f0e10";
    palette["tabHeaderBg"] = "#0f0f12";
    // Grays & Neutrals
    palette["white"] = "#e1e2e5";
    palette["softWhite"] = "#a7a4af";
    palette["steel"] = "#96a5b6";
    palette["mist"] = "#8e93b0c2";
    palette["charcoal"] = "#383d51";
    palette["muted"] = "#4D4A56";
    palette["gray"] = "#7d7a8b";
    palette["lightGray"] = "#B5B5B5";
    palette["faintGray"] = "#74727794";
    // Blues & Cyans
    palette["cyan"] = "#33b3cc";
    palette["ice"] = "#93e3db";
    palette["seafoam"] = "#7ce6bcff";
    palette["softBlue"] = "#afd1e9cf";
    palette["paleBlue"] = "#78DCE8";
    palette["lightBlue"] = "#82AAFF";
    palette["exportBlue"] = "#91aac0";
    palette["importPurple"] = "#d09bd2";
    // Greens
    palette["wasabi"] = "#aac17b";
    palette["mint"] = "#A1EFE4";
    palette["lime"] = "#A6E22E";
    palette["brightGreen"] = "#C3E88D";
    palette["addedGreen"] = "#449dab";
    palette["gitInserted"] = "#A7DA1E";
    // Warm accents
    palette["gold"] = "#ffcb6b";
    palette["amber"] = "#ffa114";
    palette["yellow"] = "#FFCB6B";
    palette["peach"] = "#FFD866";
    palette["orange"] = "#FF7A00";
    palette["gitModified"] = "#6183bb";
    // Reds & Pinks
    palette["crimson"] = "#af0a52";
    palette["rose"] = "#FF6188";
    palette["blush"] = "#e0a2b1";
    palette["pink"] = "#f184bce6";
    palette["coral"] = "#FF7859";
    palette["errorRed"] = "#b70b24";
    palette["gitDeleted"] = "#914c54";
    palette["deletedRed"] = "#e46876";
    // Purples
    palette["lavender"] = "#998fe1cf";
    palette["purple"] = "#C792EA";
    palette["lilac"] = "#C574DD";
    palette["paramPurple"] = "#8e8db3";
    palette["accessor"] = "#7a73cc";
    palette["namespace"] = "#f0c9dd";
    palette["classColor"] = "#bb7494";
    // Browns
    palette["taupe"] = "#8a7b5c";
    palette["olive"] = "#67514c";
    palette["darkOlive"] = "#5c4c42";
    palette["propertyDef"] = "#74728f";
    palette["propertyDecl"] = "#675f5a";
    // Status
    palette["warning"] = "#E6986B";
    palette["info"] = "#78DCE8";
    // UI Elements
    palette["selection"] = "#2d22476b";
    palette["selectionHighlight"] = "#39324952";
    palette["inactiveSelection"] = "#2d22473d";
    palette["wordHighlight"] = "#383248a5";
    palette["wordHighlightStrong"] = "#52486cab";
    palette["findMatch"] = "#2a2540dc";
    palette["findMatchHighlight"] = "#18142ddc";
    palette["lineHighlight"] = "#1b162994";
    palette["indentGuide"] = "#29192969";
    palette["indentGuideActive"] = "#6b406b69";
    palette["whitespace"] = "#272636";
    palette["ruler"] = "#29192969";
    palette["widgetBg"] = "#1c1e29cc";
    palette["widgetBorder"] = "#527bb254";
    palette["widgetFg"] = "#d4edff99";
    palette["suggestBg"] = "#1B1629";
    palette["listActive"] = "#2A2441";
    palette["focusBorder"] = "#a099ae14";
    palette["tabBorder"] = "#212131";
    palette["tabActiveBorder"] = "#d0cfd3";
    palette["buttonBg"] = "#7a5acd2e";
    palette["buttonFg"] = "#80ffecba";
    palette["buttonBorder"] = "#3d374978";
    palette["inputBg"] = "#14141b";
    palette["inputBorder"] = "#26242a99";
    // Terminal ANSI
    palette["ansiBlack"] = "#2A273F";
    palette["ansiBrightBlack"] = "#3F3B5A";
    palette["ansiRed"] = "#F07178";
    palette["ansiBrightRed"] = "#FF6B82";
    palette["ansiWhite"] = "#D1D3D9";
})(palette || (exports.palette = palette = {}));
const v = (k) => k;
exports.v = v;
// ============================================================================
// 2. Theme Definition
// ============================================================================
exports.apatheticOcean = {
    name: "Apathetic Ocean",
    type: "dark",
    palette,
    background: palette.background,
    tokens: {
        source: palette.softWhite,
        comments: palette.charcoal,
        strings: (0, types_1.make)({
            default: palette.wasabi,
            regex: palette.rose,
        }),
        operators: {
            default: palette.crimson,
        },
        literals: {
            default: palette.cyan,
            string: palette.wasabi,
            number: palette.cyan,
            boolean: palette.cyan,
            null: palette.cyan,
            undefined: palette.cyan,
            regex: palette.rose,
        },
        keywords: {
            default: palette.softBlue,
            control: "#e3e1e8a8",
            declaration: palette.gray,
            import: palette.importPurple,
            modifier: "#5b6467",
            operator: palette.crimson,
        },
        variables: {
            default: "#e3e1e8c7",
            local: palette.steel,
            parameter: palette.paramPurple,
            property: palette.steel,
            global: palette.amber,
            other: palette.steel,
        },
        constants: {
            default: palette.cyan,
            numeric: palette.cyan,
            language: palette.cyan,
            userDefined: palette.steel,
        },
        functions: {
            default: "#f5e0dc",
            declaration: palette.seafoam,
            call: "#f5e0dc",
            method: palette.seafoam,
            builtin: palette.seafoam,
        },
        types: {
            default: palette.blush,
            primitive: palette.blush,
            class: palette.blush,
            interface: palette.ice,
            enum: palette.blush,
            typeParameter: palette.ice,
            namespace: palette.namespace,
        },
        punctuation: {
            default: palette.faintGray,
            definition: "#362942",
            delimiter: palette.faintGray,
            bracket: "#747277",
            accessor: palette.accessor,
        },
        meta: {
            default: palette.blush,
            decorator: palette.pink,
            macro: palette.pink,
            annotation: palette.pink,
            label: palette.softBlue,
        },
        storage: {
            default: "#5b6467",
            type: "#5b6467",
        },
    },
    languageOverrides: {
        python: {
            functions: {
                default: palette.yellow,
                declaration: palette.yellow,
                call: "#96d5ce",
            },
            storage: {
                default: "#fe90a0",
                type: "#fe90a0",
            },
        },
        go: {
            functions: {
                default: "#73bf9c",
            },
        },
    },
    // Semantic overrides for fine-tuning
    semantic: {
        comment: palette.muted,
        string: palette.wasabi,
        keyword: palette.softBlue,
        number: palette.cyan,
        regexp: palette.rose,
        operator: palette.crimson,
        namespace: palette.namespace,
        type: palette.gold,
        struct: palette.blush,
        class: palette.classColor,
        interface: palette.ice,
        enum: palette.blush,
        typeParameter: palette.ice,
        function: palette.seafoam,
        method: palette.seafoam,
        decorator: palette.pink,
        macro: palette.pink,
        variable: "#999eb8",
        parameter: palette.paramPurple,
        property: palette.blush,
        label: palette.softBlue,
    },
    // Modifier handlers
    modifiers: {
        [types_2.SemanticTokenModifier.documentation]: {
            global: { foreground: palette.muted, fontStyle: "italic" },
        },
        [types_2.SemanticTokenModifier.static]: {
            global: { fontStyle: "" },
        },
        [types_2.SemanticTokenModifier.deprecated]: {
            global: { fontStyle: "strikethrough" },
        },
        [types_2.SemanticTokenModifier.modification]: {
            global: { foreground: "#ffd014d4" },
        },
        [types_2.SemanticTokenModifier.async]: {
            transform: (color) => (0, color_1.default)(color).mix((0, color_1.default)(palette.softBlue), 0.1).hex(),
        },
    },
    ui: {
        backgrounds: {
            base: palette.background,
            surface: palette.gutterBg,
            raised: palette.suggestBg,
            overlay: palette.widgetBg,
        },
        foregrounds: {
            default: "#5f6384b8",
            muted: palette.charcoal,
            subtle: palette.inputBorder,
            accent: palette.cyan,
        },
        borders: {
            default: palette.widgetBorder,
            active: "#182356",
            subtle: palette.tabBorder,
        },
        accent: {
            primary: palette.cyan,
            primaryForeground: palette.brightGreen,
            secondary: palette.gold,
        },
        status: {
            error: palette.errorRed,
            warning: palette.warning,
            info: palette.info,
            success: palette.addedGreen,
        },
        selection: {
            background: palette.selection,
            backgroundInactive: palette.inactiveSelection,
            text: palette.white,
        },
        git: {
            added: palette.addedGreen,
            modified: palette.gitModified,
            deleted: palette.gitDeleted,
            untracked: palette.addedGreen,
            ignored: "#515670",
            conflict: palette.deletedRed,
        },
        overrides: {
            editor: {
                background: palette.background,
                foreground: palette.mist,
                lineHighlight: palette.lineHighlight,
                lineHighlightBorder: palette.lineHighlight,
                selectionHighlight: palette.selectionHighlight,
                wordHighlight: palette.wordHighlight,
                wordHighlightStrong: palette.wordHighlightStrong,
                findMatchHighlight: palette.findMatchHighlight,
                findMatch: palette.findMatch,
                rangeHighlight: "#2A244120",
            },
            editorGutter: {
                background: palette.gutterBg,
                modifiedBackground: "#E9C062",
                addedBackground: "#A8FF60",
                deletedBackground: "#CC6666",
                foldingControl: palette.charcoal,
            },
            editorLineNumber: {
                foreground: "#454148",
                activeForeground: "#9B8FB5",
            },
            activityBar: {
                background: palette.gutterBg,
                foreground: palette.steel,
                inactiveForeground: "#45414C",
                border: palette.gutterBg,
                badgeBackground: "#FF7A0000",
                badgeForeground: palette.brightGreen,
            },
            sideBar: {
                background: palette.gutterBg,
                foreground: "#827b90cf",
                border: palette.gutterBg,
                sectionHeaderBackground: "#0f0e1000",
                sectionHeaderForeground: "#e3e1e8b7",
            },
            panel: {
                background: palette.gutterBg,
                foreground: palette.steel,
                border: "#1a102b",
                titleActiveForeground: palette.steel,
                titleInactiveForeground: "#E0E0E0",
                titleActiveBorder: "#ffffff",
            },
            statusBar: {
                background: palette.gutterBg,
                foreground: "#5f6384b8",
                border: "#ffffff00",
                debuggingBackground: "#3fffbdf2",
                debuggingForeground: "#5b0092",
                noFolderBackground: "#0B0915",
                noFolderForeground: palette.muted,
            },
            tabs: {
                activeBackground: palette.tabBg,
                activeForeground: palette.steel,
                activeBorder: palette.tabActiveBorder,
                activeBorderTop: palette.tabActiveBorder,
                inactiveBackground: palette.gutterBg,
                inactiveForeground: palette.lightGray,
                hoverBackground: palette.tabBg,
                hoverForeground: palette.white,
                unfocusedActiveBackground: palette.tabBg,
                unfocusedActiveForeground: palette.muted,
                modifiedBorder: palette.gold,
            },
            list: {
                activeSelectionBackground: palette.listActive,
                activeSelectionForeground: "#E6E2D1",
                inactiveSelectionBackground: palette.suggestBg,
                inactiveSelectionForeground: "#E6E2D1",
                hoverBackground: "#2A244140",
                hoverForeground: "#E6E2D1",
                focusBackground: palette.listActive,
                focusForeground: "#E6E2D1",
                highlightForeground: palette.gold,
            },
            input: {
                background: palette.inputBg,
                foreground: "#ffffff99",
                border: palette.inputBorder,
                placeholderForeground: "#b5b5b545",
            },
            button: {
                background: palette.buttonBg,
                foreground: palette.buttonFg,
                hoverBackground: "#8d61ff2e",
                secondaryBackground: "#17161e54",
                secondaryForeground: "#d0d5dbba",
                secondaryHoverBackground: "#2b293754",
            },
            dropdown: {
                background: palette.suggestBg,
                foreground: "#E6E2D1",
                border: "#45414C",
                listBackground: palette.suggestBg,
            },
            badge: {
                background: "#0b0b19c9",
                foreground: "#82aaffd4",
            },
            scrollbar: {
                shadow: "#00000080",
                sliderBackground: "#45414C40",
                sliderHoverBackground: "#45414C80",
                sliderActiveBackground: "#45414C",
            },
            minimap: {
                background: palette.background,
                selectionHighlight: palette.selection,
                errorHighlight: palette.errorRed,
                warningHighlight: palette.warning,
                findMatchHighlight: palette.findMatch,
            },
            breadcrumb: {
                background: palette.background,
                foreground: "default",
                focusForeground: "#E6E2D1",
                activeSelectionForeground: palette.yellow,
            },
            terminal: {
                background: "#0f0d12",
                foreground: "#626274",
                cursorForeground: palette.white,
                selectionBackground: palette.selection,
                cursor: palette.white,
                ansiBlack: palette.ansiBlack,
                ansiRed: palette.ansiRed,
                ansiGreen: palette.brightGreen,
                ansiYellow: palette.yellow,
                ansiBlue: palette.lightBlue,
                ansiMagenta: palette.purple,
                ansiCyan: "#89DDFF",
                ansiWhite: palette.ansiWhite,
                ansiBrightBlack: palette.ansiBrightBlack,
                ansiBrightRed: palette.ansiBrightRed,
                ansiBrightGreen: "#D7F2A6",
                ansiBrightYellow: "#FFE082",
                ansiBrightBlue: "#9EC3FF",
                ansiBrightMagenta: "#DDA4FF",
                ansiBrightCyan: "#A3EEFF",
                ansiBrightWhite: "#FFFFFF",
            },
            notification: {
                background: palette.widgetBg,
                foreground: palette.white,
                border: "#45414C",
            },
            peekView: {
                editorBackground: "#0F0D1A",
                editorBorder: "#45414C",
                resultBackground: palette.suggestBg,
                resultSelectionBackground: palette.listActive,
                titleBackground: "#0B0915",
                titleForeground: "#E6E2D1",
            },
            diffEditor: {
                insertedTextBackground: "#09131588",
                removedTextBackground: "#2e060982",
                insertedLineBackground: "#09131588",
                removedLineBackground: "#1202049e",
                diagonalFill: "#45414C",
            },
            merge: {
                currentHeaderBackground: palette.suggestBg,
                incomingHeaderBackground: palette.suggestBg,
                commonHeaderBackground: palette.suggestBg,
                currentContentBackground: (0, utils_1.mix)(palette.addedGreen, palette.background, 0.3),
                incomingContentBackground: (0, utils_1.mix)(palette.gold, palette.background, 0.3),
                commonContentBackground: (0, utils_1.mix)("#45414C", palette.background, 0.3),
            },
        },
    },
};
exports.default = exports.apatheticOcean;
//# sourceMappingURL=apatheticOcean.js.map