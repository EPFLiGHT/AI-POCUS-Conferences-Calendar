import { useMemo } from 'react';
import { Box, Flex, Grid, Text, Button } from '@chakra-ui/react';
import { NativeSelectRoot, NativeSelectField } from '@chakra-ui/react';
import InfoTooltip from './InfoTooltip';
import { Conference } from '@/types/conference';
import { getSubjectColor, getSubjectsArray } from '@/utils/parser';
import { SUBJECT_LABELS } from '@/constants/subjects';
import { SURFACE } from '@/theme';
import type { ConferenceFiltersState } from '@/hooks/useConferenceFilters';

interface FiltersProps {
  conferences: Conference[];
  filters: ConferenceFiltersState;
  onFilterChange: (newFilters: Partial<ConferenceFiltersState>) => void;
}

export default function Filters({ conferences, filters, onFilterChange }: FiltersProps): JSX.Element {
  const years = useMemo(() => {
    return [...new Set(conferences.map(c => c.year))].sort((a, b) => b - a);
  }, [conferences]);

  const subjects = useMemo(() => {
    const subjectSet = new Set<string>();
    conferences.forEach(c => { getSubjectsArray(c.sub).forEach(s => subjectSet.add(s)); });
    return [...subjectSet].sort();
  }, [conferences]);

  const types = ['conference', 'summit', 'workshop'] as const;

  const getTypeColor = (type: string) =>
    SURFACE.type[type as keyof typeof SURFACE.type] || SURFACE.type.conference;

  return (
    <Box>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="6">
        {/* Sort By */}
        <Flex direction="column" gap="2">
          <Text fontSize="sm" fontWeight="600" color={SURFACE.textMuted}>
            Sort by: <Text as="span" color={SURFACE.textSecondary}>{
              filters.sortBy === 'deadline' ? 'Upcoming Deadline' :
              filters.sortBy === 'hindex' ? 'H-Index' : 'Start Date'
            }</Text>
          </Text>
          <NativeSelectRoot>
            <NativeSelectField
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value })}
              borderColor={SURFACE.border}
              borderRadius="lg"
              bg={SURFACE.input}
              color={SURFACE.textPrimary}
              _focus={{ borderColor: SURFACE.borderFocus, boxShadow: `0 0 0 1px ${SURFACE.borderFocus}` }}
            >
              <option value="deadline" style={{ background: SURFACE.elevated }}>Upcoming Deadline</option>
              <option value="hindex" style={{ background: SURFACE.elevated }}>H-Index</option>
              <option value="start" style={{ background: SURFACE.elevated }}>Start Date</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Flex>

        {/* Year */}
        <Flex direction="column" gap="2">
          <Text fontSize="sm" fontWeight="600" color={SURFACE.textMuted}>
            Year: <Text as="span" color={SURFACE.textSecondary}>{filters.year || 'All Years'}</Text>
          </Text>
          <NativeSelectRoot>
            <NativeSelectField
              value={filters.year}
              onChange={(e) => onFilterChange({ year: e.target.value })}
              borderColor={SURFACE.border}
              borderRadius="lg"
              bg={SURFACE.input}
              color={SURFACE.textPrimary}
              _focus={{ borderColor: SURFACE.borderFocus, boxShadow: `0 0 0 1px ${SURFACE.borderFocus}` }}
            >
              <option value="" style={{ background: SURFACE.elevated }}>All Years</option>
              {years.map(year => (
                <option key={year} value={year} style={{ background: SURFACE.elevated }}>{year}</option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Flex>

        {/* Type */}
        <Box gridColumn={{ base: '1', md: '1 / -1' }}>
          <Text fontSize="sm" fontWeight="600" color={SURFACE.textMuted} mb="2">
            Type: {filters.type.length === 0 && <Text as="span" color={SURFACE.textSecondary}>All</Text>}
            {filters.type.length > 0 && (
              <Text as="span">
                {filters.type.map(t => (
                  <Text key={t} as="span" color={getTypeColor(t).color} textTransform="capitalize" mr="1">
                    {t}{filters.type.indexOf(t) < filters.type.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </Text>
            )}
          </Text>
          <Flex gap="2" wrap="wrap">
            <Button
              size="sm" px="4" borderRadius="full" fontWeight="500"
              bg={filters.type.length === 0 ? 'brand.400' : SURFACE.brandLight}
              color={filters.type.length === 0 ? 'white' : SURFACE.textBrand}
              border="1px"
              borderColor={filters.type.length === 0 ? 'brand.400' : SURFACE.borderBrand}
              onClick={() => onFilterChange({ type: [] })}
              transition="all 0.2s ease-in-out" position="relative" zIndex="1"
              _hover={{ bg: filters.type.length === 0 ? 'brand.500' : SURFACE.brandStrong, transform: 'translateY(-1px)' }}
              _active={{ transform: 'scale(0.97)' }}
            >All</Button>
            {types.map(type => {
              const colors = getTypeColor(type);
              const isSelected = filters.type.includes(type);
              return (
                <Button
                  key={type} size="sm" px="4" borderRadius="full" fontWeight="500" textTransform="capitalize"
                  bg={isSelected ? colors.color : colors.bg}
                  color={isSelected ? SURFACE.page : colors.color}
                  border="1px" borderColor={isSelected ? colors.color : colors.border}
                  onClick={() => {
                    const newTypes = isSelected ? filters.type.filter(t => t !== type) : [...filters.type, type];
                    onFilterChange({ type: newTypes });
                  }}
                  transition="all 0.2s ease-in-out" position="relative" zIndex="1"
                  _hover={{ bg: isSelected ? colors.color : colors.bg, transform: 'translateY(-1px)', opacity: 0.9 }}
                  _active={{ transform: 'scale(0.97)' }}
                >{type}</Button>
              );
            })}
          </Flex>
        </Box>

        {/* Subject */}
        <Box gridColumn={{ base: '1', md: '1 / -1' }}>
          <Text fontSize="sm" fontWeight="600" color={SURFACE.textMuted} mb="2">
            Subject: {filters.subject.length === 0 && <Text as="span" color={SURFACE.textSecondary}>All</Text>}
            {filters.subject.length > 0 && (
              <Text as="span">
                {filters.subject.map(s => (
                  <Text key={s} as="span" color={getSubjectColor(s).color} mr="1">
                    {s}{filters.subject.indexOf(s) < filters.subject.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </Text>
            )}
          </Text>
          <Flex gap="2" wrap="wrap">
            <Button
              size="sm" px="4" borderRadius="full" fontWeight="500"
              bg={filters.subject.length === 0 ? 'brand.400' : SURFACE.brandLight}
              color={filters.subject.length === 0 ? 'white' : SURFACE.textBrand}
              border="1px"
              borderColor={filters.subject.length === 0 ? 'brand.400' : SURFACE.borderBrand}
              onClick={() => onFilterChange({ subject: [] })}
              transition="all 0.2s ease-in-out" position="relative" zIndex="1"
              _hover={{ bg: filters.subject.length === 0 ? 'brand.500' : SURFACE.brandStrong, transform: 'translateY(-1px)' }}
              _active={{ transform: 'scale(0.97)' }}
            >All</Button>
            {subjects.map(subject => {
              const colors = getSubjectColor(subject);
              const isSelected = filters.subject.includes(subject);
              return (
                <InfoTooltip key={subject} label={SUBJECT_LABELS[subject] || subject}>
                  <Button
                    size="sm" px="4" borderRadius="full" fontWeight="500"
                    bg={isSelected ? colors.color : colors.bg}
                    color={isSelected ? 'white' : colors.color}
                    border="1px" borderColor={isSelected ? colors.color : colors.border}
                    onClick={() => {
                      const newSubjects = isSelected ? filters.subject.filter(s => s !== subject) : [...filters.subject, subject];
                      onFilterChange({ subject: newSubjects });
                    }}
                    transition="all 0.2s ease-in-out" position="relative" zIndex="1" cursor="help"
                    _hover={{ bg: isSelected ? colors.color : colors.bg, transform: 'translateY(-1px)', opacity: 0.9 }}
                    _active={{ transform: 'scale(0.97)' }}
                  >{subject}</Button>
                </InfoTooltip>
              );
            })}
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
}
