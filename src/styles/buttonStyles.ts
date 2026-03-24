/**
 * Button Styles
 *
 * Reusable button style objects that can be spread onto Button components.
 * Provides consistent styling for primary, secondary, and brand buttons.
 *
 * Usage: <Button {...primaryButtonStyle}>Click me</Button>
 */

import { ButtonProps } from '@chakra-ui/react';
import { SHADOWS, TRANSITIONS, SURFACE } from '@/theme';

export const primaryButtonStyle: Partial<ButtonProps> = {
  bg: 'brand.400',
  color: 'white',
  fontWeight: '600',
  borderRadius: 'lg',
  transition: TRANSITIONS.normal,
  _hover: {
    bg: 'brand.500',
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.lg,
  },
  _active: {
    transform: 'scale(0.98)',
  },
  _disabled: {
    bg: 'gray.200',
    color: 'gray.400',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
    _hover: {
      bg: 'gray.200',
      transform: 'none',
      boxShadow: 'none',
    },
  },
};

export const secondaryButtonStyle: Partial<ButtonProps> = {
  bg: SURFACE.brandMuted,
  color: SURFACE.textSecondary,
  border: '1px',
  borderColor: SURFACE.borderBrandStrong,
  transition: TRANSITIONS.normal,
  position: 'relative',
  zIndex: 1,
  _hover: {
    bg: SURFACE.brandLight,
    borderColor: 'brand.400',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.hover.secondary,
  },
  _active: {
    transform: 'scale(0.98)',
  },
};

