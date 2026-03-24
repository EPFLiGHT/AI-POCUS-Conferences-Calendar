import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import DeadlineCard from './DeadlineCard';
import ExternalLinkButton from './ExternalLinkButton';
import SubjectBadge from './SubjectBadge';
import TypeBadge from './TypeBadge';
import NoteBadge from './NoteBadge';
import ConferenceDetails from './ConferenceDetails';
import { getDeadlineInfo } from '@/utils/parser';
import { Conference } from '@/types/conference';
import { SURFACE, SHADOWS } from '@/theme';

const MotionBox = motion.create(Box);

interface ConferenceCardProps {
  conference: Conference;
  onClick: () => void;
  index?: number;
}

export default function ConferenceCard({ conference, onClick, index = 0 }: ConferenceCardProps): JSX.Element {
  const allDeadlines = getDeadlineInfo(conference);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const animationDelay = isMobile ? (index % 12) * 0.03 : (index % 12) * 0.02;
  const animationDuration = isMobile ? 0.3 : 0.25;

  return (
    <MotionBox
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px", amount: 0.1 }}
      transition={{
        duration: animationDuration,
        delay: animationDelay,
        ease: [0.25, 0.46, 0.45, 0.94],
        layout: { duration: 0.15, ease: 'easeOut' }
      }}
      bg={SURFACE.card}
      borderRadius="xl"
      border="1px"
      borderColor={SURFACE.border}
      boxShadow={SHADOWS.sm}
      p="6"
      cursor="pointer"
      whileHover={{
        boxShadow: SHADOWS.hover.card,
        y: -4,
        scale: 1.02,
        borderColor: SURFACE.borderBrandHover,
        transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      onClick={onClick}
    >
      <VStack align="stretch" gap="3" mb="3">
        <Flex justify="space-between" align="start" gap="3" wrap="wrap">
          <Heading as="h3" size="lg" color={SURFACE.textPrimary} flex="1" minW="200px">
            {conference.title} {conference.year}
          </Heading>
          <Flex gap="2" align="center" wrap="wrap" justify="flex-end">
            <TypeBadge type={conference.type} />
            <SubjectBadge subjects={conference.sub} justify="flex-end" align="center" />
          </Flex>
        </Flex>
        {conference.note && <NoteBadge note={conference.note} />}
      </VStack>

      <Text fontSize="sm" color={SURFACE.textSecondary} mb="4" lineHeight="1.5">
        {conference.full_name}
      </Text>

      <Box mb="4">
        <ConferenceDetails conference={conference} />
      </Box>

      {allDeadlines.length > 0 ? (
        <VStack
          align="stretch"
          gap="4"
          p="4"
          bg={SURFACE.cardInner}
          borderRadius="lg"
          border="1px"
          borderColor={SURFACE.borderSubtle}
          mb="4"
        >
          {allDeadlines.map((deadline, idx) => (
            <DeadlineCard key={idx} deadline={deadline} timezone={conference.timezone} variant="compact" />
          ))}
        </VStack>
      ) : (
        <Box
          p="3"
          textAlign="center"
          bg={SURFACE.cardInner}
          borderRadius="lg"
          border="1px"
          borderColor={SURFACE.borderSubtle}
          borderStyle="dashed"
          mb="4"
        >
          <Text fontSize="sm" color={SURFACE.textFaint} fontStyle="italic">
            No deadlines available
          </Text>
        </Box>
      )}

      <Flex gap="3" wrap="wrap" pt="4" borderTop="1px" borderColor={SURFACE.borderSubtle}>
        {conference.link && (
          <ExternalLinkButton href={conference.link} variant="primary" onClick={(e) => e.stopPropagation()}>
            Website
          </ExternalLinkButton>
        )}
        {conference.paperslink && (
          <ExternalLinkButton href={conference.paperslink} variant="primary" onClick={(e) => e.stopPropagation()}>
            Papers
          </ExternalLinkButton>
        )}
        {conference.pwclink && (
          <ExternalLinkButton href={conference.pwclink} variant="primary" onClick={(e) => e.stopPropagation()}>
            Papers w/ Code
          </ExternalLinkButton>
        )}
      </Flex>
    </MotionBox>
  );
}
