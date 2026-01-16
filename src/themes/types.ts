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

	/**
	 * Special cases that are important enough to warrant their own token.
	 */
	special: {
		/** <Component /> */
		jsxClass: string
	}
}

// ============================================================================
// User Interface (workbench colors)
// ===========================================================================

/**
 * Component-level UI color overrides.
 * These provide granular control over specific VS Code UI components
 * when the semantic primitives in UserInterface aren't sufficient.
 *
 * @example VS Code: Maps directly to `editor.*`, `activityBar.*`, `sideBar.*`, etc.
 * @example Zed: Maps to `editor.*`, `tab_bar.*`, `status_bar.*`, etc.
 */
export interface UIComponents<ColorValue extends string = string> {
	/**
	 * Main code editor area.
	 * @example VS Code: `editor.background`, `editor.foreground`, `editor.selectionBackground`
	 * @example Zed: `editor.background`, `editor.foreground`
	 */
	editor: {
		/** Editor background color */
		background: ColorValue;
		/** Default text color */
		foreground: ColorValue;
		/** Selected text background */
		selectionBackground: ColorValue;
		/** Background for other occurrences of selected text */
		selectionHighlightBackground: ColorValue;
		/** Selection background when editor is not focused */
		inactiveSelectionBackground: ColorValue;
		/** Background of the current search match */
		findMatchBackground: ColorValue;
		/** Background of other search matches */
		findMatchHighlightBackground: ColorValue;
		/** Background of search range limit */
		findRangeHighlightBackground: ColorValue;
		/** Current line highlight background */
		lineHighlight: ColorValue;
		/** Current line highlight border */
		lineHighlightBorder: ColorValue;
		/** Line number color */
		lineNumberForeground: ColorValue;
		/** Active line number color */
		lineNumberActiveForeground: ColorValue;
	};

	/**
	 * Editor gutter (left margin with line numbers, folding, etc.).
	 * @example VS Code: `editorGutter.background`, `editorGutter.modifiedBackground`
	 * @example Zed: `editor.gutter.background`
	 */
	editorGutter: {
		/** Gutter background */
		background: ColorValue;
		/** Modified line indicator */
		modifiedBackground: ColorValue;
		/** Added line indicator */
		addedBackground: ColorValue;
		/** Deleted line indicator */
		deletedBackground: ColorValue;
		/** Folding control color */
		foldingControl: ColorValue;
	};

	/**
	 * Editor line numbers.
	 * @example VS Code: `editorLineNumber.foreground`, `editorLineNumber.activeForeground`
	 */
	editorLineNumber: {
		/** Default line number color */
		foreground: ColorValue;
		/** Current line number color */
		activeForeground: ColorValue;
	};

