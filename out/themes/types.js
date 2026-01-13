"use strict";
/**
 * Hierarchical theme definition system.
 *
 * Works like CSS - you set defaults at each level, and more specific
 * values override them. If a specific value isn't set, it inherits
 * from its parent's default.
 *
 * Example:
 *   literals: {
 *     default: colors.cyan,      // all literals are cyan by default
 *     string: colors.green,      // except strings, which are green
 *     number: colors.gold,       // and numbers, which are gold
 *   }
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = make;
exports.get = get;
exports.semantic = semantic;
exports.getThemeValue = getThemeValue;
exports.applyFilters = applyFilters;
exports.colorFactory = colorFactory;
exports.strictColorFactory = strictColorFactory;
exports.semanticFactory = semanticFactory;
exports.getComponentColor = getComponentColor;
exports.uiFactory = uiFactory;
const color_1 = __importDefault(require("color"));
function make(obj) {
    const defaultColor = obj.default;
    if (!defaultColor) {
        throw new Error("Default color is required");
    }
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "function") {
            obj[key] = value(defaultColor);
        }
    }
    return obj;
}
// ============================================================================
// Resolution helpers
// ============================================================================
/** Get a value or fall back to default */
function get(category, key) {
    const value = category[key];
    if (typeof value === "string")
        return value;
    return category.default;
}
/** Resolve a semantic override that might be string or object */
function semantic(value, variant) {
    if (value === undefined)
        return undefined;
    if (typeof value === "string")
        return value;
    if (variant && value[variant])
        return value[variant];
    return value.default;
}
/**
 * Get a value from a theme definition using a dot-notation path.
 * Provides full type safety for both the path and return value.
 *
 * If a key is not found but the parent has a "default" property,
 * it will fall back to that default (CSS-like cascading behavior).
 */
function getThemeValue(theme, path) {
    const parts = path.split(".");
    let current = theme;
    let lastDefault;
    for (const part of parts) {
        if (current === null || current === undefined) {
            // If we have a default from a parent, use it
            if (typeof lastDefault === "string") {
                return lastDefault;
            }
            return null;
        }
        if (typeof current !== "object") {
            // If we have a default from a parent, use it
            if (typeof lastDefault === "string") {
                return lastDefault;
            }
            throw new Error(`Cannot access '${part}' on non-object at path '${path}'`);
        }
        const obj = current;
        // Track the default value at this level if it exists
        if ("default" in obj && typeof obj.default === "string") {
            lastDefault = obj.default;
        }
        const next = obj[part];
        // If the key doesn't exist, fall back to default if available
        if (next === undefined) {
            if (typeof lastDefault === "string") {
                return lastDefault;
            }
            console.warn(`Property '${part}' not found at path '${path}' and no default available while building ${theme.name} theme`);
            if (theme.ui?.foregrounds?.default) {
                return theme.ui.foregrounds.default; // Fallback to a safe value
            }
            if (theme.tokens?.source)
                return theme.tokens.source;
            console.warn(`No fallback available, returning hardcoded red color for theme ${theme.name}`);
            return "#ff0000";
        }
        current = next;
    }
    if (typeof current === "object" && "default" in current) {
        return current.default;
    }
    return current;
}
function applyFilters(c, filters) {
    let color = c;
    if (filters.hueShift) {
        color = (0, color_1.default)(color).rotate(filters.hueShift).hex();
    }
    if (filters.saturation) {
        color = (0, color_1.default)(color).saturate(filters.saturation).hex();
    }
    if (filters.brightness) {
        color = (0, color_1.default)(color).lighten(filters.brightness).hex();
    }
    if (filters.contrast) {
        const contrast = filters.contrast;
        const lum = (0, color_1.default)(color).luminosity();
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        const r = Math.min(255, Math.max(0, factor * ((0, color_1.default)(color).red() - 128) + 128));
        const g = Math.min(255, Math.max(0, factor * ((0, color_1.default)(color).green() - 128) + 128));
        const b = Math.min(255, Math.max(0, factor * ((0, color_1.default)(color).blue() - 128) + 128));
        color = (0, color_1.default)({ r, g, b }).hex();
    }
    return color;
}
function colorFactory(t) {
    /**
     * Get a color from the theme using a dot-notation path.
     * Uses CSS-like cascading - if a key is missing, falls back to parent's "default".
     */
    return function c(path) {
        const v = getThemeValue(t, path);
        return applyFilters(v || t.ui?.foregrounds?.default || "#ff0000", t.filters || {});
    };
}
/**
 * Get the exact value at a path without CSS-like default cascading.
 * Returns null if the exact path doesn't exist.
 */
