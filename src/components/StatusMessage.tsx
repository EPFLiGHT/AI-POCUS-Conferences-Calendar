import { ReactNode } from 'react';
import { Box, Center, CenterProps, Heading, Text, VStack } from '@chakra-ui/react';
import { SURFACE } from '@/theme';

type StatusTone = 'info' | 'error' | 'success';

const toneStyles: Record<StatusTone, { title: string; body: string }> = {
  info:    { title: SURFACE.textSecondary, body: SURFACE.textMuted },
  error:   { title: SURFACE.textRed,       body: SURFACE.textMuted },
  success: { title: SURFACE.textSecondary, body: SURFACE.textMuted },
};

interface StatusMessageProps extends Pick<CenterProps, 'minH' | 'p'> {
  title?: string;
  message: string;
  tone?: StatusTone;
  icon?: ReactNode;
  actions?: ReactNode;
}

export default function StatusMessage({
  title, message, tone = 'info', icon, actions, minH = '65vh', p = '8',
}: StatusMessageProps): JSX.Element {
  const colors = toneStyles[tone];
  return (
    <Center minH={minH} p={p}>
      <VStack gap="4" textAlign="center" maxW="lg">
        {icon && <Box color={colors.title}>{icon}</Box>}
        {title && <Heading as="h2" size="lg" color={colors.title}>{title}</Heading>}
        <Text color={colors.body} fontSize="md">{message}</Text>
        {actions && <Box>{actions}</Box>}
      </VStack>
    </Center>
  );
}