	/**
	 * Editor widgets (find/replace, go to line, etc.).
	 * @example VS Code: `editorWidget.background`, `editorWidget.border`
	 */
	editorWidget: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
	};

	/**
	 * Window title bar.
	 * @example VS Code: `titleBar.activeBackground`, `titleBar.activeForeground`
	 * @example Zed: `title_bar.background`
	 */
	titleBar: {
		/** Background when window is focused */
		activeBackground: ColorValue;
		/** Text color when window is focused */
		activeForeground: ColorValue;
		/** Background when window is not focused */
		inactiveBackground: ColorValue;
		/** Text color when window is not focused */
		inactiveForeground: ColorValue;
	};

	/**
	 * Activity bar (icon sidebar on the left/right).
	 * @example VS Code: `activityBar.background`, `activityBar.foreground`
	 */
	activityBar: {
		background: ColorValue;
		/** Active icon color */
		foreground: ColorValue;
		/** Inactive icon color */
		inactiveForeground: ColorValue;
		border: ColorValue;
		/** Notification badge background */
		badgeBackground: ColorValue;
		/** Notification badge text */
		badgeForeground: ColorValue;
	};

	/**
	 * Side bar (explorer, search, SCM panels).
	 * @example VS Code: `sideBar.background`, `sideBar.foreground`
	 * @example Zed: `panel.background`
	 */
	sideBar: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		/** Section header background (e.g., "EXPLORER") */
		sectionHeaderBackground: ColorValue;
		/** Section header text */
		sectionHeaderForeground: ColorValue;
	};

	/**
	 * Bottom panel (terminal, output, problems, etc.).
	 * @example VS Code: `panel.background`, `panel.border`
	 * @example Zed: `panel.background`
	 */
	panel: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		/** Active tab text */
		titleActiveForeground: ColorValue;
		/** Inactive tab text */
		titleInactiveForeground: ColorValue;
		/** Active tab indicator */
		titleActiveBorder: ColorValue;
	};

	/**
	 * Status bar (bottom bar with branch, errors, etc.).
	 * @example VS Code: `statusBar.background`, `statusBar.foreground`
	 * @example Zed: `status_bar.background`
	 */
	statusBar: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		/** Background when debugging */
		debuggingBackground: ColorValue;
		/** Text color when debugging */
		debuggingForeground: ColorValue;
		/** Background when no folder is open */
		noFolderBackground: ColorValue;
		/** Text color when no folder is open */
		noFolderForeground: ColorValue;
	};

	/**
	 * Editor tabs.
	 * @example VS Code: `tab.activeBackground`, `tab.inactiveBackground`
	 * @example Zed: `tab.active_background`, `tab.inactive_background`
	 */
	tabs: {
		/** Active tab background */
		activeBackground: ColorValue;
		/** Active tab text */
		activeForeground: ColorValue;
		/** Active tab bottom border */
		activeBorder: ColorValue;
		/** Active tab top border (accent line) */
		activeBorderTop: ColorValue;
		/** Inactive tab background */
		inactiveBackground: ColorValue;
		/** Inactive tab text */
		inactiveForeground: ColorValue;
		/** Tab background on hover */
		hoverBackground: ColorValue;
		/** Tab text on hover */
		hoverForeground: ColorValue;
		/** Active tab background when editor group is unfocused */
		unfocusedActiveBackground: ColorValue;
		/** Active tab text when editor group is unfocused */
		unfocusedActiveForeground: ColorValue;
		/** Border for tabs with unsaved changes */
		modifiedBorder: ColorValue;
	};

	/**
	 * List and tree views (explorer, search results, etc.).
	 * @example VS Code: `list.activeSelectionBackground`, `list.hoverBackground`
	 * @example Zed: Uses element.* and ghost_element.*
	 */
	list: {
		/** Selected item background (focused) */
		activeSelectionBackground: ColorValue;
		/** Selected item text (focused) */
		activeSelectionForeground: ColorValue;
		/** Selected item background (unfocused) */
		inactiveSelectionBackground: ColorValue;
		/** Selected item text (unfocused) */
		inactiveSelectionForeground: ColorValue;
		/** Item background on hover */
		hoverBackground: ColorValue;
		/** Item text on hover */
		hoverForeground: ColorValue;
		/** Focused item background (keyboard navigation) */
		focusBackground: ColorValue;
		/** Focused item text */
		focusForeground: ColorValue;
		/** Highlighted text in search matches */
		highlightForeground: ColorValue;
	};

	/**
	 * Text input fields.
	 * @example VS Code: `input.background`, `input.foreground`, `input.border`
	 */
	input: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		/** Placeholder text color */
		placeholderForeground: ColorValue;
	};

	/**
	 * Buttons.
	 * @example VS Code: `button.background`, `button.foreground`
	 */
	button: {
		/** Primary button background */
		background: ColorValue;
		/** Primary button text */
		foreground: ColorValue;
		/** Primary button hover background */
		hoverBackground: ColorValue;
		/** Secondary button background */
		secondaryBackground: ColorValue;
		/** Secondary button text */
		secondaryForeground: ColorValue;
		/** Secondary button hover background */
		secondaryHoverBackground: ColorValue;
	};

	/**
	 * Dropdown menus and selects.
	 * @example VS Code: `dropdown.background`, `dropdown.foreground`
	 */
	dropdown: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		/** Dropdown list background */
		listBackground: ColorValue;
	};

	/**
	 * Badges (notification counts, etc.).
	 * @example VS Code: `badge.background`, `badge.foreground`
	 */
	badge: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
	};

	/**
	 * Scrollbars.
	 * @example VS Code: `scrollbarSlider.background`, `scrollbarSlider.hoverBackground`
	 * @example Zed: `scrollbar.thumb.background`
	 */
	scrollbar: {
		/** Scrollbar shadow */
		shadow: ColorValue;
		/** Scrollbar thumb default */
		sliderBackground: ColorValue;
		/** Scrollbar thumb on hover */
		sliderHoverBackground: ColorValue;
		/** Scrollbar thumb when dragging */
		sliderActiveBackground: ColorValue;
	};

	/**
	 * Minimap (code overview on the right).
	 * @example VS Code: `minimap.background`, `minimap.selectionHighlight`
	 */
	minimap: {
		background: ColorValue;
		/** Selection highlight in minimap */
		selectionHighlight: ColorValue;
		/** Error markers */
		errorHighlight: ColorValue;
		/** Warning markers */
		warningHighlight: ColorValue;
		/** Search match markers */
		findMatchHighlight: ColorValue;
	};

	/**
	 * Breadcrumb navigation (file path above editor).
	 * @example VS Code: `breadcrumb.foreground`, `breadcrumb.background`
	 */
	breadcrumb: {
		foreground: ColorValue;
		/** Focused breadcrumb item */
		focusForeground: ColorValue;
		/** Selected breadcrumb item */
		activeSelectionForeground: ColorValue;
		background: ColorValue;
	};

	/**
	 * Integrated terminal.
	 * @example VS Code: `terminal.background`, `terminal.foreground`, `terminal.ansi*`
	 * @example Zed: `terminal.background`, `terminal.foreground`, `terminal.ansi.*`
	 */
	terminal: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		/** Cursor block color */
		cursor: ColorValue;
		/** Text color inside cursor */
		cursorForeground: ColorValue;
		/** Selected text background */
		selectionBackground: ColorValue;
		// ANSI colors (standard terminal palette)
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

	/**
	 * Notification toasts.
	 * @example VS Code: `notifications.background`, `notifications.foreground`
	 */
	notification: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
	};

	/**
	 * Peek view (inline references/definitions).
	 * @example VS Code: `peekViewEditor.background`, `peekView.border`
	 */
	peekView: {
		/** Peek editor background */
		editorBackground: ColorValue;
		/** Peek view border */
		editorBorder: ColorValue;
		/** Results list background */
		resultBackground: ColorValue;
		/** Selected result background */
		resultSelectionBackground: ColorValue;
		/** Title bar background */
		titleBackground: ColorValue;
		/** Title text */
		titleForeground: ColorValue;
	};

	/**
	 * AI chat interface (Copilot Chat, etc.).
	 * @example VS Code: `chat.requestBackground`, `chat.codeBlockBackground`
	 */
	chat?: {
		background?: ColorValue;
		foreground?: ColorValue;
		border?: ColorValue;
		/** Chat message surface */
		surface?: ColorValue;
		/** User message background */
		requestBackground?: ColorValue;
		/** Code block background in chat */
		codeBlockBackground?: ColorValue;
	};

	/**
	 * Diff editor (side-by-side or inline diff view).
	 * @example VS Code: `diffEditor.insertedTextBackground`, `diffEditor.removedTextBackground`
	 */
	diffEditor: {
		/** Added text background (inline) */
		insertedTextBackground: ColorValue;
		/** Removed text background (inline) */
		removedTextBackground: ColorValue;
		/** Added line background (full line) */
		insertedLineBackground: ColorValue;
		/** Removed line background (full line) */
		removedLineBackground: ColorValue;
		/** Diagonal fill for unchanged regions */
		diagonalFill: ColorValue;
	};

	/**
	 * Merge conflict editor.
	 * @example VS Code: `merge.currentHeaderBackground`, `merge.incomingHeaderBackground`
	 */
	merge: {
		/** "Current" (HEAD) header background */
		currentHeaderBackground: ColorValue;
		/** "Current" content background */
		currentContentBackground: ColorValue;
		/** "Incoming" (merge source) header background */
		incomingHeaderBackground: ColorValue;
		/** "Incoming" content background */
		incomingContentBackground: ColorValue;
		/** Common ancestor header background */
		commonHeaderBackground: ColorValue;
		/** Common ancestor content background */
		commonContentBackground: ColorValue;
	};
}

