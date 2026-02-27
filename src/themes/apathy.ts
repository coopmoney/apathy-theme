/**
 * Apathy theme - converted to hierarchical slate-style format
 *
 * A dark, muted theme with warm accents focused on readability.
 */

import { make, type ThemeDefinition } from "./types";
import { SemanticTokenModifier } from "../types";
import { Color } from "@/core/color";
import { mix } from "./utils";

// ============================================================================
// 1. Color Palette
// ============================================================================

export enum palette {
  // Backgrounds
  background = "#0e0b13",
  editorPaneBackground = "#0e0a12",
  gutterBg = "#0c0a10",
  panelBg = "#0e0b13",
  tabBg = "#0f0e10",
  tabHeaderBg = "#0d0b17",

  // Grays & Neutrals
  white = "#e3e1e8e4",
  source = "#e3e1e8c8",
  muted = "#4D4A56",
  steel = "#829297",
  slate = "#9B8FB5",
  charcoal = "#454148",
  gray = "#7d7a8b",
  lightGray = "#B5B5B5",
  faintGray = "#74727794",
  editorFg = "#6e6a7b",
  uiForeground = "#cbdbe0b3",

  // Blues & Cyans
  cyan = "#33b3cc",
  ice = "#93e3db",
  seafoam = "#95d4ca",
  softBlue = "#afd1e9cf",
  paleBlue = "#78DCE8",
  lightBlue = "#82AAFF",
  exportBlue = "#91aac0",
  importPurple = "#d09bd2",

  // Greens
  wasabi = "#b1d36d",
  mint = "#A1EFE4",
  lime = "#A6E22E",
  brightGreen = "#C3E88D",
  addedGreen = "#47cf7ec9",
  gitInserted = "#A7DA1E",
  jsonValue = "#afe641",
  yamlValue = "#8dc781",

  // Warm accents
  gold = "#ffb547",
  amber = "#ffa114",
  yellow = "#FFCB6B",
  yellowNote = "#E6D86B",
  peach = "#FFD866",
  orange = "#FF7A00",
  gitModified = "#ffd014d4",
  gitModifiedAlt = "#F7B83D",

  // Reds & Pinks
  crimson = "#e60063",
  rose = "#FF6188",
  blush = "#e0a2b1",
  pink = "#f184bce6",
  coral = "#FF7859",
  errorRed = "#b70b24",
  gitDeleted = "#E61F44",
  deletedRed = "#F92672",
  pythonDef = "#fe90a0",

  // Purples
  lavender = "#998fe1cf",
  purple = "#C792EA",
  lilac = "#C574DD",
  paramPurple = "#8e8db3",
  paramValue = "#c3c1d3",
  accessor = "#7a73cc",

  // Browns
  taupe = "#8a7b5c",
  olive = "#6c6048",
  darkOlive = "#5c4c42",

  // Status
  warning = "#E6986B",
  info = "#78DCE8",

  // UI Elements
  selection = "#2d22476b",
  selectionHighlight = "#39324952",
  inactiveSelection = "#2d22473d",
  wordHighlight = "#383248a5",
  wordHighlightStrong = "#52486cab",
  findMatch = "#2a2540dc",
  findMatchHighlight = "#18142ddc",
  lineHighlight = "#1b162994",
  indentGuide = "#292533dc",
  indentGuideActive = "#2b2a2ddb",
  whitespace = "#272636",
  ruler = "#b8b1d222",
  widgetBg = "#0a0610",
  widgetBorder = "#45414C",
  suggestBg = "#1B1629",
  listActive = "#2A2441",
  focusBorder = "#a099ae14",
  tabBorder = "#212131",
  tabActiveBorder = "#d0cfd3",
  buttonBg = "#443e5040",
  buttonFg = "#acecff7d",
  buttonBorder = "#60537836",
  inputBg = "#110f12",
  inputBorder = "#26242a",

