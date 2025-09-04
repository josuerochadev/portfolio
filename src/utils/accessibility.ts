/**
 * Accessibility utility functions for color contrast and WCAG compliance
 */

/**
 * Calculate relative luminance of a color
 * Used for WCAG contrast ratio calculations
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns ratio from 1 to 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Simple hex to RGB conversion (expand for more color formats)
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);
  
  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);
  
  const lum1 = getLuminance(r1, g1, b1);
  const lum2 = getLuminance(r2, g2, b2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAG_AA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 4.5;
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAG_AAA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 7;
}

/**
 * Portfolio color contrast checks
 */
export const COLOR_AUDIT = {
  VIOLET_ON_WHITE: getContrastRatio('#6900FF', '#FFFFFF'), // ~6.5
  VIOLET_DARK_ON_WHITE: getContrastRatio('#5500CC', '#FFFFFF'), // ~8.9
  ORANGE_ON_WHITE: getContrastRatio('#FF7A00', '#FFFFFF'), // ~3.1 (⚠️ FAIL)
  LIME_ON_VIOLET: getContrastRatio('#B5FF00', '#6900FF'), // ~7.8
};