export interface UserInterface<ColorValue extends string> {
	// ═══════════════════════════════════════════════════════════════════════════
	// Primitives (semantic building blocks)
	// ═══════════════════════════════════════════════════════════════════════════

	/**
	 * Background color layers from back to front (z-order).
	 * @example VS Code: `editor.background`, `sideBar.background`, `editorWidget.background`
	 * @example Zed: `background`, `surface.background`, `elevated_surface.background`
	 */
	backgrounds: {
		/** Base layer - window chrome, title bar */
		base: ColorValue;
		/** Darker areas - activity bar, some panels */
		darker: ColorValue;
		/** Primary surfaces - editor, sidebar, panel */
		surface: ColorValue;
		/** Raised elements - dropdowns, widgets, hover cards */
		raised: ColorValue;
		/** Top layer - modals, notifications, overlays */
		overlay: ColorValue;
		/** Code blocks in markdown/chat (optional) */
		codeBlock: ColorValue;
	};

	/**
	 * Foreground/text color hierarchy.
	 * @example VS Code: `foreground`, `descriptionForeground`, `disabledForeground`
	 * @example Zed: `text`, `text.muted`, `text.placeholder`
	 */
	foregrounds: {
		/** Primary text color */
		default: ColorValue;
		/** Secondary text - inactive tabs, descriptions */
		muted: ColorValue;
		/** Tertiary text - disabled, placeholders */
		subtle: ColorValue;
		/** Accent text - links, highlighted items */
		accent: ColorValue;
		/** Focused element text */
		focused: ColorValue;
	};

