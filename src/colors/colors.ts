export const colors = {
	// ═══════════════════════════════════════════════════════════════════════════
	// TRANSPARENT
	// ═══════════════════════════════════════════════════════════════════════════
	transparent: "#00000000",

	// ═══════════════════════════════════════════════════════════════════════════
	// BLACKS & VOIDS (Background tiers)
	// ═══════════════════════════════════════════════════════════════════════════
	void: "#04041b", // Deepest background
	abyss: "#0b0915", // Very dark blue-tinted
	midnight: "#0e0a12", // Dark purple-tinted
	obsidian: "#0f0e10", // Neutral dark
	cinder: "#0e0e15", // Slightly blue dark
	eclipse: "#0f0d1a", // Dark with blue undertone
	charcoal: "#121217", // Slightly lifted dark
	onyx: "#14141b", // Dark slate

	// ═══════════════════════════════════════════════════════════════════════════
	// DARK BACKGROUNDS (Elevated surfaces)
	// ═══════════════════════════════════════════════════════════════════════════
	shadow: "#1a102b", // Dark purple
	dusk: "#1b1629", // Muted purple-dark
	twilight: "#1c1c25", // Neutral dark elevated
	nightfall: "#212131", // Blue-tinted elevated
	storm: "#272636", // Storm cloud dark
	grape: "#2a2441", // Purple-tinted surface
	plum: "#2a273f", // Muted purple surface
	raisin: "#331f57", // Rich dark purple

	// ═══════════════════════════════════════════════════════════════════════════
	// GRAYS (UI elements, borders, muted text)
	// ═══════════════════════════════════════════════════════════════════════════
	slate: "#3f3b5a", // Dark purple-gray
	iron: "#454148", // Neutral dark gray
	steel: "#45414c", // Cool dark gray
	graphite: "#4d4a56", // Medium dark gray
	pewter: "#626274", // Purple-tinted gray
	fog: "#747277", // Neutral mid gray
	smoke: "#7d7a8b", // Light purple-gray
	silver: "#808080", // True neutral gray
	ash: "#8b8f91", // Cool gray
	mist: "#95969f", // Light gray
	cloud: "#b5b5b5", // Very light gray

	// ═══════════════════════════════════════════════════════════════════════════
	// WHITES & NEAR-WHITES (Text, foreground)
	// ═══════════════════════════════════════════════════════════════════════════
	bone: "#c3c1d3", // Muted off-white
	pearl: "#d0cfd3", // Standard text color
	ivory: "#d1d3d9", // Blue-tinted white
	snow: "#dedede", // Neutral near-white
	frost: "#e3e1e8", // Purple-tinted white
	cream: "#e6e2d1", // Warm off-white
	milk: "#f8f8f0", // Warm white
	white: "#ffffff", // Pure white

	// ═══════════════════════════════════════════════════════════════════════════
	// REDS (Errors, deletions, warnings)
	// ═══════════════════════════════════════════════════════════════════════════
	crimson: "#b70b24", // Deep vivid red
	ruby: "#e61f44", // Bright red
	coral: "#da4c51", // Soft red
	salmon: "#cc6666", // Muted coral red
	rose: "#e46876", // Pink-red
	flamingo: "#f07178", // Light coral
	blush: "#ff6188", // Hot pink-red
	cherry: "#ff6161", // Bright cherry
	peach: "#fe90a0", // Soft pink

	// ═══════════════════════════════════════════════════════════════════════════
	// ORANGES (Warnings, decorators, special)
	// ═══════════════════════════════════════════════════════════════════════════
	ember: "#ff7a00", // Vivid orange
	tangerine: "#ffa114", // Bright orange
	apricot: "#faa629", // Soft orange
	honey: "#f7b83d", // Golden orange
	amber: "#ffb547", // Light amber
	gold: "#e9c062", // Muted gold
	butterscotch: "#ffcb6b", // Light orange
	wheat: "#ffe082", // Pale orange

	// ═══════════════════════════════════════════════════════════════════════════
	// YELLOWS (Strings, special values)
	// ═══════════════════════════════════════════════════════════════════════════
	mustard: "#e6d86b", // Muted yellow
	lemon: "#e6db74", // Classic string yellow
	canary: "#ffd866", // Bright yellow
	butter: "#dcdcaa", // Soft yellow

	// ═══════════════════════════════════════════════════════════════════════════
	// GREENS (Strings, success, additions)
	// ═══════════════════════════════════════════════════════════════════════════
	forest: "#4d7461", // Dark muted green
	olive: "#a7da1e", // Vivid yellow-green
	lime: "#a6e22e", // Classic bright green
	grass: "#afe641", // Light lime
	sage: "#b1d36d", // Soft green
	mint: "#79e3bd", // Cyan-green
	spring: "#7ce6ab", // Light mint
	jade: "#88c6a8", // Muted teal
	clover: "#c3e88d", // Pale lime green
	pistachio: "#d7f2a6", // Very light green
	neon: "#a8ff60", // Bright neon green

	// ═══════════════════════════════════════════════════════════════════════════
	// CYANS (Keywords, special syntax)
	// ═══════════════════════════════════════════════════════════════════════════
	teal: "#449dab", // Muted teal
	ocean: "#33b3cc", // Bright cyan
	turquoise: "#78dce8", // Light cyan
	aqua: "#93e3db", // Soft aqua
	seafoam: "#95d4ca", // Muted seafoam
	lagoon: "#a1efe4", // Light turquoise
	arctic: "#89ddff", // Ice blue
	glacier: "#a3eeff", // Very light cyan

	// ═══════════════════════════════════════════════════════════════════════════
	// BLUES (Functions, variables)
	// ═══════════════════════════════════════════════════════════════════════════
	navy: "#4b6672", // Dark desaturated blue
	denim: "#5983a2", // Muted blue
	cobalt: "#6183bb", // Classic blue
	azure: "#82aaff", // Bright blue
	sky: "#8db9e2", // Light blue
	periwinkle: "#91aac0", // Desaturated light blue
	cornflower: "#9ec3ff", // Very light blue

	// ═══════════════════════════════════════════════════════════════════════════
	// PURPLES (Keywords, special, types)
	// ═══════════════════════════════════════════════════════════════════════════
	eggplant: "#5b0092", // Deep vivid purple
	violet: "#7a73cc", // Medium purple
	amethyst: "#9b8fb5", // Desaturated purple
	lavender: "#c792ea", // Classic light purple
	orchid: "#c574dd", // Bright magenta-purple
	lilac: "#d09bd2", // Soft pink-purple
	heather: "#dda4ff", // Very light purple

	// ═══════════════════════════════════════════════════════════════════════════
	// PINKS (Special, decorative)
	// ═══════════════════════════════════════════════════════════════════════════
	magenta: "#e60063", // Vivid magenta
	hotpink: "#f184bc", // Bright pink

	// ═══════════════════════════════════════════════════════════════════════════
	// ALPHA VARIANTS (Commonly used transparencies)
	// ═══════════════════════════════════════════════════════════════════════════
	blackAlpha50: "#00000080",
	shadowAlpha60: "#1b162994",
	grapeAlpha25: "#2a244140",
	grapeAlpha40: "#2a24416b",
	steelAlpha50: "#45414c80",
	fogAlpha60: "#74727794",
	smokeAlpha80: "#827b90cf",
	cloudAlpha25: "#b5b5b545",
	pearlAlpha50: "#d0cfd380",
	frostAlpha50: "#e3e1e880",
	frostAlpha70: "#e3e1e8b7",
	frostAlpha90: "#e3e1e8e4",
	whiteAlpha60: "#ffffff99",

	// ═══════════════════════════════════════════════════════════════════════════
	// SPECIAL ACCENTS (Glows, highlights)
	// ═══════════════════════════════════════════════════════════════════════════
	neonMintAlpha95: "#3fffbdf2",
	arcticGlow: "#80ffecba",
	mintGlow: "#6bffbfdb",
};

export const dev = {
	"#e1e2e5": "#e1e2e5",
	"#949494": "#949494",
	"#7e89ec": "#7e89ec",
	"#1abdda": "#1abdda",
	"#88e6d6": "#88e6d6",
	"#C3E88D": "#C3E88D",
	"#ffb389": "#ffb389",
	"#F07178": "#F07178",
	"#6bffbfdb": "#6bffbfdb",
	"#ff9d9ddf": "#ff9d9ddf",
	"#efadeab0": "#efadeab0",
};
