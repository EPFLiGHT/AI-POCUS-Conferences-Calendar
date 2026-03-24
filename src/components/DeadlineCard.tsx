import { Box, VStack, Text, Flex } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import Countdown from './Countdown';
import type { DeadlineInfo } from '@/types/conference';
import { SURFACE } from '@/theme';

interface DeadlineCardProps {
  deadline: DeadlineInfo;
  timezone: string;
  variant?: 'compact' | 'detailed';
}

export default function DeadlineCard({ deadline, timezone, variant = 'compact' }: DeadlineCardProps): JSX.Element {
  const now = DateTime.now();
  const isExpired = deadline.localDatetime <= now;

  if (variant === 'detailed') {
    return (
      <Box bg={SURFACE.cardInner} border="1px" borderColor={SURFACE.borderSubtle} borderRadius="lg" overflow="hidden">
        <Box p="3" bg={SURFACE.brandStrong} borderBottom="1px" borderColor={SURFACE.borderBrand}>
          <Text fontSize="sm" fontWeight="600" color={SURFACE.textSecondary} textTransform="uppercase" letterSpacing="wider">
            {deadline.label}
          </Text>
        </Box>
        <VStack align="stretch" gap="4" p="4">
          <VStack align="start" gap="1">
            <Text fontSize="xs" fontWeight="600" color={SURFACE.textSubtle} textTransform="uppercase" letterSpacing="wider">Original Time:</Text>
            <Text fontSize="sm" color={SURFACE.textPrimary} fontFamily="mono" lineHeight="1.6">
              {deadline.datetime.toFormat('EEEE, MMMM dd, yyyy')}<br />{deadline.datetime.toFormat('HH:mm')} {timezone}
            </Text>
          </VStack>
          <VStack align="start" gap="1">
            <Text fontSize="xs" fontWeight="600" color={SURFACE.textSubtle} textTransform="uppercase" letterSpacing="wider">Your Local Time:</Text>
            <Text fontSize="sm" color={SURFACE.textPrimary} fontFamily="mono" lineHeight="1.6">
              {deadline.localDatetime.toFormat('EEEE, MMMM dd, yyyy')}<br />{deadline.localDatetime.toFormat('HH:mm')} {deadline.localDatetime.zoneName}
            </Text>
          </VStack>
        </VStack>
      </Box>
    );
  }

  return (
    <VStack align="stretch" gap="3">
      <VStack align="stretch" gap="1">
        <Text fontSize="xs" fontWeight="600" color={SURFACE.textSecondary} textTransform="uppercase" letterSpacing="wider">
          {deadline.label}
        </Text>
        <Flex fontSize="sm" gap="2">
          <Text color={SURFACE.textSubtle} fontWeight="500" minW="60px">Original:</Text>
          <Text color={SURFACE.textPrimary} fontFamily="mono" fontSize="xs">
            {deadline.datetime.toFormat('MMM dd, yyyy HH:mm')} {timezone}
          </Text>
        </Flex>
        <Flex fontSize="sm" gap="2">
          <Text color={SURFACE.textSubtle} fontWeight="500" minW="60px">Local:</Text>
          <Text color={SURFACE.textPrimary} fontFamily="mono" fontSize="xs">
            {deadline.localDatetime.toFormat('MMM dd, yyyy HH:mm')} {deadline.localDatetime.zoneName}
          </Text>
        </Flex>
      </VStack>

      <Box
        p="3"
        bg={isExpired ? SURFACE.expired.bg : SURFACE.active.bg}
        borderRadius="md"
        border="1px"
        borderColor={isExpired ? SURFACE.expired.border : SURFACE.active.border}
      >
        {isExpired ? (
          <Text fontSize="sm" color={SURFACE.expired.text} fontWeight="600">Expired</Text>
        ) : (
          <Countdown deadline={deadline.localDatetime} label="Time remaining" />
        )}
      </Box>
    </VStack>
  );
}