	/**
	 * Border color hierarchy.
	 * @example VS Code: `panel.border`, `focusBorder`, `contrastBorder`
	 * @example Zed: `border`, `border.variant`, `border.focused`
	 */
	borders: {
		/** Standard borders between sections */
		default: ColorValue;
		/** Active/focused element borders */
		active: ColorValue;
		/** Subtle dividers, less prominent */
		subtle: ColorValue;
		/** Separator lines */
		separator: ColorValue;
	};

	elements: {
		/** Default element background (buttons, lists, etc.) */
		background: ColorValue;
		/** Hover state background for elements */
		hover: ColorValue;
		active: ColorValue;
		selected: ColorValue;
		disabled: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		borderActive?: ColorValue;
		foregroundActive?: ColorValue;
		backgroundActive?: ColorValue;
	}

	subtleElements: {
		background: ColorValue;
		hover: ColorValue;
		active: ColorValue;
		selected: ColorValue;
		disabled: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
		borderActive?: ColorValue;
		foregroundActive?: ColorValue;
		backgroundActive?: ColorValue;
	}

	/**
	 * Brand/accent colors for interactive elements.
	 * @example VS Code: `button.background`, `badge.background`, `focusBorder`
	 * @example Zed: `accents[0]`, `element.active`
	 */
	accent: {
		/** Primary accent - buttons, badges, focus rings */
		primary: ColorValue;
		/** Text color on primary accent background */
		primaryForeground: ColorValue;
		/** Secondary accent for less prominent actions */
		secondary?: ColorValue;
		palette?: string[]
	};

	panels: {
		background: ColorValue;
		foreground: ColorValue;
		border?: ColorValue;
		titleForeground?: ColorValue;
		titleBackground?: ColorValue;

	};

	/**
	 * Semantic status/feedback colors.
	 * @example VS Code: `editorError.foreground`, `editorWarning.foreground`, `editorInfo.foreground`
	 * @example Zed: `error`, `warning`, `info`, `success`
	 */
	status: {
		/** Error state - validation failures, errors */
		error: ColorValue;
		/** Warning state - caution, deprecation */
		warning: ColorValue;
		/** Info state - hints, notifications */
		info: ColorValue;
		/** Success state - completion, positive feedback */
		success: ColorValue;
	};

