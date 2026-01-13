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

import type {
	TokenType,
	SemanticTokenType,
	SemanticTokenModifier,
	ModifierConfig,
	Semantic,
} from "../types";
import type { ThemeFilters } from "../filters";
import Color from "color";

// ============================================================================
// Color Palette
// ============================================================================


export type ColorPalette = Record<string, string>;

// ============================================================================
// Token Assignments (hierarchical, CSS-like)
// ============================================================================
export type Modifier = (defaultColor: string) => string;
/** Helper type for a category with default + specific overrides */
type WithDefault<T extends Record<string, string | Modifier>> = {
	default: string;
} & Partial<T>;

export function make<T extends Record<string, string | Modifier>>(
	obj: T,
): Record<keyof T, string> {
	const defaultColor = obj.default as string;
	if (!defaultColor) {
		throw new Error("Default color is required");
	}
	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === "function") {
			(obj as Record<string, string | Modifier>)[key] = value(defaultColor);
		}
	}
	return obj as Record<keyof T, string>;
}

export interface TokenAssignments {
	/** Default color for all source code (fallback for everything) */
	source: string;

	/** Comments */
	comments: string;

	/** Operators: +, -, =, &&, etc. */
	operators: WithDefault<{
		/** +, -, *, / */
		arithmetic: string;
		/** =, +=, -= */
		assignment: string;
		/** ==, !=, <, > */
		comparison: string;
		/** &&, ||, ! */
		logical: string;
		/** &, |, ^, ~ */
		bitwise: string;
		/** and, or, not, in, is */
		wordlike: string;
	}>;

	/** Literals: fixed values in code */
	literals: WithDefault<{
		/** "hello", 'world', `template` */
		string: string;
		/** 42, 3.14, 0xFF, 1_000 */
		number: string;
		/** true, false */
		boolean: string;
		/** null */
		null: string;
		/** undefined */
		undefined: string;
		/** /pattern/g, /[a-z]+/i */
		regex: string;
	}>;

	/** Keywords: language reserved words */
	keywords: WithDefault<{
		/** if, else, for, while, return */
		control: string;
		/** let, const, var, function, class */
		declaration: string;
		/** import, export, from */
		import: string;
		/** public, private, static, async */
		modifier: string;
		/** typeof, instanceof, new, delete */
		operator: string;
	}>;

	/** Variables and identifiers */
	variables: WithDefault<{
		/** let x = 1, const data = ... */
		local: string;
		/** function foo(param) { ... } */
		parameter: string;
		/** obj.property, this.value */
		property: string;
		/** window, document, process */
		global: string;
		/** any other variable references */
		other: string;
	}>;

	/** Constants */
	constants: WithDefault<{
		/** 42, 3.14, 0xFF */
		numeric: string;
		/** true, false, null */
		language: string;
		/** const MY_CONST = ... */
		userDefined: string;
	}>;

	/** Functions and methods */
	functions: WithDefault<{
		/** function foo() {}, const bar = () => {} */
		declaration: string;
		/** foo(), myFunction(), doSomething() */
		call: string;
		/** obj.method(), this.doThing() */
		method: string;
		/** console.log(), Array.from(), Math.max() */
		builtin: string;
	}>;

	/** Types and type system */
	types: WithDefault<{
		/** string, number, boolean */
		primitive: string;
		/** class MyClass {} */
		class: string;
		/** interface IFoo {} */
		interface: string;
		/** enum Status {} */
		enum: string;
		/** <T> */
		typeParameter: string;
		/** namespace Foo {} */
		namespace: string;
	}>;

	/** Punctuation */
	punctuation: WithDefault<{
		/** (), [], {} */
		bracket: string;
		/** ,, ;, : */
		delimiter: string;
		/** ., ?. */
		accessor: string;
		/** =, ==, !=, <, >, <=, >= */
		definition: string;
	}>;

	/** Meta/special tokens */
	meta: WithDefault<{
		/** @decorator */
		decorator: string;
		/** macro!, #define */
		macro: string;
		/** @Override */
		annotation: string;
		/** myLabel: */
		label: string;
		/** <tag> */
		tag: string;
	}>;

	/** Storage types and modifiers */
	storage: WithDefault<{
		/** let, const, var, function, class */
		type: string;
	}>;

	/** String literals */
	strings: WithDefault<{
		/** "hello", 'world', `template` */
		default: string;
		/** /pattern/g */
		regex: string;
	}>;
}

