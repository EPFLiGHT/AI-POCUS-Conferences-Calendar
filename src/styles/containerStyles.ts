/**
 * Container Styles
 *
 * Reusable container/box style objects for consistent card layouts.
 * These styles define the dark card containers used throughout the app.
 *
 * Usage: <Box {...whiteCardStyle}>Content</Box>
 */

import { BoxProps } from '@chakra-ui/react';
import { SHADOWS, SURFACE } from '@/theme';

export const whiteCardStyle: Partial<BoxProps> = {
  bg: SURFACE.card,
  borderRadius: 'xl',
  border: '1px',
  borderColor: SURFACE.border,
  boxShadow: SHADOWS.md,
};

export const paginationContainerStyle: Partial<BoxProps> = {
  ...whiteCardStyle,
  p: '6',
};
