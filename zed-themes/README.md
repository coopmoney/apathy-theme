# Apathy Theme for Zed

A sophisticated dark color theme for [Zed editor](https://zed.dev), ported from the original VS Code version. Apathy features deep purple/black backgrounds with vibrant, neon-like syntax highlighting for excellent contrast and readability.

## Variants

This port includes two variants:

- **Apathy**: The original theme with deep purple-black backgrounds
- **Apathetic Ocean**: A slightly lighter variant with blue-tinted backgrounds
- **Minted**: A mint-forward variant with brighter greens for strings and functions

## Installation

### Option 1: Manual Installation (Recommended)

1. Open your Zed themes directory:
   ```bash
   # On macOS/Linux
   mkdir -p ~/.config/zed/themes

   # On Windows
   mkdir %APPDATA%\Zed\themes
   ```

2. Copy the theme files to the themes directory:
   ```bash
   # On macOS/Linux
   cp apathy.json ~/.config/zed/themes/
   cp apathetic-ocean.json ~/.config/zed/themes/
   cp minted.json ~/.config/zed/themes/

   # On Windows
   copy apathy.json %APPDATA%\Zed\themes\
   copy apathetic-ocean.json %APPDATA%\Zed\themes\
   copy minted.json %APPDATA%\Zed\themes\
   ```

3. Restart Zed or reload the configuration

4. Open the theme selector with `Cmd+K` `Cmd+T` (macOS) or `Ctrl+K` `Ctrl+T` (Windows/Linux)

5. Search for "Apathy", "Apathetic Ocean", or "Minted" and select it

### Option 2: Using Settings

Alternatively, you can set the theme directly in your settings:

1. Open your Zed settings (`Cmd+,` on macOS or `Ctrl+,` on Windows/Linux)

2. Add or update the theme setting:
   ```json
   {
     "theme": "Apathy"
   }
   ```

   Or for the Ocean variant:
   ```json
   {
     "theme": "Apathetic Ocean"
   }
   ```
   
   Or for the minty variant:
   ```json
   {
     "theme": "Minted"
   }
   ```

## Features

- **Deep Dark Background**: Rich purple-black background that's easy on the eyes
- **Vibrant Syntax Highlighting**: Carefully chosen colors for excellent contrast
- **Comprehensive UI Theming**: Full Zed interface theming including sidebars, panels, and status bar
- **Terminal Colors**: Custom ANSI color scheme for the integrated terminal
- **Git Integration**: Clear colors for git decorations and diff highlighting

## Color Palette

The theme uses a carefully curated color palette including:

- **Background**: `#0e0b13` (Apathy) / `#0e0e15` (Ocean)
- **Foreground**: `#e3e1e8` / `#96a5b6`
- **Keywords**: `#afd1e9` / `#998fe1`
- **Strings**: `#b1d36d` / `#aac17b` / `#c3dc8f`
- **Functions**: `#ffb547` / `#f5e0dc` / `#7ce6bc`
- **Numbers**: `#33b3cc`
- **Operators**: `#e60063`
- **Comments**: `#4D4A56` / `#383d51`

## Customization

You can further customize the theme by adding overrides to your Zed settings:

```json
{
  "theme": "Apathy",
  "theme_overrides": {
    "Apathy": {
      "editor.background": "#0a0a0f",
      "syntax": {
        "comment": {
          "font_style": "italic"
        }
      }
    }
  }
}
```

## Recommended Font Settings

For the best experience with Apathy, we recommend using a programming font with ligatures. Here's an example configuration using Monaspace:

```json
{
  "theme": "Apathy",
  "buffer_font_family": "Monaspace Neon",
  "buffer_font_size": 11,
  "buffer_line_height": {
    "custom": 1.6
  }
}
```

## Troubleshooting

### Theme doesn't appear in the selector

1. Ensure the theme files are in the correct directory (`~/.config/zed/themes/`)
2. Make sure the JSON files are valid (you can validate them at [jsonlint.com](https://jsonlint.com))
3. Restart Zed completely

### Colors look different than expected

Zed may be applying your system's color profile. Check your Zed settings to ensure hardware acceleration is enabled and your display profile is correct.

## Credits

- Original Atom theme by Cooper Maruyama
- Ported to VS Code by Cooper Maruyama
- Ported to Zed by Cooper Maruyama

## License

MIT License - see the main repository for details.

## Feedback

If you encounter any issues or have suggestions for improvements, please:

1. Check the [VS Code version](https://marketplace.visualstudio.com/items?itemName=coopermaruyama.apathy-theme) for reference
2. Open an issue on the [GitHub repository](https://github.com/coopermaruyama/apathy-theme)

---

**Enjoy coding with Apathy in Zed! 💜**