// ============================================================================
// User Interface (workbench colors)
// ===========================================================================

export interface UIComponents<ColorValue extends string = string> {
	editor: {
		background: ColorValue;
		foreground: ColorValue;

		selectionBackground: ColorValue;
		selectionHighlightBackground: ColorValue;
		inactiveSelectionBackground: ColorValue;
		findMatchBackground: ColorValue;
		findMatchHighlightBackground: ColorValue;
		findRangeHighlightBackground: ColorValue;

		lineHighlight: ColorValue;
		lineHighlightBorder: ColorValue;
		lineNumberForeground: ColorValue;
		lineNumberActiveForeground: ColorValue;
		// rangeHighlight: ColorValue;
		// wordHighlight: ColorValue;
		// wordHighlightStrong: ColorValue;
		// findMatch: ColorValue;
		// findMatchHighlight: ColorValue;
		// selectionHighlight: ColorValue;
	};

	editorGutter: {
		background: ColorValue;
		modifiedBackground: ColorValue;
		addedBackground: ColorValue;
		deletedBackground: ColorValue;
		foldingControl: ColorValue;
	};

	editorLineNumber: {
		foreground: ColorValue;
		activeForeground: ColorValue;
	};

	editorWidget: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
	};

	titleBar: {
		activeBackground: ColorValue;
		activeForeground: ColorValue;
		inactiveBackground: ColorValue;
		inactiveForeground: ColorValue;
	};

	activityBar: {
		background: ColorValue;
		foreground: ColorValue;
		inactiveForeground: ColorValue;
		border: ColorValue;
		badgeBackground: ColorValue;
		badgeForeground: ColorValue;
	};

	sideBar: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		sectionHeaderBackground: ColorValue;
		sectionHeaderForeground: ColorValue;
	};

	panel: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		titleActiveForeground: ColorValue;
		titleInactiveForeground: ColorValue;
		titleActiveBorder: ColorValue;
	};

	statusBar: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		debuggingBackground: ColorValue;
		debuggingForeground: ColorValue;
		noFolderBackground: ColorValue;
		noFolderForeground: ColorValue;
	};

	tabs: {
		activeBackground: ColorValue;
		activeForeground: ColorValue;
		activeBorder: ColorValue;
		activeBorderTop: ColorValue;
		inactiveBackground: ColorValue;
		inactiveForeground: ColorValue;
		hoverBackground: ColorValue;
		hoverForeground: ColorValue;
		unfocusedActiveBackground: ColorValue;
		unfocusedActiveForeground: ColorValue;
		modifiedBorder: ColorValue;
	};

	list: {
		activeSelectionBackground: ColorValue;
		activeSelectionForeground: ColorValue;
		inactiveSelectionBackground: ColorValue;
		inactiveSelectionForeground: ColorValue;
		hoverBackground: ColorValue;
		hoverForeground: ColorValue;
		focusBackground: ColorValue;
		focusForeground: ColorValue;
		highlightForeground: ColorValue;
	};

	input: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		placeholderForeground: ColorValue;
	};

	button: {
		background: ColorValue;
		foreground: ColorValue;
		hoverBackground: ColorValue;
		secondaryBackground: ColorValue;
		secondaryForeground: ColorValue;
		secondaryHoverBackground: ColorValue;
	};

	dropdown: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		listBackground: ColorValue;
	};

	badge: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
	};

	scrollbar: {
		shadow: ColorValue;
		sliderBackground: ColorValue;
		sliderHoverBackground: ColorValue;
		sliderActiveBackground: ColorValue;
	};

	minimap: {
		background: ColorValue;
		selectionHighlight: ColorValue;
		errorHighlight: ColorValue;
		warningHighlight: ColorValue;
		findMatchHighlight: ColorValue;
	};

	breadcrumb: {
		foreground: ColorValue;
		focusForeground: ColorValue;
		activeSelectionForeground: ColorValue;
		background: ColorValue;
	};

	terminal: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		cursor: ColorValue;
		cursorForeground: ColorValue;
		selectionBackground: ColorValue;
		// ANSI colors
		ansiBlack: ColorValue;
		ansiRed: ColorValue;
		ansiGreen: ColorValue;
		ansiYellow: ColorValue;
		ansiBlue: ColorValue;
		ansiMagenta: ColorValue;
		ansiCyan: ColorValue;
		ansiWhite: ColorValue;
		ansiBrightBlack: ColorValue;
		ansiBrightRed: ColorValue;
		ansiBrightGreen: ColorValue;
		ansiBrightYellow: ColorValue;
		ansiBrightBlue: ColorValue;
		ansiBrightMagenta: ColorValue;
		ansiBrightCyan: ColorValue;
		ansiBrightWhite: ColorValue;
	};

	notification: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
	};

	peekView: {
		editorBackground: ColorValue;
		editorBorder: ColorValue;
		resultBackground: ColorValue;
		resultSelectionBackground: ColorValue;
		titleBackground: ColorValue;
		titleForeground: ColorValue;
	};

	chat?: {
		background?: ColorValue;
		foreground?: ColorValue;
		border?: ColorValue;
		surface?: ColorValue;
		requestBackground?: ColorValue;
		codeBlockBackground?: ColorValue;
	};

	diffEditor: {
		insertedTextBackground: ColorValue;
		removedTextBackground: ColorValue;
		insertedLineBackground: ColorValue;
		removedLineBackground: ColorValue;
		diagonalFill: ColorValue;
	};

	merge: {
		currentHeaderBackground: ColorValue;
		currentContentBackground: ColorValue;
		incomingHeaderBackground: ColorValue;
		incomingContentBackground: ColorValue;
		commonHeaderBackground: ColorValue;
		commonContentBackground: ColorValue;
	};
}

