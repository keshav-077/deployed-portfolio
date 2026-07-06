// WCAG contrast utilities — pure, framework-free functions for computing
// relative luminance and contrast ratios of hex colors, used to verify that
// Coastal palette pairings meet WCAG AA (design Property 25, R8.5).
//
// Implements the WCAG 2.x definitions:
//   relative luminance: https://www.w3.org/TR/WCAG20/#relativeluminancedef
//   contrast ratio:     https://www.w3.org/TR/WCAG20/#contrast-ratiodef

/** RGB channel triple with each component in the 0..255 range. */
interface Rgb {
  r: number;
  g: number;
  b: number;
}

/**
 * Parses a hex color string into its RGB components.
 *
 * Accepts both shorthand `#rgb` and full `#rrggbb` forms; the leading `#` is
 * optional. Throws on malformed input so callers surface configuration errors
 * rather than silently producing wrong ratios.
 *
 * @param hexColor - A hex color such as "#fff", "fff", "#ffffff", or "ffffff".
 * @returns The parsed RGB channels (0..255).
 */
function parseHex(hexColor: string): Rgb {
  if (typeof hexColor !== 'string') {
    throw new TypeError('hexColor must be a string');
  }

  const hex = hexColor.trim().replace(/^#/, '');

  let normalized: string;
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    // Expand shorthand #rgb -> #rrggbb by doubling each nibble.
    normalized = hex
      .split('')
      .map((ch) => ch + ch)
      .join('');
  } else if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    normalized = hex;
  } else {
    throw new Error(`Invalid hex color: "${hexColor}"`);
  }

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

/**
 * Linearizes a single sRGB channel value per the WCAG relative-luminance
 * definition.
 *
 * @param channel8bit - A channel value in the 0..255 range.
 * @returns The linearized channel value in the 0..1 range.
 */
function linearizeChannel(channel8bit: number): number {
  const c = channel8bit / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Computes the WCAG relative luminance of a hex color (R8.5).
 *
 * @param hexColor - A `#rgb` or `#rrggbb` hex color.
 * @returns The relative luminance in the 0..1 range (0 = black, 1 = white).
 */
export function relativeLuminance(hexColor: string): number {
  const { r, g, b } = parseHex(hexColor);
  return (
    0.2126 * linearizeChannel(r) +
    0.7152 * linearizeChannel(g) +
    0.0722 * linearizeChannel(b)
  );
}

/**
 * Computes the WCAG contrast ratio between a foreground and background color
 * (R8.5). The ratio is symmetric and ranges from 1 (identical) to 21 (black
 * on white).
 *
 * @param fgHex - The foreground (text) hex color.
 * @param bgHex - The background hex color.
 * @returns The contrast ratio in the 1..21 range.
 */
export function contrastRatio(fgHex: string, bgHex: string): number {
  const l1 = relativeLuminance(fgHex);
  const l2 = relativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Reports whether a contrast ratio satisfies WCAG AA (R8.5).
 *
 * Normal text requires a ratio of at least 4.5:1; large-scale text and
 * essential UI components require at least 3:1.
 *
 * @param ratio - A contrast ratio, typically from `contrastRatio`.
 * @param isLargeText - True for large text or UI components (3:1 threshold).
 * @returns True when the ratio meets the applicable AA threshold.
 */
export function meetsAA(ratio: number, isLargeText: boolean): boolean {
  const threshold = isLargeText ? 3 : 4.5;
  return ratio >= threshold;
}
