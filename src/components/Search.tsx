import { Box, Input } from '@chakra-ui/react';
import { SURFACE, SHADOWS } from '@/theme';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps): JSX.Element {
  return (
    <Box mb="8">
      <Input
        type="search"
        placeholder="Search conferences by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="lg"
        fontSize="md"
        bg={SURFACE.input}
        color={SURFACE.textPrimary}
        borderColor={SURFACE.border}
        borderRadius="xl"
        boxShadow={SHADOWS.sm}
        _placeholder={{ color: SURFACE.textFaint }}
        _focus={{
          borderColor: SURFACE.borderFocus,
          boxShadow: `0 0 0 3px ${SURFACE.brandMuted}`,
        }}
        _hover={{
          borderColor: SURFACE.borderHover,
        }}
      />
    </Box>
  );
}