export interface UserInterface<ColorValue extends string> {
	// ═══════════════════════════════════════════════════════════════════════════
	// Primitives (semantic building blocks)
	// ═══════════════════════════════════════════════════════════════════════════

	/** Background layers from back to front */
	backgrounds: {
		base: ColorValue; // window/titlebar
		darker: ColorValue; // panels, sidebars
		surface: ColorValue; // editor, sidebar, panel
		raised: ColorValue; // dropdowns, widgets, hover cards
		overlay: ColorValue; // modals, notifications
		codeBlock: ColorValue; // code blocks (optional)
	};

	/** Foreground/text colors */
	foregrounds: {
		default: ColorValue; // primary text
		muted: ColorValue; // secondary text (inactive tabs, descriptions)
		subtle: ColorValue; // disabled, placeholders
		accent: ColorValue; // links, highlighted text
		focused: ColorValue; // focused elements
	};

	/** Border colors */
	borders: {
		default: ColorValue; // standard borders
		active: ColorValue; // focused/selected borders
		subtle: ColorValue; // subtle dividers
		separator: ColorValue; // separators
	};

	/** Accent/brand colors */
	accent: {
		primary: ColorValue; // buttons, badges, focus rings
		primaryForeground: ColorValue; // text on primary accent
		secondary?: ColorValue; // secondary actions
	};

	/** Status/feedback colors */
	status: {
		error: ColorValue;
		warning: ColorValue;
		info: ColorValue;
		success: ColorValue;
	};

	/** Selection & highlighting */
	selection: {
		background: ColorValue;
		backgroundActive?: ColorValue;
		backgroundInactive?: ColorValue;
		text?: ColorValue; // text selection in inputs
	};

	highlights?: {
		wordBackground?: ColorValue;
		wordBorder?: ColorValue;
		wordForeground?: ColorValue;
		selectionForeground?: ColorValue;
		selectionBorder?: ColorValue;
		selectionBackgroundInactive?: ColorValue;
		selectionBackgroundActive?: ColorValue;
	};

	/** Git/SCM decorations */
	git: {
		added: ColorValue;
		modified: ColorValue;
		deleted: ColorValue;
		untracked?: ColorValue;
		ignored?: ColorValue;
		conflict?: ColorValue;
	};

	// ═══════════════════════════════════════════════════════════════════════════
	// Component Overrides (optional, for specific tweaks)
	// ═══════════════════════════════════════════════════════════════════════════

	/** Override specific components when primitives aren't enough */
	overrides?: UIComponents;
}

// ============================================================================
// Semantic Token Overrides (optional layer on top)
// ============================================================================

export interface SemanticTokens {
	namespace?: string;
	class?: string | { default: string; declaration?: string };
	interface?: string;
	enum?: string;
	enumMember?: string;
	type?: string;
	typeParameter?: string;
	parameter?: string;
	variable?: string | { default: string; readonly?: string };
	property?:
		| string
		| { default: string; declaration?: string; readonly?: string };
	function?: string | { default: string; declaration?: string };
	method?: string | { default: string; declaration?: string; static?: string };
	decorator?: string;
	macro?: string;
}

