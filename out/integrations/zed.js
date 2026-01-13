"use strict";
/**
 * Zed integration - maps ThemeDefinition to Zed theme format
 *
 * This is the only place that knows about Zed's format.
 * It reads from ThemeDefinition and produces Zed JSON.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapZed = mapZed;
const types_1 = require("../themes/types");
const color_1 = __importDefault(require("color"));
// ============================================================================
// Helper functions
// ============================================================================
/**
 * Add alpha transparency to a color
 */
function withAlpha(color, alpha) {
    try {
        return (0, color_1.default)(color).alpha(alpha).hexa();
    }
    catch {
        return color;
    }
}
/**
 * Lighten a color
 */
function lighten(color, amount) {
    try {
        return (0, color_1.default)(color).lighten(amount).hex();
    }
    catch {
        return color;
    }
}
/**
 * Darken a color
 */
function darken(color, amount) {
    try {
        return (0, color_1.default)(color).darken(amount).hex();
    }
    catch {
        return color;
    }
}
// ============================================================================
// Mapping function
// ============================================================================
/**
 * Build Zed theme style from ThemeDefinition
 */
function buildStyle(t, c) {
    // Get colors from theme
    const background = c("ui.backgrounds.base", "background");
    const surface = c("ui.backgrounds.surface", "background");
    const raised = c("ui.backgrounds.raised", "ui.backgrounds.surface", "background");
    const overlay = c("ui.backgrounds.overlay", "ui.backgrounds.raised", "background");
    const foreground = c("ui.foregrounds.default");
    const muted = c("ui.foregrounds.muted");
    const subtle = c("ui.foregrounds.subtle", "ui.foregrounds.muted");
    const accent = c("ui.foregrounds.accent", "ui.accent.primary");
    const borderDefault = c("ui.borders.default");
    const borderActive = c("ui.borders.active", "ui.borders.default");
    const borderSubtle = c("ui.borders.subtle", "ui.borders.default");
    const error = c("ui.status.error");
    const warning = c("ui.status.warning");
    const info = c("ui.status.info");
    const success = c("ui.status.success");
    const selection = c("ui.selection.background");
    const gitAdded = c("ui.git.added", "ui.status.success");
    const gitModified = c("ui.git.modified", "ui.status.warning");
    const gitDeleted = c("ui.git.deleted", "ui.status.error");
    const gitIgnored = c("ui.git.ignored", "ui.foregrounds.muted");
    const gitConflict = c("ui.git.conflict", "ui.status.error");
    // Terminal colors
    const terminalBg = c("ui.overrides.terminal.background", "ui.backgrounds.surface", "background");
    const terminalFg = c("ui.overrides.terminal.foreground", "ui.foregrounds.default");
    const ansiBlack = c("ui.overrides.terminal.ansiBlack", "ui.backgrounds.base");
    const ansiRed = c("ui.overrides.terminal.ansiRed", "ui.status.error");
    const ansiGreen = c("ui.overrides.terminal.ansiGreen", "ui.status.success");
    const ansiYellow = c("ui.overrides.terminal.ansiYellow", "ui.status.warning");
    const ansiBlue = c("ui.overrides.terminal.ansiBlue", "ui.status.info");
    const ansiMagenta = c("ui.overrides.terminal.ansiMagenta", "ui.accent.primary");
    const ansiCyan = c("ui.overrides.terminal.ansiCyan", "ui.foregrounds.accent");
    const ansiWhite = c("ui.overrides.terminal.ansiWhite", "ui.foregrounds.default");
    const ansiBrightBlack = c("ui.overrides.terminal.ansiBrightBlack", "ui.foregrounds.muted");
    const ansiBrightRed = c("ui.overrides.terminal.ansiBrightRed", "ui.status.error");
    const ansiBrightGreen = c("ui.overrides.terminal.ansiBrightGreen", "ui.status.success");
    const ansiBrightYellow = c("ui.overrides.terminal.ansiBrightYellow", "ui.status.warning");
    const ansiBrightBlue = c("ui.overrides.terminal.ansiBrightBlue", "ui.status.info");
    const ansiBrightMagenta = c("ui.overrides.terminal.ansiBrightMagenta", "ui.accent.primary");
    const ansiBrightCyan = c("ui.overrides.terminal.ansiBrightCyan", "ui.foregrounds.accent");
    const ansiBrightWhite = c("ui.overrides.terminal.ansiBrightWhite", "ui.foregrounds.default");
    // Editor colors
    const editorBg = c("ui.overrides.editor.background", "ui.backgrounds.surface", "background");
    const editorFg = c("ui.overrides.editor.foreground", "ui.foregrounds.default");
    const gutterBg = c("ui.overrides.editorGutter.background", "ui.backgrounds.surface", "background");
    const lineHighlight = c("ui.overrides.editor.lineHighlight", "ui.selection.background");
    const lineNumber = c("ui.overrides.editorLineNumber.foreground", "ui.foregrounds.muted");
    const activeLineNumber = c("ui.overrides.editorLineNumber.activeForeground", "ui.foregrounds.default");
    const findMatch = c("ui.overrides.editor.findMatch", "ui.selection.background");
    const wordHighlight = c("ui.overrides.editor.wordHighlight", "ui.selection.background");
    const wordHighlightStrong = c("ui.overrides.editor.wordHighlightStrong", "ui.selection.background");
    // Status bar, tabs, etc.
    const statusBarBg = c("ui.overrides.statusBar.background", "ui.backgrounds.base", "background");
    const tabBg = c("ui.overrides.tabs.inactiveBackground", "ui.backgrounds.surface", "background");
    const tabActiveBg = c("ui.overrides.tabs.activeBackground", "ui.backgrounds.surface", "background");
    const panelBg = c("ui.overrides.panel.background", "ui.backgrounds.surface", "background");
    const panelBorder = c("ui.overrides.panel.border", "ui.borders.default");
    // Scrollbar
    const scrollbarThumb = c("ui.overrides.scrollbar.sliderBackground", "ui.borders.subtle");
    const scrollbarThumbHover = c("ui.overrides.scrollbar.sliderHoverBackground", "ui.borders.default");
    const scrollbarBorder = c("ui.borders.default");
    // Access palette for specific colors that may not be in the token system
    const palette = t.palette;
    // Helper to get palette color with fallback
    const pal = (key, fallback) => {
        return palette[key] || fallback;
    };
    // Build syntax highlighting
    const tokens = t.tokens;
    const syntax = {
        attribute: {
            color: pal("coral", (0, types_1.get)(tokens.meta, "decorator") || (0, types_1.get)(tokens.meta, "default")),
        },
        boolean: {
            color: (0, types_1.get)(tokens.literals, "boolean") || (0, types_1.get)(tokens.literals, "default"),
        },
        comment: {
            color: tokens.comments,
            font_style: "italic",
        },
        "comment.doc": {
            color: tokens.comments,
            font_style: "italic",
        },
        constant: {
            color: (0, types_1.get)(tokens.constants, "default"),
        },
        constructor: {
            color: (0, types_1.get)(tokens.types, "class") || (0, types_1.get)(tokens.types, "default"),
        },
        embedded: {
            color: tokens.source,
        },
        emphasis: {
            font_style: "italic",
        },
        "emphasis.strong": {
            font_weight: 700,
        },
        enum: {
            color: (0, types_1.get)(tokens.types, "enum") || (0, types_1.get)(tokens.types, "default"),
        },
        function: {
            color: (0, types_1.get)(tokens.functions, "call") || (0, types_1.get)(tokens.functions, "default"),
        },
        "function.method": {
            color: (0, types_1.get)(tokens.functions, "method") || (0, types_1.get)(tokens.functions, "default"),
        },
        "function.definition": {
            color: (0, types_1.get)(tokens.functions, "declaration") || (0, types_1.get)(tokens.functions, "default"),
        },
        hint: {
            color: info,
            font_weight: 700,
        },
        keyword: {
            color: (0, types_1.get)(tokens.keywords, "default"),
        },
        label: {
            color: (0, types_1.get)(tokens.meta, "label") || (0, types_1.get)(tokens.keywords, "default"),
        },
        link_text: {
            color: info,
            font_style: "italic",
        },
        link_uri: {
            color: info,
        },
        number: {
            color: (0, types_1.get)(tokens.literals, "number") || (0, types_1.get)(tokens.literals, "default"),
        },
        operator: {
            color: (0, types_1.get)(tokens.operators, "default"),
        },
        predictive: {
            color: (0, types_1.get)(tokens.variables, "parameter") || muted,
            font_style: "italic",
        },
        preproc: {
            color: (0, types_1.get)(tokens.keywords, "default"),
        },
        primary: {
            color: tokens.source,
        },
        property: {
            color: (0, types_1.get)(tokens.variables, "property") || (0, types_1.get)(tokens.variables, "default"),
        },
        punctuation: {
            color: (0, types_1.get)(tokens.punctuation, "default"),
        },
        "punctuation.bracket": {
            color: (0, types_1.get)(tokens.punctuation, "bracket") || (0, types_1.get)(tokens.punctuation, "default"),
        },
        "punctuation.delimiter": {
            color: (0, types_1.get)(tokens.punctuation, "delimiter") || (0, types_1.get)(tokens.punctuation, "default"),
        },
        "punctuation.list_marker": {
            color: (0, types_1.get)(tokens.punctuation, "default"),
        },
        "punctuation.special": {
            color: (0, types_1.get)(tokens.punctuation, "accessor") || (0, types_1.get)(tokens.punctuation, "default"),
        },
        string: {
            color: (0, types_1.get)(tokens.strings, "default") || (0, types_1.get)(tokens.literals, "string"),
        },
        "string.escape": {
            color: pal("peach", (0, types_1.get)(tokens.strings, "default")),
        },
        "string.regex": {
            color: (0, types_1.get)(tokens.strings, "regex") || (0, types_1.get)(tokens.literals, "regex"),
            font_style: "italic",
        },
        "string.special": {
            color: (0, types_1.get)(tokens.strings, "default"),
        },
        "string.special.symbol": {
            color: (0, types_1.get)(tokens.strings, "default"),
        },
        tag: {
            color: pal("tagName", (0, types_1.get)(tokens.meta, "tag") || (0, types_1.get)(tokens.types, "default")),
        },
        "text.literal": {
            color: (0, types_1.get)(tokens.strings, "default"),
        },
        title: {
            color: pal("lime", pal("markdownHeading", success)),
            font_weight: 700,
        },
        type: {
            color: (0, types_1.get)(tokens.types, "default"),
        },
        variable: {
            color: (0, types_1.get)(tokens.variables, "default"),
        },
        "variable.special": {
            color: (0, types_1.get)(tokens.variables, "global") || (0, types_1.get)(tokens.variables, "default"),
            font_style: "italic",
        },
        variant: {
            color: (0, types_1.get)(tokens.types, "enum") || (0, types_1.get)(tokens.types, "default"),
        },
    };
    // Build players array (for multi-cursor/collaboration)
    const playerColors = [ansiBlue, ansiMagenta, ansiCyan, ansiGreen, ansiYellow, c("ui.status.error")];
    const players = playerColors.map((color) => ({
        cursor: color,
        background: color,
        selection: withAlpha(color, 0.25),
    }));
    return {
        "background.appearance": "opaque",
        accents: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#8b00ff"],
        background,
        // Borders
        border: withAlpha(borderDefault, 0.08),
        "border.variant": borderSubtle,
        "border.focused": borderActive,
        "border.selected": withAlpha(borderDefault, 0.08),
        "border.transparent": "#00000000",
        "border.disabled": borderSubtle,
        // Surfaces
        "elevated_surface.background": raised,
        "surface.background": surface,
        // Elements
        "element.background": withAlpha(raised, 0.25),
        "element.hover": withAlpha(raised, 0.33),
        "element.active": withAlpha(raised, 0.25),
        "element.selected": overlay,
        "element.disabled": withAlpha(subtle, 0.33),
        "drop_target.background": withAlpha(overlay, 0.13),
        "ghost_element.background": "#00000000",
        "ghost_element.hover": withAlpha(overlay, 0.25),
        "ghost_element.active": withAlpha(raised, 0.25),
        "ghost_element.selected": overlay,
        "ghost_element.disabled": withAlpha(subtle, 0.33),
        // Text
        text: foreground,
        "text.muted": muted,
        "text.placeholder": withAlpha(subtle, 0.27),
        "text.disabled": withAlpha(subtle, 0.62),
        "text.accent": withAlpha(accent, 0.83),
        // Icons
        icon: foreground,
        "icon.muted": muted,
        "icon.disabled": withAlpha(subtle, 0.62),
        "icon.placeholder": withAlpha(subtle, 0.27),
        "icon.accent": withAlpha(accent, 0.83),
        // UI Components
        "status_bar.background": statusBarBg,
        "title_bar.background": statusBarBg,
        "title_bar.inactive_background": statusBarBg,
        "toolbar.background": statusBarBg,
        "tab_bar.background": statusBarBg,
        "tab.inactive_background": tabBg,
        "tab.active_background": tabActiveBg,
        "search.match_background": findMatch,
        "panel.background": panelBg,
        "panel.focused_border": panelBorder,
        "pane.focused_border": withAlpha(borderDefault, 0.08),
        // Scrollbar
        "scrollbar.thumb.background": withAlpha(scrollbarThumb, 0.25),
        "scrollbar.thumb.hover_background": withAlpha(scrollbarThumbHover, 0.5),
        "scrollbar.thumb.border": scrollbarBorder,
        "scrollbar.track.background": "#00000000",
        "scrollbar.track.border": "#00000000",
        // Editor
        "editor.foreground": editorFg,
        "editor.background": editorBg,
        "editor.gutter.background": gutterBg,
        "editor.subheader.background": raised,
        "editor.active_line.background": lineHighlight,
        "editor.highlighted_line.background": lineHighlight,
        "editor.line_number": lineNumber,
        "editor.active_line_number": activeLineNumber,
        "editor.invisible": borderSubtle,
        "editor.wrap_guide": withAlpha(borderDefault, 0.13),
        "editor.active_wrap_guide": withAlpha(borderActive, 0.86),
        "editor.document_highlight.read_background": wordHighlight,
        "editor.document_highlight.write_background": wordHighlightStrong,
        // Terminal
        "terminal.background": terminalBg,
        "terminal.foreground": terminalFg,
        "terminal.bright_foreground": "#FFFFFF",
        "terminal.dim_foreground": muted,
        "terminal.ansi.black": ansiBlack,
        "terminal.ansi.bright_black": ansiBrightBlack,
        "terminal.ansi.dim_black": ansiBlack,
        "terminal.ansi.red": ansiRed,
        "terminal.ansi.bright_red": ansiBrightRed,
        "terminal.ansi.dim_red": ansiRed,
        "terminal.ansi.green": ansiGreen,
        "terminal.ansi.bright_green": ansiBrightGreen,
        "terminal.ansi.dim_green": ansiGreen,
        "terminal.ansi.yellow": ansiYellow,
        "terminal.ansi.bright_yellow": ansiBrightYellow,
        "terminal.ansi.dim_yellow": ansiYellow,
        "terminal.ansi.blue": ansiBlue,
        "terminal.ansi.bright_blue": ansiBrightBlue,
        "terminal.ansi.dim_blue": ansiBlue,
        "terminal.ansi.magenta": ansiMagenta,
        "terminal.ansi.bright_magenta": ansiBrightMagenta,
        "terminal.ansi.dim_magenta": ansiMagenta,
        "terminal.ansi.cyan": ansiCyan,
        "terminal.ansi.bright_cyan": ansiBrightCyan,
        "terminal.ansi.dim_cyan": ansiCyan,
        "terminal.ansi.white": ansiWhite,
        "terminal.ansi.bright_white": ansiBrightWhite,
        "terminal.ansi.dim_white": ansiWhite,
        // Links & Status
        "link_text.hover": info,
        conflict: gitConflict,
        "conflict.background": withAlpha(gitConflict, 0.25),
        "conflict.border": gitConflict,
        created: gitAdded,
        "created.background": withAlpha(gitAdded, 0.13),
        "created.border": gitAdded,
        deleted: gitDeleted,
        "deleted.background": withAlpha(gitDeleted, 0.08),
        "deleted.border": gitDeleted,
        error,
        "error.background": withAlpha(error, 0.27),
        "error.border": error,
        hidden: gitIgnored,
        "hidden.background": withAlpha(gitIgnored, 0.25),
        "hidden.border": gitIgnored,
        hint: info,
        "hint.background": withAlpha(info, 0.25),
        "hint.border": info,
        ignored: gitIgnored,
        "ignored.background": withAlpha(gitIgnored, 0.25),
        "ignored.border": gitIgnored,
        info,
        "info.background": withAlpha(info, 0.25),
        "info.border": info,
        modified: gitModified,
        "modified.background": withAlpha(gitModified, 0.25),
        "modified.border": gitModified,
        predictive: muted,
        "predictive.background": withAlpha(muted, 0.25),
        "predictive.border": muted,
        renamed: gitAdded,
        "renamed.background": withAlpha(gitAdded, 0.25),
        "renamed.border": gitAdded,
        success,
        "success.background": withAlpha(success, 0.25),
        "success.border": success,
        unreachable: subtle,
        "unreachable.background": withAlpha(subtle, 0.25),
        "unreachable.border": subtle,
        warning,
        "warning.background": withAlpha(warning, 0.25),
        "warning.border": warning,
        players,
        syntax,
    };
}
/**
 * Map a ThemeDefinition to Zed theme format
 */
function mapZed(theme, options = {}) {
    // Merge filters into theme (filters are applied by the color factory)
    const filters = {
        ...theme.filters,
        ...options.filters,
    };
    // Create a theme with merged filters for the color factory
    const processedTheme = {
        ...theme,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
    };
    // Create color factory for the processed theme
    const c = (0, types_1.strictColorFactory)(processedTheme);
    // Build the theme style
    const style = buildStyle(processedTheme, c);
    // Construct the theme file
    const themeFile = {
        $schema: "https://zed.dev/schema/themes/v0.2.0.json",
        name: `${theme.name} Theme Family`,
        author: options.author || "Cooper Maruyama",
        themes: [
            {
                name: theme.name,
                appearance: theme.type,
                style,
            },
        ],
    };
    return themeFile;
}
exports.default = mapZed;
//# sourceMappingURL=zed.js.map