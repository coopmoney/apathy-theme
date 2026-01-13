/**
 * Slate theme - using hierarchical slate-style format
 *
 * This theme demonstrates the power of the cascade -
 * setting defaults and then overriding specific values.
 */

import { make, type ThemeDefinition, ColorPalette, UserInterface, UIComponents } from "./types";
import { SemanticTokenModifier } from "../types";
import { alpha20, darken, l10, lighten, mix, transparentize } from './utils';
import Color from 'color';

// ============================================================================
// 1. Color Palette
// ============================================================================

const palette = {
  // Backgrounds
  "#0e0e15": "#0e0e15",

  // Grays & Neutrals
  "#d1d3d9": "#d1d3d9",   // bright white
  "#a7a4af": "#a7a4af",   // muted white
  "#f5e0dc": "#f5e0dc",   // vanilla cream
  "#91aac0": "#91aac0",   // dusty blue
  "#829297": "#829297",   // sage gray
  "#767a92": "#767a92",   // storm gray
  "#527bb254": "#527bb254", // semi-transparent blue

  // Greens
  "#b1d36d": "#b1d36d",   // celery
  "#73bf9c": "#73bf9c",   // mint

  // Purples
  "#8564d8": "#8564d8",   // grape
  "#cba6f7": "#cba6f7",   // lavender

  // Accents
  "#33b3cc": "#33b3cc",   // cyan
  "#ffcb6b": "#ffcb6b",   // gold
  "#e0a2d3": "#e0a2d3",   // orchid
  "#FF6188": "#FF6188",   // watermelon
  "#E60063": "#E60063",   // crimson



  // Ordered by lightness (darkest to lightest)
  black: "#09090f",
  midnight: "#0e0e15",
  midnightLight: "#1a1a24",
  dark1: "#252531",
  charcoal: "#2c2c3c",
  semiblack: "#333344",
  alphaWhite: "rgba(209, 211, 217, 0.1)",
  alphaBlue: "#527bb254",

  crimson: "#E60063",
  grape: "#8564d8",
  cyan: "#33b3cc",
  mint: "#73bf9c",
  watermelon: "#FF6188",
  stormGray: "#767a92",
  sageGray: "#829297",
  dustyBlue: "#91aac0",
  mutedwhite: "#a7a4af",
  celery: "#b1d36d",
  lavender: "#cba6f7",
  orchid: "#e0a2d3",
  brightWhite: "#d1d3d9",
  gold: "#ffcb6b",
  vanillaCream: "#f5e0dc",

  // Additional colors
  peach: "#ffb86c",
  seafoam: "#73bf9c",
  steel: "#5c6370",
  mist: "#a7a4af",
  ice: "#89ddff",
  white: "#d1d3d9",
  flatwhite: "#ffffff",
} ;


type CV = string;
export const WHITE: CV = "#d1d3d9";
export const MIDNIGHT: CV = "#0e0e15";
export const MUTEDWHITE: CV = "#a7a4af";
export const VANILLACREAM: CV = "#f5e0dc";
export const DUSTYBLUE: CV = "#91aac0";
export const SAGEGRAY: CV = "#829297";
export const STORMGRAY: CV = "#767a92";
export const CELERY: CV = "#b1d36d";
export const MINT: CV = "#73bf9c";
export const GRAPE: CV = "#8564d8";
export const LAVENDER: CV = "#cba6f7";
export const CYAN: CV = "#33b3cc";
export const GOLD: CV = "#ffcb6b";
export const ORCHID: CV = "#e0a2d3";
export const WATERMELON: CV = "#FF6188";
export const CRIMSON: CV = "#E60063";


// ============================================================================
// 2. Theme Definition
// ============================================================================
// const tokens: ThemeDefinition["tokens"] = {
//     source: palette["#a7a4af"],
//     comments: palette["#829297"],

//     // Operators - all use crimson, but we COULD differentiate
//     operators: {
//       default: palette["#E60063"],
//       arithmetic: palette["#E60063"],  // +, -, *, /
//       assignment: palette["#E60063"],  // =, +=, -=
//       logical: palette["#E60063"],     // &&, ||, !
//       wordlike: palette["#E60063"],    // and, or, not
//     },

