import ColorLib, { ColorInstance } from "color";

// ============================================================================
// Core Color Type
// ============================================================================

/**
 * A color value - either a hex string or a Color instance.
 * Use this throughout theme definitions. Resolved to hex at build time.
 */
export type ColorLike = string | Color;

/**
 * Normalize any color string to 8-digit hexa (#RRGGBBAA) format.
 * Passes through empty strings and non-color values unchanged.
 */
function normalizeHexa(value: string): string {
  if (!value) return value;
  // Already 8-digit hex
  if (/^#[0-9a-fA-F]{8}$/.test(value)) return value;
  // 6-digit hex → add FF alpha
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value + "ff";
  // 4-digit hex (#RGBA) → expand
  if (/^#[0-9a-fA-F]{4}$/.test(value)) {
    const [, r, g, b, a] = value.split("");
    return `#${r}${r}${g}${g}${b}${b}${a}${a}`;
  }
  // 3-digit hex → expand + add FF alpha
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    const [, r, g, b] = value.split("");
    return `#${r}${r}${g}${g}${b}${b}ff`;
  }
  // Other formats (rgb, hsl, etc.) — try parsing via Color library
  try {
    return ColorLib(value).hexa();
  } catch {
    return value;
  }
}

/**
 * Resolve any ColorLike value to an 8-digit hexa string (#RRGGBBAA).
 */
export function toHex(value: unknown): string {
  if (typeof value === "string") return normalizeHexa(value);
  if (value instanceof Color) return value.hexa();
  try {
    const v = value as any;
    if (v == null) return "";
    if (typeof v.hexa === "function") return v.hexa();
    if (typeof v.hex === "function") return normalizeHexa(v.hex());
    if (v.cv && typeof v.cv.hexa === "function") return v.cv.hexa();
    if (v.cv && typeof v.cv.hex === "function") return normalizeHexa(v.cv.hex());
    if (typeof v.toString === "function") return normalizeHexa(v.toString());
  } catch {
    // fallthrough
  }
  return normalizeHexa(String(value as any));
}

// ============================================================================
// Color Class
// ============================================================================

export class Color {
  cv: ColorInstance;

  constructor(input: string | ColorInstance | Color) {
    if (input instanceof Color) {
      this.cv = input.cv;
    } else {
      this.cv = typeof input === "string" ? ColorLib(input) : input;
    }
  }

  // --- Core transforms (all return Color for chaining) ---

  lighter(n = 0.2): Color {
    return new Color(this.cv.lighten(n));
  }
  darker(n = 0.2): Color {
    return new Color(this.cv.darken(n));
  }
  transparent(amount = 0.5): Color {
    return new Color(this.cv.alpha(amount));
  }
  alpha(amount: number): Color {
    return new Color(this.cv.alpha(amount));
  }
  rotate(degrees = 30): Color {
    return new Color(this.cv.rotate(degrees));
  }
  saturate(amount = 0.2): Color {
    return new Color(this.cv.saturate(amount));
  }
  desaturate(amount = 0.2): Color {
    return new Color(this.cv.desaturate(amount));
  }

  // --- Mixing ---

  /** Mix this color with another by weight (0 = all this, 1 = all other) */
  mix(other: Color | string, weight = 0.5): Color {
    const otherCv = other instanceof Color ? other.cv : ColorLib(other);
    return new Color(this.cv.mix(otherCv, weight));
  }

  // --- Accent generation ---

  /** Mix toward a target color, then optionally lighten */
  accent(target: Color | string, mixAmt = 0.1, lightenAmt = 0.1): Color {
    const targetCv = target instanceof Color ? target.cv : ColorLib(target);
    return new Color(this.cv.mix(targetCv, mixAmt).lighten(lightenAmt));
  }

  /** Generate a warm accent (rotate toward orange/red) */
  warm(intensity = 0.15): Color {
    return new Color(this.cv.rotate(-20).saturate(intensity).lighten(intensity * 0.5));
  }

  /** Generate a cool accent (rotate toward blue/cyan) */
  cool(intensity = 0.15): Color {
    return new Color(this.cv.rotate(20).saturate(intensity).lighten(intensity * 0.5));
  }

  /** Generate a complementary accent */
  complement(): Color {
    return new Color(this.cv.rotate(180));
  }

  /** Generate an analogous set (±30°) */
  analogous(): [Color, Color] {
    return [new Color(this.cv.rotate(-30)), new Color(this.cv.rotate(30))];
  }

  // --- Channel accessors (for filter support) ---

  luminosity(): number { return this.cv.luminosity(); }
  red(): number { return this.cv.red(); }
  green(): number { return this.cv.green(); }
  blue(): number { return this.cv.blue(); }

  // --- Output ---

  hex(): string {
    return this.cv.hex();
  }
  hexa(): string {
    return this.cv.hexa();
  }

  /** Allows Color instances to work in string contexts (template literals, etc.) */
  toString(): string {
    return this.hexa();
  }

  /** Allows Color to serialize to hexa in JSON.stringify */
  toJSON(): string {
    return this.hexa();
  }

  /** Allows Color to coerce to string in loose comparisons */
  valueOf(): string {
    return this.hexa();
  }
}


export interface WithState<T> {
  default: T;
  hovered: T;
  active: T;
  selected: T;
  disabled: T;
}

export class StatefulColor {
  value: Color;
  accent: Color;
  base?: Color;
  states?: Partial<WithState<Color>>;

  constructor(
    value: Color,
    accent: Color,
    base = new Color("#000000"),
    stateColors?: Partial<WithState<Color>>
  ) {
    this.value = value;
    this.accent = accent;
    this.base = base;
    this.states = stateColors;
  }

  hovered(): Color {
    return this.states?.hovered || this.value.lighter(0.1);
  }

  active(): Color {
    return this.states?.active || this.value.mix(this.accent, 0.2);
  }

  selected(): Color {
    return this.states?.selected || this.value.mix(this.accent, 0.3).lighter(0.1);
  }

  disabled(): Color {
    return this.states?.disabled || this.value.desaturate(0.5).transparent(0.5);
  }
}


// ============================================================================
// Factory helpers
// ============================================================================

/** Create a Color from a hex string */
export function c(input: string): Color {
  return new Color(input);
}

/** Convert an object of hex strings into an object of Color instances */
export function makeColors<T extends object>(palette: T): { [K in keyof T]: Color } {
  const result: any = {};
  for (const key in palette) {
    const val = palette[key];
    if (typeof val === "string") {
      result[key] = new Color(val);
    }
  }
  return result;
}