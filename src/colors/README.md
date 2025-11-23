# Apathy Theme Color Palettes

This directory contains TypeScript files with all distinct colors used in each theme variant, along with descriptive names.

## Files

- **ApatheticOcean.ts** - 176 unique colors from the Apathetic Ocean theme
- **Apathy.ts** - 159 unique colors from the Apathy theme
- **ApathyExperimental.ts** - 149 unique colors from the Apathy Experimental theme
- **index.ts** - Exports all color palettes

## Color Naming Convention

Colors are automatically named based on their HSL properties:

### Hue Names
- `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `magenta`, `pink`
- For very low saturation: `black`, `darkGray`, `gray`, `lightGray`, `white`

### Lightness Modifiers
- `veryDark` - L < 20%
- `dark` - 20% ≤ L < 35%
- `muted` - 35% ≤ L < 50%
- (no modifier) - 50% ≤ L < 65%
- `light` - 65% ≤ L < 80%
- `veryLight` - L ≥ 80%

### Saturation Modifiers
- `Desaturated` - 10% ≤ S < 30%
- `Vivid` - S ≥ 70%

### Alpha Channel
When a color has transparency, it's indicated with `Alpha` + percentage, e.g., `blackAlpha50` for 50% opacity.

### Examples
- `#0f0f12` → `black2`
- `#33b3cc` → `cyan`
- `#82aaff` → `lightVividblue`
- `#00000080` → `blackAlpha50`
- `#e3e1e8e4` → `veryLightDesaturatedpurpleAlpha89`

## Usage

```typescript
import { ApatheticOceanColors, ApathyColors } from './colors';

// Access specific colors
const bgColor = ApatheticOceanColors.black;
const accentColor = ApathyColors.cyan;

// Use with type safety
import type { ApatheticOceanColor } from './colors';
const myColor: ApatheticOceanColor = 'lightVividblue';
```

## Notes

- Colors with duplicate generated names get a numeric suffix (e.g., `black`, `black2`, `black3`)
- All hex values are lowercase for consistency
- Colors are sorted alphabetically by name within each file