//     // Literals - different colors for different types
//     literals: {
//       default: palette["#33b3cc"],
//       string: palette["#b1d36d"],
//       number: palette["#ffcb6b"],
//       boolean: palette["#33b3cc"],
//       null: palette["#8564d8"],
//       undefined: palette["#8564d8"],
//       regex: palette["#FF6188"],
//     },

//     // Keywords - different shades for different purposes
//     keywords: {
//       default: palette["#767a92"],
//       import: palette["#e0a2d3"],
//       // control, declaration inherit from default
//     },

//     variables: {
//       default: palette["#a7a4af"],
//       parameter: palette["#a7a4af"],
//       property: palette["#e0a2d3"],
//     },

//     constants: {
//       default: palette["#91aac0"],
//       numeric: palette["#33b3cc"],
//     },

//     functions: {
//       default: palette["#73bf9c"],
//       method: palette["#73bf9c"],
//     },

//     types: {
//       default: palette["#cba6f7"],
//       class: palette["#e0a2d3"],
//       interface: palette["#cba6f7"],
//       enum: palette["#cba6f7"],
//       typeParameter: palette["#cba6f7"],
//       namespace: palette["#a7a4af"],
//     },

//     punctuation: {
//       default: palette["#767a92"],
//     },

//     meta: {
//       default: palette["#767a92"],
//       decorator: palette["#ffcb6b"],
//       macro: palette["#ffcb6b"],
//       label: palette["#e0a2d3"],
//     },
//     storage: {
//       default: palette["#767a92"],
//     },
//     strings: {
//       default: palette["#b1d36d"],
//     },
//   };

// const ui: ThemeDefinition["ui"] = {
//   foregrounds: {
//     default: palette["#a7a4af"],
//     muted: palette["#829297"],
//     subtle: palette["#767a92"],
//     accent: palette["#33b3cc"],
//     focused: palette["#f5e0dc"],
//   },
//   backgrounds: {
//     base: palette["#0e0e15"],
//     surface: "#1a1a24",
//     overlay: "#252531",
//     raised: "#2c2c3c",
//     darker: "#09090f",
//     codeBlock: "#1a1a24",
//   },
//   borders: {
//     default: "#333344",
//     active: "#45455a",
//     subtle: "#21212e",
//     separator: "#333344",
//   },
//   accent: {
//     primary: palette["#e0a2d3"],
//     secondary: palette["#8564d8"],
//     primaryForeground: palette["#f5e0dc"],
//   },
//   status: {
//     error: "#FF6188",
//     warning: "#ffcb6b",
//     success: "#73bf9c",
//     info: "#33b3cc",
//   },
//   selection: {
//     background: "#333344",
//     backgroundInactive: "#252531",
//     text: palette["#f5e0dc"],
//   },
//   git: {
//     added: "#73bf9c",
//     modified: "#33b3cc",
//     deleted: "#FF6188",
//     untracked: "#45465a",
//     ignored: "#21212e",
//     conflict: "#E60063",
//   }
// };

export const v = (k: string): k is keyof typeof palette => k in palette;

// ============================================================================
// 2. Theme Definition
// ============================================================================
const tokens: ThemeDefinition["tokens"] = {
    source: palette.mutedwhite,
    comments: mix(palette['#829297'], palette.midnight, 0.5),
    strings: make({
      default: palette.celery,
      regex: palette.crimson,
    }),
    operators: {
      default: CRIMSON,
    },

    literals: {
      default: palette.cyan,
      string: palette.celery,
      number: palette.cyan,
      boolean: palette.cyan,
      null: palette.lavender,
      undefined: palette.lavender,
      regex: palette.crimson,
    },

    keywords: {
      default: mix(palette.mutedwhite, palette.cyan, 0.3),
      operator: CRIMSON,
    },

    variables: {
      default: palette["#a7a4af"],
      parameter: palette["#a7a4af"],
      property: palette["#e0a2d3"],
    },

    constants: {
      default: palette["#91aac0"],
      numeric: palette["#33b3cc"],
    },

    functions: {
      default: palette["#73bf9c"],
      method: palette["#73bf9c"],
    },

    types: {
      default: palette["#cba6f7"],
      class: palette["#e0a2d3"],
      interface: palette["#cba6f7"],
      enum: palette["#cba6f7"],
      typeParameter: palette["#cba6f7"],
      namespace: palette["#a7a4af"],
    },

    punctuation: {
      default: palette["#767a92"],
    },

    meta: {
      default: palette["#767a92"],
      decorator: palette["#ffcb6b"],
      macro: palette["#ffcb6b"],
      label: palette["#e0a2d3"],
    },
    storage: {
      default: palette["#8564d8"],
      type: palette["#8564d8"],
    },
  };

