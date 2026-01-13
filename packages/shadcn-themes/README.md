# Apathy shadcn/ui Themes

This directory contains shadcn/ui compatible themes ported from the Apathy VS Code theme family.

## Available Themes

| Theme | Description | Primary Accent |
|-------|-------------|----------------|
| **Apathy** | Dark, muted theme with warm accents | Crimson `#e60063` |
| **Apathetic Ocean** | Cool, ocean-inspired with muted blues | Seafoam `#7ce6bc` |
| **Minted** | Fresh, mint-inspired with green accents | Seafoam `#7ce6bc` |
| **Slate** | Clean, minimal with purple-gray undertones | Crimson `#E60063` |

## Installation

### Option 1: Copy CSS Variables

1. Open the theme CSS file you want to use (e.g., `apathy.css`)
2. Copy the contents into your `globals.css` or `app.css` file
3. Make sure the variables are within the `@layer base` block

### Option 2: Import the Theme

```css
/* In your globals.css */
@import "./path-to/shadcn-themes/apathy.css";
```

## Usage with Tailwind CSS v4

These themes include the `@theme inline` block for Tailwind CSS v4 compatibility. The color variables are automatically mapped to Tailwind utilities.

## Usage with Tailwind CSS v3

For Tailwind v3, you only need the CSS variables (the `:root` and `.dark` sections). You can remove the `@theme inline` block.

## Theme Switching

All themes support both light and dark modes:

- Light mode: Default (`:root` selector)
- Dark mode: Add the `dark` class to your `<html>` or `<body>` element

```jsx
// Example: Toggle dark mode
<html className={isDark ? 'dark' : ''}>
```

## Color Palette Overview

### Apathy
- Background: Deep purple-black `oklch(0.14 0.02 285)`
- Primary: Crimson pink `oklch(0.55 0.2 340)`
- Accent: Cyan `oklch(0.65 0.12 195)`

### Apathetic Ocean
- Background: Cool dark blue `oklch(0.15 0.015 260)`
- Primary: Seafoam green `oklch(0.75 0.12 165)`
- Accent: Cyan `oklch(0.65 0.1 195)`

### Minted
- Background: Midnight blue `oklch(0.15 0.01 260)`
- Primary: Seafoam `oklch(0.78 0.12 165)`
- Accent: Wasabi `oklch(0.8 0.1 120)`

### Slate
- Background: Dark slate `oklch(0.15 0.01 280)`
- Primary: Crimson `oklch(0.55 0.22 350)`
- Accent: Mint `oklch(0.68 0.1 165)`

## Customization

Feel free to adjust the oklch values to fine-tune the colors. The format is:

```
oklch(lightness chroma hue)
```

- **Lightness**: 0 (black) to 1 (white)
- **Chroma**: 0 (gray) to ~0.4 (maximum saturation)
- **Hue**: 0-360 degrees on the color wheel

## License

MIT - Same as the Apathy VS Code theme
