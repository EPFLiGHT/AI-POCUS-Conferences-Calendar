const SUBJECT_COLOR_PALETTES = {
  blue: { bg: 'rgba(37, 99, 235, 0.12)', color: '#60a5fa', border: 'rgba(37, 99, 235, 0.3)' },
  purple: { bg: 'rgba(147, 51, 234, 0.12)', color: '#c084fc', border: 'rgba(147, 51, 234, 0.3)' },
  green: { bg: 'rgba(22, 163, 106, 0.12)', color: '#4ade80', border: 'rgba(22, 163, 106, 0.3)' },
  orange: { bg: 'rgba(251, 151, 69, 0.12)', color: '#FB9745', border: 'rgba(251, 151, 69, 0.3)' },
  red: { bg: 'rgba(170, 43, 66, 0.12)', color: '#f87171', border: 'rgba(170, 43, 66, 0.3)' },
  pink: { bg: 'rgba(219, 39, 119, 0.12)', color: '#f472b6', border: 'rgba(219, 39, 119, 0.3)' },
  cyan: { bg: 'rgba(8, 145, 178, 0.12)', color: '#22d3ee', border: 'rgba(8, 145, 178, 0.3)' },
  teal: { bg: 'rgba(13, 148, 136, 0.12)', color: '#2dd4bf', border: 'rgba(13, 148, 136, 0.3)' },
  indigo: { bg: 'rgba(79, 70, 229, 0.12)', color: '#818cf8', border: 'rgba(79, 70, 229, 0.3)' },
  violet: { bg: 'rgba(124, 58, 237, 0.12)', color: '#a78bfa', border: 'rgba(124, 58, 237, 0.3)' },
  rose: { bg: 'rgba(225, 29, 72, 0.12)', color: '#fb7185', border: 'rgba(225, 29, 72, 0.3)' },
} as const;

const SUBJECTS: Record<string, { label: string; colors: { bg: string; color: string; border: string } }> = {
  ML:  { label: 'Machine Learning',             colors: SUBJECT_COLOR_PALETTES.blue },
  CV:  { label: 'Computer Vision',              colors: SUBJECT_COLOR_PALETTES.purple },
  NLP: { label: 'Natural Language Processing',   colors: SUBJECT_COLOR_PALETTES.green },
  DM:  { label: 'Data Mining',                  colors: SUBJECT_COLOR_PALETTES.orange },
  HCI: { label: 'Human-Computer Interaction',   colors: SUBJECT_COLOR_PALETTES.pink },
  SEC: { label: 'Security',                     colors: SUBJECT_COLOR_PALETTES.teal },
  SE:  { label: 'Software Engineering',         colors: SUBJECT_COLOR_PALETTES.rose },
  AI:  { label: 'Artificial Intelligence',       colors: SUBJECT_COLOR_PALETTES.indigo },
  'Global Health': { label: 'Global Health',     colors: SUBJECT_COLOR_PALETTES.cyan },
  'Health AI':     { label: 'Health AI',         colors: SUBJECT_COLOR_PALETTES.violet },
} as const;

export const SUBJECT_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(SUBJECTS).map(([k, v]) => [k, v.label])
);

export const SUBJECT_COLORS: Record<string, { bg: string; color: string; border: string }> =
  Object.fromEntries(Object.entries(SUBJECTS).map(([k, v]) => [k, v.colors]));