export interface LanguageSpecificTokens {
	js: {
		this?: string;
	};
}

export interface SemanticOverrides
	extends SemanticTokens,
		LanguageSpecificTokens {}

// ============================================================================
// Complete Theme Definition
// ============================================================================

export interface ThemeDefinition<ColorValue extends string = string> {
	/** Name of the theme */
	name: string;

	/** Theme type */
	type: "dark" | "light";

	/** Color palette - named colors for easy reference */
	palette: ColorPalette;

	/** Background color */
	background: string;

	/** Token assignments with CSS-like cascading defaults */
	tokens: TokenAssignments;

	/** Language-specific overrides */
	languageOverrides?: {
		[languageId: string]: Partial<TokenAssignments>;
	};

	ui: UserInterface<ColorValue>;

	/** Optional semantic token overrides for fine-tuning */
	semantic?: Semantic;

	/** Optional modifier handlers */
	modifiers?: {
		[key in SemanticTokenModifier]?: ModifierConfig;
	};

	/** Optional post-processing filters (contrast, brightness, saturation, etc.) */
	filters?: ThemeFilters;

	/** Enable/disable semantic highlighting for this theme (default: true) */
	semanticHighlighting?: boolean;

	/** Extra VS Code colors that don't fit the structured UI definition */
	extraColors?: Record<string, string>;
}

// ============================================================================
// Resolution helpers
// ============================================================================

/** Get a value or fall back to default */
export function get<T extends { default: string }>(
	category: T,
	key: keyof T,
): string {
	const value = category[key];
	if (typeof value === "string") return value;
	return category.default;
}

/** Resolve a semantic override that might be string or object */
export function semantic(
	value:
		| string
		| { default: string; [key: string]: string | undefined }
		| undefined,
	variant?: string,
): string | undefined {
	if (value === undefined) return undefined;
	if (typeof value === "string") return value;
	if (variant && value[variant]) return value[variant];
	return value.default;
}

/**
 * Recursively builds dot-notation paths for all nested properties.
 *
 * Example: For { ui: { accent: { primary: string } } }
 * Returns: "ui" | "ui.accent" | "ui.accent.primary"
 */
export type DotPath<T, Prefix extends string = ""> = T extends object
	? {
			[K in keyof T & string]: K extends string
				? Prefix extends ""
					? K | DotPath<T[K], K>
					: `${Prefix}.${K}` | DotPath<T[K], `${Prefix}.${K}`>
				: never;
		}[keyof T & string]
	: never;

// If you only want the leaf paths (the ones that resolve to actual values, not intermediate objects):
export type LeafPath<T, Prefix extends string = ""> = T extends object
	? {
			[K in keyof T & string]: T[K] extends object
				? LeafPath<T[K], Prefix extends "" ? K : `${Prefix}.${K}`>
				: Prefix extends ""
					? K
					: `${Prefix}.${K}`;
		}[keyof T & string]
	: never;

export type ThemePath = DotPath<ThemeDefinition>;
export type ThemeColorPath = LeafPath<ThemeDefinition>;
export type UIPath = Omit<
	DotPath<UserInterface<string>>,
	"overrides" | `overrides.${string}`
>;
export type ComponentPath = LeafPath<UIComponents>;

/**
 * Helper type to get the value type at a given path
 */
export type PathValue<
	T,
	P extends string,
> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? PathValue<T[K], Rest>
		: never
	: P extends keyof T
		? T[P]
		: never;

/**
 * Get a value from a theme definition using a dot-notation path.
 * Provides full type safety for both the path and return value.
 *
 * If a key is not found but the parent has a "default" property,
 * it will fall back to that default (CSS-like cascading behavior).
 */
export function getThemeValue<P extends ThemePath>(
	theme: ThemeDefinition,
	path: P,
): string | null {
	const parts = path.split(".");
	let current: unknown = theme;
	let lastDefault: unknown;

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
			throw new Error(
				`Cannot access '${part}' on non-object at path '${path}'`,
			);
		}

		const obj = current as Record<string, unknown>;

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
			console.warn(
				`Property '${part}' not found at path '${path}' and no default available while building ${theme.name} theme`,
			);
			if (theme.ui?.foregrounds?.default) {
				return theme.ui.foregrounds.default; // Fallback to a safe value
			}
			if (theme.tokens?.source) return theme.tokens.source;
			console.warn(
				`No fallback available, returning hardcoded red color for theme ${theme.name}`,
			);
			return "#ff0000";
		}

		current = next;
	}

	if (typeof current === "object" && "default" in (current as any)) {
		return (current as any).default as string;
	}

	return current as string;
}

