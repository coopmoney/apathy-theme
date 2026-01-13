/**
 * Minted theme - converted to hierarchical slate-style format
 *
 * Since minted was flat, most values just become "default" values.
 * This preserves the exact same output while using the new system.
 */

import { make, UIComponents, type ThemeDefinition, type UserInterface } from "./types";
import { SemanticTokenModifier } from "../types";
import Color from "color";
import { alpha20, alpha50, darken, l10, lighten, mix, transparentize } from "./utils";

// ============================================================================
// 1. Color Palette
// ============================================================================

export enum palette {
  // Backgrounds
  // midnight = "#0d1117",
  midnight = "#0f0f15",
  midnight2 = "#0e0e15",
  midnightLight = "#161620",
  midnightDark = "#07070a",

  black = "#0f0f12",
  semiblack = "#0a0a0c",
  alphaBlack = "#0f0f1280",
  alphaWhite = "#e1e2e520",
  "#08080c" = "#08080c",

  // Grays & Neutrals
  charcoal = "#383d51",      // luminance ~62
  darkBlue = "#4B6672",      // luminance ~95
  bluegray = "#6372a1",      // luminance ~115
  "#527bb254" = "#527bb254", // luminance ~117
  taupe = "#7f7888cc",         // luminance ~131
  // taupe = "#888278ff",         // luminance ~131
  mist = "#767b95c2",        // luminance ~149
  steel = "#96a5b6",         // luminance ~163
  slate = "#9aa1c7",         // luminance ~163
  flatwhite = "#b1b1bffa",   // luminance ~179
  devwhite = "#afd1e9cf",    // luminance ~202
  white = "#e1e2e5",         // luminance ~226

  // Greens
  wasabi = "#c3dc8f",
  wasabi2 = "#82bfa6ff",
  seafoam = "#7ce6bc",

  // Blues & Cyans
  cyan = "#33b3cc",
  ice = "#b3e6de",

  // Purples
  lavender = "#998fe1cf",
  magenta = "#fc00ff",

  // Warm accents
  peach = "#ffb389",
  blush = "#e0a2b1",
  crimson = "#ca175d",
  gold = "#ffd014d4",

  // todo
  gray1 = "#5C5675",
  gray2 = "#3e3645d2",
  orange1 = "#FF7859",



  // experimental
  /* blue */
  "#1abdda" = "#1abdda",
  /** seafoam */
  "#88e6d6" = "#88e6d6",
  /** waaai */
  "#C3E88D" = "#C3E88D",
  /** peach */
  "#ffb389" = "#ffb389",
  /** crimson */
  "#F07178" = "#F07178",
  /** mint glow */
  "#6bffbfdb" = "#6bffbfdb",
  /** blush */
  "#ff9d9ddf" = "#ff9d9ddf",
  /** frost alpha */
  "#efadeab0" = "#efadeab0",
}

export type PaletteValue = `${palette}`;

export const v = (k: PaletteValue): PaletteValue => k;

