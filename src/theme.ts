import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#f3eefa' },
          100: { value: '#e4d8f5' },
          200: { value: '#c9b0eb' },
          300: { value: '#a87de0' },
          400: { value: '#7D40D2' },
          500: { value: '#6a32b8' },
          600: { value: '#56289e' },
          700: { value: '#3d1c73' },
          800: { value: '#271250' },
          900: { value: '#141142' },
        },
        accent: {
          blue: { value: '#ACCEEC' },
          orange: { value: '#FB9745' },
          red: { value: '#AA2B42' },
        },
      },
      fonts: {
        body: { value: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' },
        heading: { value: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: '{colors.brand.400}' },
        'primary.solid': { value: '{colors.brand.400}' },
        'primary.contrast': { value: 'white' },
      },
    },
  },
  globalCss: {
    'button, a': {
      transition: 'all 0.2s ease-in-out',
    },
    'button:active': {
      transform: 'scale(0.98)',
    },

  },
}))

// ============================================
// CONSTANTS
// ============================================

// RGB values for building alpha colors
const RGB = {
  blue: '172, 206, 236',   // #ACCEEC (Openness)
  purple: '125, 64, 210',  // #7D40D2 (Equity)
  red: '170, 43, 66',      // #AA2B42 (Independence)
  orange: '251, 151, 69',  // #FB9745 (Collaborative)
  navy: '20, 17, 66',      // #141142 (Scientific Rigor)
} as const;

// Helper to build rgba strings from the centralized RGB values
const blueAlpha = (a: number) => `rgba(${RGB.blue}, ${a})`;
const purpleAlpha = (a: number) => `rgba(${RGB.purple}, ${a})`;
const redAlpha = (a: number) => `rgba(${RGB.red}, ${a})`;
const orangeAlpha = (a: number) => `rgba(${RGB.orange}, ${a})`;
const navyAlpha = (a: number) => `rgba(${RGB.navy}, ${a})`;

const COLORS = {
  brand: {
    50: '#f3eefa',
    100: '#e4d8f5',
    200: '#c9b0eb',
    300: '#a87de0',
    400: '#7D40D2',
    500: '#6a32b8',
    600: '#56289e',
    700: '#3d1c73',
    800: '#271250',
    900: '#141142',
  },
  accent: {
    blue: '#ACCEEC',
    orange: '#FB9745',
    red: '#AA2B42',
  },
} as const;

/**
 * Dark-theme surface & text tokens.
 * Every component should pull from here instead of using raw rgba() strings.
 *
 * Naming convention:
 *   surface.*   – backgrounds
 *   border.*    – border colors
 *   text.*      – text / icon colors
 *   state.*     – interactive / status states
 */
export const SURFACE = {
  // --- Backgrounds ---
  page: COLORS.brand[900],                // #141142
  card: blueAlpha(0.06),                  // subtle blue tint
  cardInner: blueAlpha(0.04),             // nested containers
  elevated: '#1c1758',                    // modals, tooltips, dropdowns
  input: blueAlpha(0.08),                 // search / select fields
  brandMuted: purpleAlpha(0.1),           // purple-tinted interactive bg
  brandLight: purpleAlpha(0.12),          // selected / active items
  brandStrong: purpleAlpha(0.15),         // highlighted items (first presentation)

  // --- Borders ---
  border: blueAlpha(0.15),               // default card / container border
  borderSubtle: blueAlpha(0.12),         // inner / nested borders
  borderHover: blueAlpha(0.35),          // input hover
  borderFocus: COLORS.brand[400],        // input focus (solid purple)
  borderBrand: purpleAlpha(0.25),        // purple-tinted borders
  borderBrandStrong: purpleAlpha(0.3),   // stronger purple borders
  borderBrandHover: purpleAlpha(0.5),    // purple hover borders

  // --- Text ---
  textPrimary: '#ffffff',
  textSecondary: COLORS.accent.blue,     // #ACCEEC
  textMuted: blueAlpha(0.7),             // labels, secondary info
  textSubtle: blueAlpha(0.6),            // uppercase headers, field labels
  textFaint: blueAlpha(0.5),             // placeholders, empty states
  textBrand: COLORS.brand[300],          // #a87de0 – purple accent text

  // --- Accent text (per colour-matching rules) ---
  textOrange: COLORS.accent.orange,      // #FB9745 – countdown numbers, summits
  textRed: COLORS.accent.red,            // #AA2B42 – expired, errors

  // --- Status states ---
  expired: {
    bg: redAlpha(0.12),
    border: redAlpha(0.3),
    text: COLORS.accent.red,
  },
  active: {
    bg: purpleAlpha(0.1),
    border: purpleAlpha(0.2),
  },

  // --- Type badge colors ---
  type: {
    conference: { bg: purpleAlpha(0.15), color: COLORS.brand[300], border: purpleAlpha(0.3) },
    workshop:   { bg: blueAlpha(0.12),   color: COLORS.accent.blue,  border: blueAlpha(0.3) },
    summit:     { bg: orangeAlpha(0.12), color: COLORS.accent.orange, border: orangeAlpha(0.3) },
    seminar:    { bg: purpleAlpha(0.1),  color: COLORS.brand[300],   border: purpleAlpha(0.25) },
  },

  // --- Gradients ---
  gradientBrand: `linear-gradient(135deg, ${COLORS.brand[400]} 0%, ${COLORS.brand[900]} 100%)`,

  // --- Backdrop ---
  backdrop: navyAlpha(0.75),
} as const;

// Shadows (purple-tinted for dark theme)
export const SHADOWS = {
  sm: `0 1px 3px ${purpleAlpha(0.08)}`,
  md: `0 2px 8px ${purpleAlpha(0.08)}`,
  lg: `0 4px 12px ${purpleAlpha(0.3)}`,
  hover: {
    secondary: `0 2px 8px ${purpleAlpha(0.15)}`,
    primary: `0 4px 12px ${purpleAlpha(0.4)}`,
    card: `0 8px 24px ${purpleAlpha(0.25)}`,
  },
  modal: `0 20px 60px ${purpleAlpha(0.3)}`,
} as const;

// Transitions
export const TRANSITIONS = {
  fast: 'all 0.15s ease-in-out',
  normal: 'all 0.2s ease-in-out',
  slow: 'all 0.3s ease-in-out',
} as const;