const ui: UserInterface<keyof typeof palette | string> = {
  backgrounds: {
    base: palette.midnight,
    darker: palette.black,
    surface: palette.midnightLight,
    raised: palette.semiblack,
    overlay: mix(palette.semiblack, palette.grape, 0.2),
    codeBlock: palette.midnightLight,
  },
  foregrounds: {
    default: palette.mutedwhite,
    muted: palette.stormGray,
    subtle: palette.charcoal,
    accent: palette.peach,
    focused: palette.vanillaCream,
  },
  borders: {
    default: palette.sageGray,
    active: palette.dustyBlue,
    subtle: palette.black,
    separator: palette.dark1,
  },
  accent: {
    primary: palette.dustyBlue,
    primaryForeground: palette.cyan,
    secondary: palette.lavender,
  },
  status: {
    error: palette.crimson,
    warning: palette.gold,
    info: palette.cyan,
    success: palette.celery,
  },
  selection: {
    background: mix(tokens.source, palette.midnight, 0.5),
    backgroundInactive: transparentize(palette.mutedwhite, 0.1),
    text: palette.charcoal,
    backgroundActive: lighten(palette.cyan, 0.4),
  },
  highlights: {
    wordBackground: mix(tokens.source, palette.midnight, 0.5),
    selectionBackgroundInactive: palette.charcoal,
    selectionBackgroundActive: mix(tokens.source, palette.midnight, 0.5),
  },
  git: {
    // added: mix(palette.seafoam, palette.midnight, 0.5),
    added: palette.celery,
    // modified: mix(palette.peach, palette.midnight, 0.2),
    modified: palette.gold,
    deleted: palette.crimson,
    untracked: palette.alphaWhite,
    ignored: palette.dark1,
    conflict: palette.crimson,
  }
};

