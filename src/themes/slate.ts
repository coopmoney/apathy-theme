/**
 * Slate theme - using hierarchical slate-style format
 *
 * This theme demonstrates the power of the cascade -
 * setting defaults and then overriding specific values.
 */

import type { ThemeDefinition } from "./types";
import { SemanticTokenModifier } from "../types";

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
};

// ============================================================================
// 2. Theme Definition
// ============================================================================

export const slate: ThemeDefinition = {
  name: "Slate",
  type: "dark",
  palette,
  background: palette["#0e0e15"],

  tokens: {
    source: palette["#a7a4af"],
    comments: palette["#829297"],

    // Operators - all use crimson, but we COULD differentiate
    operators: {
      default: palette["#E60063"],
      arithmetic: palette["#E60063"],  // +, -, *, /
      assignment: palette["#E60063"],  // =, +=, -=
      logical: palette["#E60063"],     // &&, ||, !
      wordlike: palette["#E60063"],    // and, or, not
    },

    // Literals - different colors for different types
    literals: {
      default: palette["#33b3cc"],
      string: palette["#b1d36d"],
      number: palette["#ffcb6b"],
      boolean: palette["#33b3cc"],
      null: palette["#8564d8"],
      undefined: palette["#8564d8"],
      regex: palette["#FF6188"],
    },

    // Keywords - different shades for different purposes
    keywords: {
      default: palette["#767a92"],
      import: palette["#e0a2d3"],
      // control, declaration inherit from default
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
      default: palette["#767a92"],
    },
    strings: {
      default: palette["#b1d36d"],
    },
  },

  // Semantic overrides - fine-tune specific semantic tokens
  semantic: {
    namespace: palette["#a7a4af"],
    class: {
      default: palette["#e0a2d3"],
    },
    property: {
      default: palette["#e0a2d3"],
      declaration: palette["#cba6f7"],
    },
    comment: {
      default: palette["#829297"],
      documentation: palette["#767a92"],
    },
    string: {
      default: palette["#b1d36d"],
      modification: palette["#ffcb6b"],
    },
    keyword: {
      default: palette["#767a92"],
      async: palette["#e0a2d3"],
    },
    number: {
      default: palette["#ffcb6b"],
    },
    regexp: {
      default: palette["#FF6188"],
    },
    operator: {
      default: palette["#E60063"],
    },
    label: {
      default: palette["#e0a2d3"],
    },
    struct: {
      default: palette["#cba6f7"],
    },
    method: {
      default: palette["#73bf9c"],
    },
    function: {
      default: palette["#73bf9c"],
    },
    macro: {
      default: palette["#ffcb6b"],
    },
    type: {
      default: palette["#cba6f7"],
    },
    typeParameter: {
      default: palette["#cba6f7"],
    },
    variable: {
      default: palette["#a7a4af"],
    },
    parameter: {
      default: palette["#a7a4af"],
    },
    interface: {
      default: palette["#cba6f7"],
    },
    enum: {
      default: palette["#cba6f7"],
    },
    decorator: {
      default: palette["#ffcb6b"],
    },
  },

  // Modifier handlers
  modifiers: {
    [SemanticTokenModifier.deprecated]: {
      global: { fontStyle: "strikethrough" },
    },
    [SemanticTokenModifier.readonly]: {
      global: { fontStyle: "italic" },
    },
  },

  ui: {
    foregrounds: {
      default: palette["#a7a4af"],
      muted: palette["#829297"],
      subtle: palette["#767a92"],
      accent: palette["#33b3cc"],
    },
    backgrounds: {
      base: palette["#0e0e15"],
      surface: "#1a1a24",
      overlay: "#252531",
      raised: "#2c2c3c",
    },
    borders: {
      default: "#333344",
      active: "#45455a",
      subtle: "#21212e",
    },
    accent: {
      primary: palette["#e0a2d3"],
      secondary: palette["#8564d8"],
      primaryForeground: palette["#f5e0dc"],
    },
    status: {
      error: "#FF6188",
      warning: "#ffcb6b",
      success: "#73bf9c",
      info: "#33b3cc",
    },
    selection: {
      background: "#333344",
      backgroundInactive: "#252531",
      text: palette["#f5e0dc"],
    },
    git: {
      added: "#73bf9c",
      modified: "#33b3cc",
      deleted: "#FF6188",
      untracked: "#45465a",
      ignored: "#21212e",
      conflict: "#E60063",
    }
  }
};

export default slate;
