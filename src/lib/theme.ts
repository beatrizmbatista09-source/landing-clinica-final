import type { Clinic } from '@/types/clinic';

/** Inject a clinic's brand colors as CSS custom properties on :root. */
export function applyClinicTheme(clinic: Clinic): void {
  const root = document.documentElement;
  root.style.setProperty('--brand', clinic.primary_color);
  root.style.setProperty('--accent', clinic.accent_color);

  // Lighter/darker tints for gradients and surfaces
  root.style.setProperty('--brand-dark', shade(clinic.primary_color, -0.25));
  root.style.setProperty('--brand-light', shade(clinic.primary_color, 0.12));
  root.style.setProperty('--accent-light', shade(clinic.accent_color, 0.12));
}

/** Convert a hex color to {r,g,b}. */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/** Convert {r,g,b} back to a hex string. */
function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    '#' +
    [r, g, b]
      .map((v) => clamp(v).toString(16).padStart(2, '0'))
      .join('')
  );
}

/** Lighten (positive) or darken (negative) a hex color by an amount 0..1. */
function shade(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  if (amount >= 0) {
    return rgbToHex(
      r + (255 - r) * amount,
      g + (255 - g) * amount,
      b + (255 - b) * amount,
    );
  }
  const a = 1 + amount;
  return rgbToHex(r * a, g * a, b * a);
}