// ============================================================================
// 2. Theme Definition
// ============================================================================
const tokens: ThemeDefinition["tokens"] = {
    source: palette.mist,
    comments: palette.charcoal,
    strings: make({
      default: palette.wasabi2,
      regex: palette.peach,
    }),
    operators: {
      default: palette.crimson,
    },

    literals: {
      default: palette.cyan,
      string: palette.wasabi2,
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
const ui: UserInterface<PaletteValue | string> = {
  backgrounds: {
    base: palette.midnight,
    darker: darken(palette.midnight, 0.2),
    surface: lighten(palette.midnight, 0.15),
    raised: lighten(palette.midnight, 1),
    overlay: lighten(palette.midnight, 1),
    codeBlock: palette["#08080c"],
  },
  foregrounds: {
    default: tokens.source,
    muted: alpha20(palette.mist),
    subtle: palette.charcoal,
    accent: palette.cyan,
    focused: lighten(palette.mist, 0.3),
  },
  borders: {
    default: lighten(palette.midnight, 0.4),
    active: palette.semiblack,
    subtle: lighten(palette.midnight, 0.2),
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
    background: mix(tokens.source, palette.midnight, 0.5),
    backgroundInactive: transparentize(palette.white, 0.1),
    text: palette.charcoal,
    backgroundActive: palette.darkBlue,
  },
  highlights: {
    wordBackground: mix(tokens.source, palette.midnight, 0.5),
    selectionBackgroundInactive: palette.charcoal,
    selectionBackgroundActive: mix(tokens.source, palette.midnight, 0.5),
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

const components: UIComponents<PaletteValue | string> = {
  editor: {
    background: darken(ui.backgrounds.base, 0.1),
    foreground: ui.foregrounds.default,
    lineHighlight: ui.highlights?.selectionBackgroundActive || ui.backgrounds.overlay,
    lineHighlightBorder: lighten(ui.backgrounds.base, 0.15),
    findMatchHighlightBackground: transparentize(mix(palette.lavender, ui.backgrounds.base, 0.8), 0.5),
    findRangeHighlightBackground: transparentize(mix(palette.lavender, ui.backgrounds.base, 0.8), 0.5),
    selectionHighlightBackground: transparentize(mix(palette.lavender, ui.backgrounds.base, 0.8), 0.5),
    lineNumberActiveForeground: palette.mist,
    lineNumberForeground: darken(palette.mist, 0.7),
    selectionBackground: mix(tokens.source, palette.midnight, 0.8),
    inactiveSelectionBackground: darken(palette.lavender, 0.8),
    findMatchBackground: mix(palette.midnight, palette['#527bb254'], 0.5),
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
    modifiedBackground: mix(palette.gold, ui.backgrounds.base, 0.6),
    addedBackground: mix(palette.seafoam, ui.backgrounds.base, 0.6),
    deletedBackground: mix(palette.crimson, ui.backgrounds.base, 0.6),
    foldingControl: mix(palette.steel, ui.backgrounds.base, 0.6),
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
    foreground: darken(palette.mist, 0.1),
    inactiveForeground: darken(palette.mist, 0.5),
    border: palette.semiblack,
    badgeBackground: palette.alphaBlack,
    badgeForeground: palette.wasabi,
  },
  sideBar: {
    background: ui.backgrounds.base,
    foreground: mix(palette.mist, palette.midnight, 0.2),
    border: ui.borders.default,
    sectionHeaderBackground: palette.midnight,
    sectionHeaderForeground: palette.mist,
  },
  panel: {
    background: darken(ui.backgrounds.base, 0.05),
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
    background: ui.backgrounds.surface,
    foreground: lighten(palette.mist, 0.4),
    placeholderForeground: darken(palette.mist, 0.2),
    border: ui.borders.subtle,
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
    border: darken(palette.steel, 0.2),
    listBackground: palette.midnight,
  },
  badge: {
    background: palette.midnight,
    foreground: palette.mist,
    border: lighten(palette.midnight, 0.2),
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
    findMatchHighlight: mix(ui.backgrounds.surface, palette.lavender, 0.5),
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
    border: mix(ui.backgrounds.darker, palette.steel, 0.1),
    cursorForeground: palette.mist,
    selectionBackground: l10(palette.midnight),
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
    currentContentBackground: mix(palette.seafoam, palette.midnight, 0.3),
    incomingContentBackground: palette.peach,
    commonContentBackground: mix(palette.steel, palette.midnight, 0.3),
  },
  chat: {
    background: ui.backgrounds.darker,
    foreground: ui.foregrounds.default,
    border: ui.borders.default,
    surface: ui.backgrounds.surface,
    requestBackground: mix(palette.peach, palette.midnight, 0.2),
    codeBlockBackground: ui.backgrounds.codeBlock,
  }
}

export const minted: ThemeDefinition = {
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
    string: mix(palette.wasabi2, ui.backgrounds.base, 0.3),
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
    function: mix(palette.seafoam, ui.backgrounds.base, 0.3),
    method: palette.seafoam,
    decorator: palette.peach,
    macro: palette.peach,
    variable: palette.slate,
    parameter: palette.slate,
    property: mix(palette.taupe, ui.backgrounds.base, 0.3),
    label: palette.blush,
  },

  // Modifier handlers
  modifiers: {
    [SemanticTokenModifier.documentation]: {
      global: { foreground: palette.charcoal, fontStyle: "italic" },
    },
    [SemanticTokenModifier.static]: {
      global: { fontStyle: "" },
    },
    [SemanticTokenModifier.deprecated]: {
      global: { fontStyle: "strikethrough" },
    },

    [SemanticTokenModifier.async]: {
      transform: (color: string) => Color(color).mix(Color(palette.lavender), 0.1).hex(),
    },
    [SemanticTokenModifier.declaration]: {
      transform: c => mix(c, ui.foregrounds.default, 0.5),
    }
  },
  ui: {
    ...ui,
    overrides: components
  }
};

export default minted;

// rgb(144 230 201 / 95%)