export function applyFilters(c: string, filters: ThemeFilters): string {
	let color = c;
	if (filters.hueShift) {
		color = Color(color).rotate(filters.hueShift).hex();
	}
	if (filters.saturation) {
		color = Color(color).saturate(filters.saturation).hex();
	}
	if (filters.brightness) {
		color = Color(color).lighten(filters.brightness).hex();
	}
	if (filters.contrast) {
		const contrast = filters.contrast;
		const lum = Color(color).luminosity();
		const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
		const r = Math.min(
			255,
			Math.max(0, factor * (Color(color).red() - 128) + 128),
		);
		const g = Math.min(
			255,
			Math.max(0, factor * (Color(color).green() - 128) + 128),
		);
		const b = Math.min(
			255,
			Math.max(0, factor * (Color(color).blue() - 128) + 128),
		);
		color = Color({ r, g, b }).hex();
	}
	return color;
}

export function colorFactory(t: ThemeDefinition) {
	/**
	 * Get a color from the theme using a dot-notation path.
	 * Uses CSS-like cascading - if a key is missing, falls back to parent's "default".
	 */
	return function c<P extends ThemePath>(path: P): string {
		const v = getThemeValue(t, path);
		return applyFilters(v || t.ui?.foregrounds?.default || "#ff0000", t.filters || {});
	};
}

/**
 * Get the exact value at a path without CSS-like default cascading.
 * Returns null if the exact path doesn't exist.
 */
function getExactValue(theme: ThemeDefinition, path: string): string | null {
	const parts = path.split(".");
	let current: unknown = theme;

	for (const part of parts) {
		if (current === null || current === undefined || typeof current !== "object") {
			return null;
		}
		const obj = current as Record<string, unknown>;
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

export function strictColorFactory(t: ThemeDefinition) {
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
	return function sc<P extends ThemePath>(...paths: P[]): string {
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

export function semanticFactory(t: ThemeDefinition) {
	return function c<
		P extends SemanticTokenType,
		T extends SemanticTokenModifier,
		S extends ThemePath,
	>(path: P, fallback: S = "ui.foregrounds.default" as S, mod?: T): string {
		let v: string = t.semantic?.[path] || getThemeValue(t, fallback) || t.ui.foregrounds.default;
		const parts = path.split(".");
		const last = parts.length > 1 ? parts[parts.length - 1] : null;
		const mk = Object.keys(t.modifiers || {}).includes(last as string)
			? last
			: null;
		const tokenModifier = mk
			? t.modifiers?.[mk as SemanticTokenModifier]
			: null;
		if (tokenModifier?.transform) {
			v = tokenModifier.transform(v);
		} else if (tokenModifier?.global?.foreground) {
			// mix colors
			const color = Color(v).mix(Color(tokenModifier.global.foreground), 0.5);
			v = color.hex();
		}
		v = applyFilters(v, t.filters || {});
		return v;
	};
}

// ============================================================================
// UI Colors (panel, button, etc)
// ============================================================================
export function getComponentColor<P extends ComponentPath>(
  theme: ThemeDefinition,
  path: P
): string {
  // Try override first
  const parts = path.split('.') as [keyof UIComponents, string];
  const [component, prop] = parts;
  const override = theme.ui.overrides?.[component]?.[prop as keyof UIComponents[typeof component]];
  if (override) return override;

  // Use fallback mapping
  const fallbackPath = fallbacks[path];
  if (fallbackPath) {
    return getThemeValue(theme, `ui.${fallbackPath}` as ThemePath) ?? theme.ui.foregrounds.default;
  }

  return theme.ui.foregrounds.default;
}


export function uiFactory(t: ThemeDefinition) {
	return function ui<P extends ComponentPath>(path: P): string {
		const c = getComponentColor(t, path);
		return applyFilters(c, t.filters || {});
	};
}

const fallbacks: Partial<Record<ComponentPath, UIPath>> = {
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
	"terminal.border": "borders.default",
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
