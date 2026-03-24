import { Box, Heading, Text } from '@chakra-ui/react';
import Search from './Search';
import Filters from './Filters';
import { whiteCardStyle } from '@/styles/containerStyles';
import { SURFACE } from '@/theme';
import type { Conference } from '@/types/conference';
import type { ConferenceFiltersState } from '@/hooks/useConferenceFilters';

interface ConferenceFiltersPanelProps {
  title: string;
  description: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  conferences: Conference[];
  filters: ConferenceFiltersState;
  onFilterChange: (newFilters: Partial<ConferenceFiltersState>) => void;
}

export default function ConferenceFiltersPanel({
  title, description, searchValue, onSearchChange, conferences, filters, onFilterChange,
}: ConferenceFiltersPanelProps): JSX.Element {
  return (
    <Box {...whiteCardStyle} p={{ base: '6', md: '8' }} mb="8">
      <Box mb="8" textAlign="center">
        <Heading as="h2" size="2xl" mb="2" color={SURFACE.textPrimary}>{title}</Heading>
        <Text fontSize="md" color={SURFACE.textSecondary}>{description}</Text>
      </Box>
      <Search value={searchValue} onChange={onSearchChange} />
      <Filters conferences={conferences} filters={filters} onFilterChange={onFilterChange} />
    </Box>
  );
}