function getExactValue(theme, path) {
    const parts = path.split(".");
    let current = theme;
    for (const part of parts) {
        if (current === null || current === undefined || typeof current !== "object") {
            return null;
        }
        const obj = current;
        const next = obj[part];
        if (next === undefined) {
            return null;
        }
        current = next;
    }
    // If we landed on an object with a default, don't use it - we want exact matches only
    if (typeof current === "string") {
        return current;
    }
    return null;
}
function strictColorFactory(t) {
    const c = colorFactory(t);
    /**
     * Get a color using exact path matching with fallbacks.
     * Only matches exact paths (no CSS-like default cascading).
     * Falls back to colorFactory behavior for the final argument.
     *
     * @example
     * sc("ui.overrides.editor.background", "ui.backgrounds.surface")
     * // Tries exact match on each path, last one uses colorFactory (with cascading)
     */
    return function sc(...paths) {
        // Try exact matches for all paths except the last
        for (let i = 0; i < paths.length - 1; i++) {
            const v = getExactValue(t, paths[i]);
            if (v !== null) {
                return applyFilters(v, t.filters || {});
            }
        }
        // Final path uses colorFactory (with CSS-like cascading defaults)
        return c(paths[paths.length - 1]);
    };
}
function semanticFactory(t) {
    return function c(path, fallback = "ui.foregrounds.default", mod) {
        let v = t.semantic?.[path] || getThemeValue(t, fallback) || t.ui.foregrounds.default;
        const parts = path.split(".");
        const last = parts.length > 1 ? parts[parts.length - 1] : null;
        const mk = Object.keys(t.modifiers || {}).includes(last)
            ? last
            : null;
        const tokenModifier = mk
            ? t.modifiers?.[mk]
            : null;
        if (tokenModifier?.transform) {
            v = tokenModifier.transform(v);
        }
        else if (tokenModifier?.global?.foreground) {
            // mix colors
            const color = (0, color_1.default)(v).mix((0, color_1.default)(tokenModifier.global.foreground), 0.5);
            v = color.hex();
        }
        v = applyFilters(v, t.filters || {});
        return v;
    };
}
// ============================================================================
// UI Colors (panel, button, etc)
// ============================================================================
function getComponentColor(theme, path) {
    // Try override first
    const parts = path.split('.');
    const [component, prop] = parts;
    const override = theme.ui.overrides?.[component]?.[prop];
    if (override)
        return override;
    // Use fallback mapping
    const fallbackPath = fallbacks[path];
    if (fallbackPath) {
        return getThemeValue(theme, `ui.${fallbackPath}`) ?? theme.ui.foregrounds.default;
    }
    return theme.ui.foregrounds.default;
}
function uiFactory(t) {
    return function ui(path) {
        const c = getComponentColor(t, path);
        return applyFilters(c, t.filters || {});
    };
}
const fallbacks = {
    // Editor
    "editor.background": "backgrounds.surface",
    "editor.foreground": "foregrounds.default",
    "editor.lineHighlight": "selection.background",
    "editor.lineHighlightBorder": "borders.active",
    "editor.rangeHighlight": "selection.background",
    "editor.wordHighlight": "selection.background",
    "editor.wordHighlightStrong": "selection.background",
    "editor.findMatch": "foregrounds.accent",
    "editor.findMatchHighlight": "selection.background",
    "editor.selectionHighlight": "selection.background",
    // Editor Gutter
    "editorGutter.background": "backgrounds.surface",
    "editorGutter.modifiedBackground": "git.modified",
    "editorGutter.addedBackground": "git.added",
    "editorGutter.deletedBackground": "git.deleted",
    "editorGutter.foldingControl": "foregrounds.muted",
    // Editor Line Numbers
    "editorLineNumber.foreground": "foregrounds.muted",
    "editorLineNumber.activeForeground": "foregrounds.default",
    // Activity Bar
    "activityBar.background": "backgrounds.surface",
    "activityBar.foreground": "foregrounds.default",
    "activityBar.inactiveForeground": "foregrounds.muted",
    "activityBar.border": "borders.subtle",
    "activityBar.badgeBackground": "accent.primary",
    "activityBar.badgeForeground": "accent.primaryForeground",
    // Sidebar
    "sideBar.background": "backgrounds.surface",
    "sideBar.foreground": "foregrounds.default",
    "sideBar.border": "borders.default",
    "sideBar.sectionHeaderBackground": "backgrounds.raised",
    "sideBar.sectionHeaderForeground": "foregrounds.default",
    // Panel
    "panel.background": "backgrounds.surface",
    "panel.foreground": "foregrounds.default",
    "panel.border": "borders.default",
    "panel.titleActiveForeground": "foregrounds.default",
    "panel.titleInactiveForeground": "foregrounds.muted",
    "panel.titleActiveBorder": "accent.primary",
    // Status Bar
    "statusBar.background": "backgrounds.surface",
    "statusBar.foreground": "foregrounds.default",
    "statusBar.border": "borders.subtle",
    "statusBar.debuggingBackground": "status.warning",
    "statusBar.debuggingForeground": "foregrounds.default",
    "statusBar.noFolderBackground": "backgrounds.surface",
    "statusBar.noFolderForeground": "foregrounds.muted",
    // Tabs
    "tabs.activeBackground": "backgrounds.surface",
    "tabs.activeForeground": "foregrounds.default",
    "tabs.activeBorder": "accent.primary",
    "tabs.activeBorderTop": "accent.primary",
    "tabs.inactiveBackground": "backgrounds.base",
    "tabs.inactiveForeground": "foregrounds.muted",
    "tabs.hoverBackground": "backgrounds.raised",
    "tabs.hoverForeground": "foregrounds.default",
    "tabs.unfocusedActiveBackground": "backgrounds.surface",
    "tabs.unfocusedActiveForeground": "foregrounds.muted",
    "tabs.modifiedBorder": "accent.primary",
    // List
    "list.activeSelectionBackground": "backgrounds.raised",
    "list.activeSelectionForeground": "foregrounds.default",
    "list.inactiveSelectionBackground": "backgrounds.raised",
    "list.inactiveSelectionForeground": "foregrounds.muted",
    "list.hoverBackground": "backgrounds.raised",
    "list.hoverForeground": "foregrounds.default",
    "list.focusBackground": "selection.background",
    "list.focusForeground": "foregrounds.default",
    "list.highlightForeground": "foregrounds.accent",
    // Input
    "input.background": "backgrounds.raised",
    "input.foreground": "foregrounds.default",
    "input.border": "borders.default",
    "input.placeholderForeground": "foregrounds.subtle",
    // Button
    "button.background": "accent.primary",
    "button.foreground": "accent.primaryForeground",
    "button.hoverBackground": "accent.primary",
    "button.secondaryBackground": "backgrounds.raised",
    "button.secondaryForeground": "foregrounds.default",
    "button.secondaryHoverBackground": "backgrounds.overlay",
    // Dropdown
    "dropdown.background": "backgrounds.raised",
    "dropdown.foreground": "foregrounds.default",
    "dropdown.border": "borders.default",
    "dropdown.listBackground": "backgrounds.raised",
    // Badge
    "badge.background": "accent.primary",
    "badge.foreground": "accent.primaryForeground",
    // Scrollbar
    "scrollbar.shadow": "backgrounds.base",
    "scrollbar.sliderBackground": "borders.subtle",
    "scrollbar.sliderHoverBackground": "borders.default",
    "scrollbar.sliderActiveBackground": "borders.active",
    // Minimap
    "minimap.background": "backgrounds.surface",
    "minimap.findMatchHighlight": "foregrounds.accent",
    "minimap.selectionHighlight": "selection.background",
    "minimap.errorHighlight": "status.error",
    "minimap.warningHighlight": "status.warning",
    // Breadcrumb
    "breadcrumb.background": "backgrounds.surface",
    "breadcrumb.foreground": "foregrounds.muted",
    "breadcrumb.focusForeground": "foregrounds.default",
    "breadcrumb.activeSelectionForeground": "foregrounds.default",
    // Terminal
    "terminal.background": "backgrounds.surface",
    "terminal.foreground": "foregrounds.default",
    "terminal.cursor": "accent.primary",
    "terminal.cursorForeground": "backgrounds.surface",
    "terminal.selectionBackground": "selection.background",
    "terminal.ansiBlack": "backgrounds.base",
    "terminal.ansiRed": "status.error",
    "terminal.ansiGreen": "status.success",
    "terminal.ansiYellow": "status.warning",
    "terminal.ansiBlue": "status.info",
    "terminal.ansiMagenta": "accent.primary",
    "terminal.ansiCyan": "foregrounds.accent",
    "terminal.ansiWhite": "foregrounds.default",
    "terminal.ansiBrightBlack": "foregrounds.muted",
    "terminal.ansiBrightRed": "status.error",
    "terminal.ansiBrightGreen": "status.success",
    "terminal.ansiBrightYellow": "status.warning",
    "terminal.ansiBrightBlue": "status.info",
    "terminal.ansiBrightMagenta": "accent.primary",
    "terminal.ansiBrightCyan": "foregrounds.accent",
    "terminal.ansiBrightWhite": "foregrounds.default",
    // Notification
    "notification.background": "backgrounds.overlay",
    "notification.foreground": "foregrounds.default",
    "notification.border": "borders.default",
    // Peek View
    "peekView.editorBackground": "backgrounds.surface",
    "peekView.editorBorder": "borders.default",
    "peekView.resultBackground": "backgrounds.raised",
    "peekView.resultSelectionBackground": "selection.background",
    "peekView.titleBackground": "backgrounds.raised",
    "peekView.titleForeground": "foregrounds.default",
    // Diff Editor
    "diffEditor.insertedTextBackground": "git.added",
    "diffEditor.removedTextBackground": "git.deleted",
    "diffEditor.insertedLineBackground": "git.added",
    "diffEditor.removedLineBackground": "git.deleted",
    "diffEditor.diagonalFill": "borders.subtle",
    // Merge
    "merge.currentHeaderBackground": "status.info",
    "merge.currentContentBackground": "backgrounds.raised",
    "merge.incomingHeaderBackground": "status.success",
    "merge.incomingContentBackground": "backgrounds.raised",
    "merge.commonHeaderBackground": "backgrounds.raised",
    "merge.commonContentBackground": "backgrounds.raised",
};
//# sourceMappingURL=types.js.map