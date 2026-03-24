import { Badge } from '@chakra-ui/react';
import { SURFACE } from '@/theme';

interface TypeBadgeProps {
  type: string;
}

export default function TypeBadge({ type }: TypeBadgeProps): JSX.Element | null {
  if (!type) return null;

  const colors = SURFACE.type[type.toLowerCase() as keyof typeof SURFACE.type] || SURFACE.type.conference;

  return (
    <Badge
      px="3" py="1" borderRadius="full" fontSize="xs" fontWeight="600"
      bg={colors.bg} color={colors.color}
      border="1px" borderColor={colors.border}
      whiteSpace="nowrap" textTransform="capitalize"
    >
      {type}
    </Badge>
  );
}