  // Misc
  tagName = "#DEDEDE",
  cssProperty = "#4b6672",
  cssPropertyValue = "#d0cfd3",
  cssSelector = "#e5e3e8",
  bracketPunctuation = "#747277",
  jsBraces = "#5b6567b0",
  jsFunctionVar = "#a3c1c7",
  jsFunctionCall = "#DCDCAA",
  jsMemberExpr = "#E0E0E0",
  markdownHeading = "#79e3bd",
  markdownBold = "#5983a2",
  markdownLink = "#78DCE8",
  codeTagNotation = "#4d7461",
  yamlSource = "#cfccd7e3",
  controlConditional = "#e3e1e8a8",

  // Terminal ANSI
  ansiBlack = "#2A273F",
  ansiBrightBlack = "#3B3853",
  ansiRed = "#F07178",
  ansiBrightRed = "#FF5370",
}

export type PaletteValue = `${palette}`;

export const v = (k: PaletteValue): PaletteValue => k;

// ============================================================================
// 2. Theme Definition
// ============================================================================

export const apathy: ThemeDefinition = {
  name: "Apathy",
  type: "dark",
  palette,
  background: palette.background,
  semanticHighlighting: true,

  tokens: {
    source: palette.source,
    comments: palette.muted,
    strings: make({
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
      control: palette.controlConditional,
      declaration: palette.gray,
      import: palette.importPurple,
      modifier: palette.steel,
      operator: palette.crimson,
    },

    variables: {
      default: palette.white,
      local: palette.white,
      parameter: palette.paramPurple,
      property: palette.white,
      global: palette.amber,
      other: palette.white,
    },

    constants: {
      default: palette.cyan,
      numeric: palette.cyan,
      language: palette.cyan,
      userDefined: palette.white,
    },

    functions: {
      default: palette.gold,
      declaration: palette.seafoam,
      call: palette.gold,
      method: palette.gold,
      builtin: palette.gold,
    },

    types: {
      default: palette.gold,
      primitive: palette.gold,
      class: palette.gold,
      interface: palette.ice,
      enum: palette.gold,
      typeParameter: palette.ice,
      namespace: palette.gold,
    },

    punctuation: {
      default: palette.faintGray,
      definition: palette.faintGray,
      delimiter: palette.faintGray,
      bracket: palette.bracketPunctuation,
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
      default: palette.steel,
      type: palette.steel,
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
        default: palette.pythonDef,
        type: palette.pythonDef,
      },
    },
    go: {
      functions: {
        default: palette.seafoam,
      },
    },
    javascript: {
      functions: {
        default: palette.jsFunctionCall,
        declaration: palette.seafoam,
        call: palette.jsFunctionCall,
      },
    },
    typescript: {
      functions: {
        default: palette.jsFunctionCall,
        declaration: palette.seafoam,
        call: palette.jsFunctionCall,
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
    namespace: palette.gold,
    type: palette.gold,
    struct: palette.gold,
    class: palette.gold,
    interface: palette.ice,
    enum: palette.gold,
    typeParameter: palette.ice,
    function: palette.gold,
    method: palette.gold,
    decorator: palette.pink,
    macro: palette.pink,
    variable: palette.white,
    parameter: palette.paramPurple,
    property: palette.white,
    label: palette.softBlue,
  },

  // Modifier handlers
  modifiers: {
    [SemanticTokenModifier.documentation]: {
      global: { foreground: palette.muted, fontStyle: "italic" },
    },
    [SemanticTokenModifier.static]: {
      global: { fontStyle: "bold" },
    },
    [SemanticTokenModifier.deprecated]: {
      global: { fontStyle: "strikethrough" },
    },
    [SemanticTokenModifier.modification]: {
      global: { foreground: palette.gitModified },
    },
    [SemanticTokenModifier.async]: {
      transform: (color: string) => new Color(color).mix(palette.softBlue, 0.1),
    },
  },

  ui: {
    backgrounds: {
      base: palette.background,
      surface: palette.background,
      raised: palette.suggestBg,
      overlay: palette.widgetBg,
    },
    foregrounds: {
      default: palette.uiForeground,
      muted: palette.charcoal,
      subtle: palette.inputBorder,
      accent: palette.cyan,
    },
    borders: {
      default: palette.widgetBorder,
      active: palette.tabActiveBorder,
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
      deleted: palette.deletedRed,
      untracked: "#e1d9e79e",
      ignored: "#3b4940",
      conflict: palette.orange,
    },
    overrides: {
      editor: {
        background: palette.background,
        foreground: palette.editorFg,
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
        foreground: palette.charcoal,
        activeForeground: palette.slate,
      },
      activityBar: {
        background: palette.background,
        foreground: palette.white,
        inactiveForeground: "#e0dfe127",
        border: palette.background,
        badgeBackground: "#FF7A0000",
        badgeForeground: palette.brightGreen,
      },
      sideBar: {
        background: palette.background,
        foreground: "#827b90cf",
        border: palette.background,
        sectionHeaderBackground: "#0f0e1000",
        sectionHeaderForeground: "#e3e1e8b7",
      },
      panel: {
        background: palette.background,
        foreground: palette.white,
        border: "#352b4655",
        titleActiveForeground: "#e3e1e891",
        titleInactiveForeground: "#e0e0e069",
        titleActiveBorder: "#ffffff",
      },
      statusBar: {
        background: palette.background,
        foreground: "#7c7c7c8a",
        border: palette.background,
        debuggingBackground: "#1f1a38",
        debuggingForeground: "#bd5e2b",
        noFolderBackground: "#0B0915",
        noFolderForeground: palette.muted,
      },
      tabs: {
        activeBackground: palette.tabBg,
        activeForeground: "#e3e1e894",
        activeBorder: palette.tabActiveBorder,
        activeBorderTop: palette.tabActiveBorder,
        inactiveBackground: palette.tabBg,
        inactiveForeground: "#b5b5b59e",
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
        foreground: "#E6E2D1",
        border: palette.inputBorder,
        placeholderForeground: "#b5b5b545",
      },
      button: {
        background: palette.buttonBg,
        foreground: palette.buttonFg,
        hoverBackground: "#443e5053",
        secondaryBackground: "#17161e54",
        secondaryForeground: "#d0d5db83",
        secondaryHoverBackground: "#2b293754",
      },
      dropdown: {
        background: palette.suggestBg,
        foreground: "#E6E2D1",
        border: palette.widgetBorder,
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
        sliderActiveBackground: palette.widgetBorder,
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
        foreground: "#e0e0e03c",
        focusForeground: "#E6E2D1",
        activeSelectionForeground: palette.yellow,
      },
      terminal: {
        background: palette.background,
        foreground: "#dddde8dc",
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
        ansiWhite: "#ECEFF4",
        ansiBrightBlack: palette.ansiBrightBlack,
        ansiBrightRed: palette.ansiBrightRed,
        ansiBrightGreen: palette.brightGreen,
        ansiBrightYellow: palette.yellow,
        ansiBrightBlue: palette.lightBlue,
        ansiBrightMagenta: palette.purple,
        ansiBrightCyan: "#89DDFF",
        ansiBrightWhite: "#FFFFFF",
      },
      notification: {
        background: palette.widgetBg,
        foreground: palette.white,
        border: palette.widgetBorder,
      },
      peekView: {
        editorBackground: "#0F0D1A",
        editorBorder: palette.widgetBorder,
        resultBackground: palette.suggestBg,
        resultSelectionBackground: palette.listActive,
        titleBackground: "#0B0915",
        titleForeground: "#E6E2D1",
      },
      diffEditor: {
        // insertedTextBackground: "#13232080",
        insertedTextBackground: "#1b373473",
        removedTextBackground: "#f9267213",
        // insertedLineBackground: "#132320bd",
        insertedLineBackground: "#1b373473",
        removedLineBackground: "#3c152578",
        diagonalFill: palette.widgetBorder,
      },
      merge: {
        currentHeaderBackground: palette.suggestBg,
        incomingHeaderBackground: palette.suggestBg,
        commonHeaderBackground: palette.suggestBg,
        currentContentBackground: mix(palette.addedGreen, palette.background, 0.3),
        incomingContentBackground: mix(palette.gold, palette.background, 0.3),
        commonContentBackground: mix(palette.widgetBorder, palette.background, 0.3),
      },
    },
  },

  // Extra VS Code colors not covered by structured UI
  extraColors: {
    // Focus border override (use focusBorder not borders.active)
    "focusBorder": palette.focusBorder,

    // Editor extras
    "editorPane.background": palette.editorPaneBackground,
    "editorCursor.foreground": "#da4c51",
    "editor.selectionBackground": palette.selection,
    "editor.inactiveSelectionBackground": palette.inactiveSelection,

    // Editor hints
    "editorHint.foreground": "#404970",
    "editorHint.border": palette.findMatch,
    "editorInlayHint.background": palette.findMatch,
    "editorInlayHint.foreground": "#404970",
    "editorInlayHint.parameterBackground": "#2a5b7edc",
    "editorInlayHint.parameterForeground": "#404970",
    "editorInlayHint.typeBackground": palette.findMatch,
    "editorInlayHint.typeForeground": "#404970",

    // Editor indentation
    "editorIndentGuide.background1": palette.indentGuide,
    "editorIndentGuide.activeBackground1": palette.indentGuideActive,
    "editorWhitespace.foreground": palette.whitespace,
    "editorRuler.foreground": palette.ruler,

    // Editor widgets
    "editorWidget.background": palette.widgetBg,
    "editorWidget.border": palette.widgetBorder,
    "editorSuggestWidget.background": palette.suggestBg,
    "editorSuggestWidget.border": palette.widgetBorder,
    "editorSuggestWidget.foreground": "#E6E2D1",
    "editorSuggestWidget.selectedBackground": palette.listActive,

    // Sidebar extras
    "sideBarTitle.foreground": "#e3e1e880",

    // Title bar
    "titleBar.activeBackground": palette.background,
    "titleBar.activeForeground": "#e3e1e887",
    "titleBar.inactiveBackground": palette.background,
    "titleBar.inactiveForeground": "#8d8d8d90",

    // Tabs extras
    "tab.border": palette.tabBorder,
    "editorGroupHeader.tabsBackground": palette.tabHeaderBg,

    // Sticky scroll
    "editorStickyScroll.background": "#0f0b1581",
    "editorStickyScroll.border": "#10091814",
    "editorStickyScroll.shadow": "#00000080",

    // Focus borders
    "focusBorder": palette.focusBorder,
    "gauge.border": palette.focusBorder,
    "sash.hoverBorder": palette.focusBorder,
    "editorGroup.border": palette.focusBorder,

    // Tree & separators
    "tree.indentGuidesStroke": palette.widgetBorder,
    "textSeparator.foreground": "#45414c6b",
    "contrastBorder": palette.focusBorder,

    // Progress bar (use brightGreen C3E88D per original theme)
    "progressBar.background": palette.brightGreen,

    // Menu
    "menu.background": palette.suggestBg,
    "menu.foreground": palette.white,
    "menu.selectionBackground": palette.listActive,
    "menu.selectionForeground": "#E6E2D1",
    "menu.separatorBackground": palette.widgetBorder,

    // Button extras
    "button.border": palette.buttonBorder,
    "button.separator": "#6053786e",

    // Peek view extras
    "peekViewEditor.matchHighlightBackground": "#CC850040",
    "peekViewResult.matchHighlightBackground": "#CC850040",
    "peekViewTitleDescription.foreground": palette.lightGray,

    // Debug console
    "debugConsole.sourceForeground": "#e5e3e8",
    "debugConsole.infoForeground": palette.paleBlue,
    "debugConsole.errorForeground": "#ff6161",
    "debugConsole.warningForeground": palette.yellow,
    "editorError.background": "#52000045",
    "list.errorForeground": "#a84e4e",

    // Settings
    "settings.headerForeground": "#d1deea75",
  },
};

export default apathy;