	/**
	 * Text/code selection colors.
	 * @example VS Code: `editor.selectionBackground`, `editor.inactiveSelectionBackground`
	 * @example Zed: player selection colors
	 */
	selection: {
		/** Primary selection background */
		background: ColorValue;
		/** Selection in focused editor */
		backgroundActive?: ColorValue;
		/** Selection in unfocused editor */
		backgroundInactive?: ColorValue;
		/** Selected text color (if different from default) */
		text?: ColorValue;
	};

	/**
	 * Line/word/selection highlighting colors.
	 * @example VS Code: `editor.lineHighlightBackground`, `editor.wordHighlightBackground`
	 * @example Zed: `editor.active_line.background`, `editor.document_highlight.read_background`
	 */
	highlights?: {
		/** Active/current line highlight */
		activeLine: {
			background: ColorValue;
			foreground?: ColorValue;
		}
		/** Word highlight (e.g., same symbol occurrences) */
		word: {
			background: ColorValue;
			border?: ColorValue;
			foreground?: ColorValue;
			backgroundStrong?: ColorValue;
		}
		/** Selection highlighting */
		selection: {
			backgroundInactive: ColorValue;
			backgroundActive: ColorValue;
			foreground?: ColorValue;
			border?: ColorValue;
		}
	};

	/**
	 * Indentation guide lines.
	 * @example VS Code: `editorIndentGuide.background`, `editorIndentGuide.activeBackground`
	 * @example Zed: `editor.indent_guide`, `editor.active_indent_guide`
	 */
	indentGuide: {
		/** Default indent guide color */
		background: ColorValue;
		/** Indent guide for the active scope */
		activeBackground: ColorValue;
	};

	/**
	 * Whitespace character rendering (spaces, tabs).
	 * @example VS Code: `editorWhitespace.foreground`
	 * @example Zed: `editor.invisible`
	 */
	whitespace: {
		foreground: ColorValue;
	};

	/**
	 * Editor ruler (vertical line at column position).
	 * @example VS Code: `editorRuler.foreground`
	 * @example Zed: `editor.wrap_guide`
	 */
	ruler: {
		foreground: ColorValue;
	}

	/**
	 * Line number gutter colors.
	 * @example VS Code: `editorLineNumber.foreground`, `editorLineNumber.activeForeground`
	 * @example Zed: `editor.line_number`, `editor.active_line_number`
	 */
	lineNumbers: {
		/** Default line number color */
		foreground: ColorValue;
		/** Active/current line number color */
		activeForeground: ColorValue;
	};

	/**
	 * Inlay hints (inline type hints, parameter names).
	 * @example VS Code: `editorInlayHint.foreground`, `editorInlayHint.background`
	 */
	inlineHints: {
		foreground: ColorValue;
		background: ColorValue;
		border: ColorValue;
	}

	/**
	 * Hover information widget (documentation popups).
	 * @example VS Code: `editorHoverWidget.background`, `editorHoverWidget.foreground`
	 */
	hoverWidget: {
		background: ColorValue;
		foreground: ColorValue;
		border: ColorValue;
	};

	/**
	 * Git/SCM decoration colors for file status in explorer and SCM views.
	 * @example VS Code: `gitDecoration.addedResourceForeground`, `gitDecoration.modifiedResourceForeground`
	 * @example Zed: `created`, `modified`, `deleted`
	 */
	git: {
		/** New/added files */
		added: ColorValue;
		/** Modified/changed files */
		modified: ColorValue;
		/** Deleted/removed files */
		deleted: ColorValue;
		/** Untracked files (not in git) */
		untracked?: ColorValue;
		/** Ignored files (in .gitignore) */
		ignored?: ColorValue;
		/** Files with merge conflicts */
		conflict?: ColorValue;
		/**
		 * Color for renamed files in file explorer/SCM views.
		 * @example VS Code: `gitDecoration.renamedResourceForeground`
		 * @example Zed: `renamed`
		 */
		renamed?: ColorValue;
		/**
		 * Color for staged modified files.
		 * @example VS Code: `gitDecoration.stageModifiedResourceForeground`
		 */
		stageModified?: ColorValue;
		/**
		 * Color for staged deleted files.
		 * @example VS Code: `gitDecoration.stageDeletedResourceForeground`
		 */
		stageDeleted?: ColorValue;
		/**
		 * Color for submodule resources.
		 * @example VS Code: `gitDecoration.submoduleResourceForeground`
		 */
		submodule?: ColorValue;
	};

