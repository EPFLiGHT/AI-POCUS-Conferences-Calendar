import { Flex, Grid, Text, VStack } from '@chakra-ui/react';
import { MapPin, Calendar as CalendarIcon, BarChart3, type LucideIcon } from 'lucide-react';
import SubjectBadge from './SubjectBadge';
import NoteBadge from './NoteBadge';
import type { Conference } from '@/types/conference';
import { getSubjectsArray } from '@/utils/parser';
import { SURFACE } from '@/theme';

interface ConferenceDetailsProps {
  conference: Conference;
  variant?: 'card' | 'modal';
  showSubjects?: boolean;
  showNote?: boolean;
}

const CARD_FIELDS: Array<{
  key: string; Icon: LucideIcon; label: string;
  getValue: (conference: Conference) => string | number;
}> = [
  { key: 'location', Icon: MapPin, label: 'Location:', getValue: (c) => c.place || 'TBA' },
  { key: 'date', Icon: CalendarIcon, label: 'Date:', getValue: (c) => c.date || 'TBA' },
  { key: 'hindex', Icon: BarChart3, label: 'H-Index:', getValue: (c) => c.hindex ?? 0 },
];

const MODAL_FIELDS: Array<{
  key: string; label: string;
  getValue: (conference: Conference) => string | number;
  isPresent: (conference: Conference) => boolean;
}> = [
  { key: 'location', label: 'Location', getValue: (c) => c.place || 'TBA', isPresent: () => true },
  { key: 'date', label: 'Date', getValue: (c) => c.date || 'TBA', isPresent: () => true },
  { key: 'hindex', label: 'H-Index', getValue: (c) => c.hindex ?? 0, isPresent: (c) => (c.hindex ?? 0) > 0 },
];

export default function ConferenceDetails({
  conference, variant = 'card',
  showSubjects = variant === 'modal', showNote = variant === 'modal',
}: ConferenceDetailsProps): JSX.Element {
  const subjects = getSubjectsArray(conference.sub);

  if (variant === 'modal') {
    return (
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="6">
        {MODAL_FIELDS.filter((f) => f.isPresent(conference)).map((field) => (
          <VStack key={field.key} align="start" gap="2">
            <Text fontSize="xs" fontWeight="600" color={SURFACE.textSubtle} textTransform="uppercase" letterSpacing="wider">
              {field.label}
            </Text>
            <Text fontSize="md" color={SURFACE.textPrimary}>{field.getValue(conference)}</Text>
          </VStack>
        ))}
        {showSubjects && subjects.length > 0 && (
          <VStack align="start" gap="2">
            <Text fontSize="xs" fontWeight="600" color={SURFACE.textSubtle} textTransform="uppercase" letterSpacing="wider">
              Subject{subjects.length > 1 ? 's' : ''}
            </Text>
            <SubjectBadge subjects={subjects} />
          </VStack>
        )}
        {showNote && conference.note && (
          <VStack align="start" gap="2">
            <Text fontSize="xs" fontWeight="600" color={SURFACE.textSubtle} textTransform="uppercase" letterSpacing="wider">Note</Text>
            <NoteBadge note={conference.note} layout="modal" />
          </VStack>
        )}
      </Grid>
    );
  }

  return (
    <VStack align="stretch" gap="2">
      {CARD_FIELDS.map((field) => {
        if (field.key === 'hindex' && (conference.hindex ?? 0) <= 0) return null;
        return (
          <Flex key={field.key} fontSize="sm" align="center">
            <Flex align="center" gap="1.5" color={SURFACE.textSubtle} fontWeight="500" minW="100px">
              <field.Icon size={14} /><Text>{field.label}</Text>
            </Flex>
            <Text color={SURFACE.textPrimary}>{field.getValue(conference)}</Text>
          </Flex>
        );
      })}
      {showNote && conference.note && <NoteBadge note={conference.note} />}
    </VStack>
  );
}
