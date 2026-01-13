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
  midnightLight = "#161620",
  midnightDark = "#07070a",

  black = "#0f0f12",
  semiblack = "#0a0a0c",
  alphaBlack = "#0f0f1280",
  alphaWhite = "#e1e2e520",
  "#08080c" = "#08080c",

  // Grays & Neutrals
  white = "#e1e2e5",
  flatwhite = "#b1b1bffa",
  steel = "#96a5b6",
  mist = "#8e93b0c2",
  charcoal = "#383d51",
  slate = "#9aa1c7",
  taupe = "#8a8276",
  bluegray = "#6372a1",
  devwhite = "#afd1e9cf",
  "#527bb254" = "#527bb254",
  darkBlue = "#4B6672",

  // Greens
  wasabi = "#c3dc8f",
  wasabi2 = "#98bf82",
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
  gray2 = "#362942",
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

const ui: UserInterface = {
  backgrounds: {
    base: palette.midnight,
    darker: darken(palette.midnight, 0.5),
    surface: lighten(palette.midnight, 0.15),
    raised: lighten(palette.midnight, 1),
    overlay: lighten(palette.midnight, 1),
    codeBlock: palette["#08080c"],
  },
  foregrounds: {
    default: palette.mist,
    muted: alpha20(palette.mist),
    subtle: palette.charcoal,
    accent: palette.cyan,
    focused: lighten(palette.mist, 0.3),
  },
  borders: {
    default: palette.semiblack,
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
    background: palette.charcoal,
    backgroundInactive: transparentize(palette.white, 0.1),
    text: palette.charcoal,
    backgroundActive: palette.darkBlue,
  },
  highlights: {
    wordBackground: palette.charcoal,
    selectionBackgroundInactive: palette.charcoal,
    selectionBackgroundActive: alpha50(palette.steel),
  },
  git: {
    // added: mix(palette.seafoam, palette.midnight, 0.5),
    added: palette.seafoam,
    // modified: mix(palette.peach, palette.midnight, 0.2),
    modified: palette.peach,
    deleted: palette.crimson,
    untracked: palette.mist,
    ignored: palette.mist,
    conflict: palette.crimson,
  }
};

const components: UIComponents = {
  editor: {
    background: palette.midnight,
    foreground: palette.mist,
    lineHighlight: palette.midnight,
    lineHighlightBorder: palette.midnight,
    selectionHighlight: l10(palette.midnight),
    wordHighlight: palette.charcoal,
    wordHighlightStrong: palette.white,
    findMatchHighlight: mix(palette.lavender, palette.midnight, 0.5),
    findMatch: palette.lavender,
    rangeHighlight: l10(palette.midnight),
  },
  editorGutter: {
    background: palette.midnight,
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
    background: palette.midnight,
    foreground: palette.mist,
    inactiveForeground: palette.mist,
    border: palette.steel,
    badgeBackground: palette.peach,
    badgeForeground: palette.seafoam,
  },
  sideBar: {
    background: palette.midnight,
    foreground: palette.mist,
    border: lighten(palette.midnight, 0.1),
    sectionHeaderBackground: palette.midnight,
    sectionHeaderForeground: palette.mist,
  },
  panel: {
    background: palette.midnight,
    foreground: palette.mist,
    border: lighten(palette.midnight, 0.1),
    titleActiveForeground: palette.mist,
    titleInactiveForeground: palette.mist,
    titleActiveBorder: palette.steel,
  },
  statusBar: {
    background: palette.midnight,
    foreground: palette.mist,
    border: palette.alphaWhite,
    debuggingBackground: palette.seafoam,
    debuggingForeground: palette.crimson,
    noFolderBackground: palette.midnight,
    noFolderForeground: palette.mist,
  },
  tabs: {
    activeBackground: palette.midnight,
    activeForeground: palette.mist,
    activeBorder: palette["#527bb254"],
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
    foreground: lighten(palette.mist, 0.1),        border: palette.steel,
    placeholderForeground: darken(palette.mist, 0.2),
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
}

export const minted: ThemeDefinition = {
  name: "Minted",
  type: "dark",
  palette,
  background: palette.midnight,

  tokens: {
    source: palette.mist,
    comments: palette.charcoal,
    strings: make({
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
  },

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

export default minted;

// rgb(144 230 201 / 95%)