const components: UIComponents = {
  editor: {
    background: ui.backgrounds.base,
    foreground: ui.foregrounds.default,
    lineHighlight: ui.highlights?.selectionBackgroundActive || ui.backgrounds.overlay,
    lineHighlightBorder: palette.midnight,
    inactiveSelectionBackground: transparentize(mix(palette.cyan, palette.midnight, 0.9), 0.7),
    selectionBackground: l10(palette.midnight),
    selectionHighlightBackground: transparentize(mix(palette.cyan, palette.midnight, 0.95), 0.5),
    findRangeHighlightBackground: transparentize(mix(palette.grape, palette.midnight, 0.2), 0.5),
    findMatchHighlightBackground: transparentize(mix(palette.grape, palette.midnight, 0.8), 0.5),
    lineNumberActiveForeground: palette.mist,
    lineNumberForeground: palette.dark1,
    findMatchBackground: transparentize(mix(palette.grape, palette.midnight, 0.9), 0.7),
    // errorHighlight: palette.crimson,
    // warningHighlight: palette.peach,
    // selectionHighlight: l10(palette.midnight),
    // wordHighlight: palette.charcoal,
    // wordHighlightStrong: DUSTYBLUE,
    // findMatchHighlight: mix(palette.lavender, palette.midnight, 0.5),
    // findMatch: palette.lavender,
    // rangeHighlight: l10(palette.midnight),
  },
  editorGutter: {
    background: ui.backgrounds.base,
    modifiedBackground: palette.peach,
    addedBackground: palette.seafoam,
    deletedBackground: palette.crimson,
    foldingControl: palette.steel,
  },
  editorLineNumber: {
    foreground: palette.charcoal,
    activeForeground: palette.mist,
  },
  activityBar: {
    background: palette.black,
    foreground: darken(palette.mist, 0.5),
    inactiveForeground: palette.mist,
    border: palette.semiblack,
    badgeBackground: palette.peach,
    badgeForeground: palette.black,
  },
  editorWidget: {
    background: ui.backgrounds.overlay,
    foreground: ui.foregrounds.default,
    border: ui.borders.subtle,
  },
  sideBar: {
    background: ui.backgrounds.surface,
    foreground: palette.mist,
    border: palette.semiblack,
    sectionHeaderBackground: palette.midnight,
    sectionHeaderForeground: palette.mist,
  },
  titleBar: {
    activeBackground: ui.backgrounds.base,
    activeForeground: palette.mist,
    inactiveBackground: ui.backgrounds.base,
    inactiveForeground: palette.charcoal,
  },
  panel: {
    background: ui.backgrounds.surface,
    foreground: palette.mist,
    border: palette.semiblack,
    titleActiveForeground: palette.mist,
    titleInactiveForeground: palette.charcoal,
    titleActiveBorder: palette.steel,
  },
  statusBar: {
    background: ui.backgrounds.surface,
    foreground: palette.mist,
    border: palette.semiblack,
    debuggingBackground: palette.seafoam,
    debuggingForeground: palette.crimson,
    noFolderBackground: palette.midnight,
    noFolderForeground: palette.mist,
  },
  tabs: {
    activeBackground: ui.backgrounds.surface,
    activeForeground: palette.mist,
    activeBorder: palette["#527bb254"],
    activeBorderTop: palette.steel,
    inactiveBackground: ui.backgrounds.base,
    inactiveForeground: palette.mist,
    hoverBackground: palette.midnight,
    hoverForeground: palette.mist,
    unfocusedActiveBackground: palette.midnight,
    unfocusedActiveForeground: palette.mist,
    modifiedBorder: palette.peach,
  },
  list: {
    activeSelectionBackground: ui.backgrounds.surface,
    activeSelectionForeground: palette.mist,
    inactiveSelectionBackground: ui.backgrounds.surface,
    inactiveSelectionForeground: palette.mist,
    hoverBackground: ui.backgrounds.overlay,
    hoverForeground: palette.mist,
    focusBackground: ui.backgrounds.surface,
    focusForeground: palette.mist,
    highlightForeground: palette.steel,
  },
  input: {
    background: palette.midnightLight,
    foreground: lighten(palette.mist, 0.1),        border: palette.steel,
    placeholderForeground: darken(palette.mist, 0.2),
  },
  button: {
    background: palette.alphaBlue,
    foreground: palette.mist,
    hoverBackground: palette.midnight,
    secondaryBackground: palette.midnight,
    secondaryForeground: palette.mist,
    secondaryHoverBackground: palette.midnight,
  },
  dropdown: {
    background: palette.alphaBlue,
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
    background: palette.midnight,
    foreground: palette.mist,
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
    border: palette.midnightLight,
  },
  peekView: {
    editorBackground: palette.midnight,
    editorBorder: palette.steel,
    resultBackground: palette.midnight,
    resultSelectionBackground: palette.midnight,
    titleBackground: ui.backgrounds.surface,
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
}

export const slate: ThemeDefinition = {
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
        default: palette.dustyBlue,
        property: palette.stormGray
      }
    }
  },

  // Semantic overrides for fine-tuning
  semantic: {
    comment: palette.charcoal,
    string: palette.celery,
    keyword: palette.lavender,
    number: palette.cyan,
    regexp: palette.peach,
    operator: palette.crimson,
    namespace: palette.ice,
    type: palette.ice,
    struct: palette.ice,
    class: palette.ice,
    interface: palette.ice,
    enum: palette.dustyBlue,
    typeParameter: palette.ice,
    function: palette.seafoam,
    method: palette.seafoam,
    decorator: palette.peach,
    macro: palette.peach,
    variable: palette.vanillaCream,
    parameter: palette.dustyBlue,
    property: palette.stormGray,
    label: palette.grape,
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
  },
  ui: {
    ...ui,
    overrides: components
  }
};

export default slate;

// rgb(144 230 201 / 95%)