	/**
	 * Editor cursor appearance.
	 * @example VS Code: `editorCursor.foreground`
	 * @example Zed: player cursor color
	 */
	cursor: {
		foreground: ColorValue;
	};

	/**
	 * Window chrome colors (borders, title bar accents).
	 * @example VS Code: `window.activeBorder`, `window.inactiveBorder`
	 */
	window?: {
		/** Border color when window is focused */
		activeBorder?: ColorValue;
		/** Border color when window is not focused */
		inactiveBorder?: ColorValue;
	};

	/**
	 * Default icon colors throughout the UI.
	 * @example VS Code: `icon.foreground`
	 * @example Zed: `icon`, `icon.muted`
	 */
	icon?: {
		/** Default icon color */
		foreground: ColorValue;
		/** Muted/secondary icon color */
		muted?: ColorValue;
		/** Disabled icon color */
		disabled?: ColorValue;
	};

	/**
	 * Focus indicator colors (keyboard navigation).
	 * @example VS Code: `focusBorder`, `contrastBorder`
	 * @example Zed: `border.focused`
	 */
	focus?: {
		/** Border color for focused elements */
		border: ColorValue;
		/** High contrast border (accessibility) */
		contrastBorder?: ColorValue;
	};

	/**
	 * Menu/dropdown colors.
	 * @example VS Code: `menu.background`, `menu.foreground`, etc.
	 */
	menu?: {
		background: ColorValue;
		foreground: ColorValue;
		/** Background when hovering/selecting a menu item */
		selectionBackground: ColorValue;
		/** Foreground when hovering/selecting a menu item */
		selectionForeground: ColorValue;
		/** Separator line between menu sections */
		separatorBackground?: ColorValue;
	};

	/**
	 * Autocomplete/suggestion widget colors.
	 * @example VS Code: `editorSuggestWidget.*`
	 * @example Zed: completion menu styling
	 */
	suggestWidget?: {
		background?: ColorValue;
		foreground?: ColorValue;
		border?: ColorValue;
		/** Background of selected suggestion */
		selectedBackground?: ColorValue;
	};

	/**
	 * Progress bar/indicator colors.
	 * @example VS Code: `progressBar.background`
	 */
	progressBar?: {
		background: ColorValue;
	};

	/**
	 * Debug console output colors.
	 * @example VS Code: `debugConsole.infoForeground`, `debugConsole.errorForeground`, etc.
	 */
	debug?: {
		/** Info messages (stdout, general output) */
		infoForeground: ColorValue;
		/** Warning messages */
		warningForeground: ColorValue;
		/** Error messages (stderr) */
		errorForeground: ColorValue;
		/** Source file references in stack traces */
		sourceForeground?: ColorValue;
	};

	/**
	 * Text content colors (links, preformatted, separators).
	 * @example VS Code: `textLink.foreground`, `textPreformat.*`, `textSeparator.foreground`
	 */
	text?: {
		/** Hyperlink color */
		linkForeground: ColorValue;
		/** Preformatted/code text background */
		preformatBackground?: ColorValue;
		/** Preformatted/code text foreground */
		preformatForeground?: ColorValue;
		/** Separator line color */
		separatorForeground?: ColorValue;
	};

	/**
	 * Error display colors (editor squiggles, list items).
	 * @example VS Code: `editorError.background`, `list.errorForeground`
	 */
	error?: {
		/** Background behind error text/squiggles */
		background?: ColorValue;
		/** Error text in lists/trees */
		listForeground?: ColorValue;
	};

	/**
	 * Peek view colors (inline reference/definition views).
	 * @example VS Code: `peekViewEditor.matchHighlightBackground`, `peekViewTitleDescription.foreground`
	 */
	peekView?: {
		/** Highlight color for matches in peek editor */
		matchHighlightBackground?: ColorValue;
		/** Title description text color */
		titleDescriptionForeground?: ColorValue;
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
