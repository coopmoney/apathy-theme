"use strict";
/**
 * Color filters for post-processing themes
 *
 * Apply these filters after theme generation to adjust
 * contrast, brightness, saturation, and other color properties.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presets = void 0;
exports.applyFilters = applyFilters;
exports.applyFiltersWithContext = applyFiltersWithContext;
exports.applyFiltersToObject = applyFiltersToObject;
exports.applyFiltersToTheme = applyFiltersToTheme;
const color_1 = __importDefault(require("color"));
// ============================================================================
// Color Detection
// ============================================================================
/**
 * Check if a string is a valid color (hex, rgb, etc.)
 */
function isColor(value) {
    if (!value || typeof value !== "string")
        return false;
    // Hex colors
    if (/^#[0-9A-Fa-f]{3,8}$/.test(value))
        return true;
    // RGB/RGBA
    if (/^rgba?\s*\(/.test(value))
        return true;
    // HSL/HSLA
    if (/^hsla?\s*\(/.test(value))
        return true;
    return false;
}
/**
 * Determine if a color is "light" (useful for detecting backgrounds vs foregrounds)
 */
function isLightColor(color) {
    try {
        return (0, color_1.default)(color).luminosity() > 0.5;
    }
    catch {
        return false;
    }
}
// ============================================================================
// Filter Implementation
// ============================================================================
/**
 * Apply all filters to a single color
 */
function applyFilters(colorStr, filters) {
    if (!isColor(colorStr))
        return colorStr;
    try {
        let color = (0, color_1.default)(colorStr);
        const hasAlpha = color.alpha() < 1;
        // Contrast adjustment (move colors away from or toward middle gray)
        if (filters.contrast !== undefined && filters.contrast !== 0) {
            const factor = 1 + filters.contrast;
            const l = color.lightness();
            // Move lightness toward or away from 50%
            const newL = 50 + (l - 50) * factor;
            color = color.lightness(Math.max(0, Math.min(100, newL)));
        }
        // Brightness adjustment
        if (filters.brightness !== undefined && filters.brightness !== 0) {
            const l = color.lightness();
            // Scale: -1 -> 0%, 0 -> no change, 1 -> 100%
            const delta = filters.brightness * 50;
            color = color.lightness(Math.max(0, Math.min(100, l + delta)));
        }
        // Saturation adjustment
        if (filters.saturation !== undefined && filters.saturation !== 0) {
            const s = color.saturationl();
            // Scale: -1 -> 0%, 0 -> no change, 1 -> double
            if (filters.saturation > 0) {
                const newS = s + (100 - s) * filters.saturation;
                color = color.saturationl(newS);
            }
            else {
                const newS = s * (1 + filters.saturation);
                color = color.saturationl(Math.max(0, newS));
            }
        }
        // Hue shift
        if (filters.hueShift !== undefined && filters.hueShift !== 0) {
            const h = color.hue();
            color = color.hue((h + filters.hueShift) % 360);
        }
        // Custom filter
        if (filters.custom) {
            const result = filters.custom(color.hex());
            color = (0, color_1.default)(result);
        }
        // Preserve original alpha
        if (hasAlpha) {
            return color.alpha((0, color_1.default)(colorStr).alpha()).hexa();
        }
        return color.hex();
    }
    catch {
        // If color parsing fails, return original
        return colorStr;
    }
}
/**
 * Apply filters with context about whether this is a foreground or background color
 */
function applyFiltersWithContext(colorStr, filters, context) {
    if (!isColor(colorStr))
        return colorStr;
    try {
        let color = (0, color_1.default)(colorStr);
        const hasAlpha = color.alpha() < 1;
        const effectiveContext = context === "auto"
            ? (isLightColor(colorStr) ? "foreground" : "background")
            : context;
        // Apply context-specific lightness adjustment first
        if (effectiveContext === "foreground" && filters.foregroundLightness) {
            const l = color.lightness();
            const delta = filters.foregroundLightness * 50;
            color = color.lightness(Math.max(0, Math.min(100, l + delta)));
        }
        else if (effectiveContext === "background" && filters.backgroundLightness) {
            const l = color.lightness();
            const delta = filters.backgroundLightness * 50;
            color = color.lightness(Math.max(0, Math.min(100, l + delta)));
        }
        // Then apply the rest
        const tempHex = hasAlpha ? color.alpha((0, color_1.default)(colorStr).alpha()).hexa() : color.hex();
        return applyFilters(tempHex, {
            ...filters,
            foregroundLightness: undefined,
            backgroundLightness: undefined,
        });
    }
    catch {
        return colorStr;
    }
}
// ============================================================================
// Theme-wide Filter Application
// ============================================================================
/**
 * Recursively apply filters to all colors in an object
 */
function applyFiltersToObject(obj, filters) {
    if (!filters || Object.keys(filters).length === 0)
        return obj;
    if (typeof obj === "string") {
        return applyFilters(obj, filters);
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => applyFiltersToObject(item, filters));
    }
    if (typeof obj === "object" && obj !== null) {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = applyFiltersToObject(value, filters);
        }
        return result;
    }
    return obj;
}
/**
 * Apply filters to a VS Code theme object
 *
 * This intelligently applies filters to colors, tokenColors, and semanticTokenColors.
 */
function applyFiltersToTheme(theme, filters) {
    if (!filters || Object.keys(filters).length === 0)
        return theme;
    return {
        ...theme,
        colors: theme.colors
            ? applyFiltersToObject(theme.colors, filters)
            : theme.colors,
        tokenColors: theme.tokenColors
            ? theme.tokenColors.map((token) => ({
                ...token,
                settings: {
                    ...token.settings,
                    foreground: token.settings.foreground
                        ? applyFilters(token.settings.foreground, filters)
                        : undefined,
                },
            }))
            : theme.tokenColors,
        semanticTokenColors: theme.semanticTokenColors
            ? Object.fromEntries(Object.entries(theme.semanticTokenColors).map(([key, value]) => {
                if (typeof value === "string") {
                    return [key, applyFilters(value, filters)];
                }
                if (typeof value === "object" && value !== null) {
                    return [
                        key,
                        {
                            ...value,
                            foreground: value.foreground
                                ? applyFilters(value.foreground, filters)
                                : undefined,
                        },
                    ];
                }
                return [key, value];
            }))
            : theme.semanticTokenColors,
    };
}
// ============================================================================
// Preset Filters
// ============================================================================
exports.presets = {
    /** Increase contrast for better readability */
    highContrast: {
        contrast: 0.2,
    },
    /** Lower contrast for a softer look */
    lowContrast: {
        contrast: -0.15,
    },
    /** Desaturate colors for a more muted look */
    muted: {
        saturation: -0.3,
    },
    /** Increase saturation for more vivid colors */
    vivid: {
        saturation: 0.25,
    },
    /** Slightly warmer tones */
    warm: {
        hueShift: -10,
        saturation: 0.05,
    },
    /** Slightly cooler tones */
    cool: {
        hueShift: 10,
        saturation: 0.05,
    },
    /** Dim the theme (reduce brightness) */
    dim: {
        brightness: -0.1,
    },
    /** Brighten the theme */
    bright: {
        brightness: 0.1,
    },
};
//# sourceMappingURL=filters.js.map