import { Tooltip } from '@chakra-ui/react/tooltip';
import { SURFACE } from '@/theme';

interface InfoTooltipProps {
  label: string;
  children: React.ReactNode;
}

export default function InfoTooltip({ label, children }: InfoTooltipProps): JSX.Element {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content
          fontSize="sm"
          borderRadius="md"
          bg={SURFACE.elevated}
          color={SURFACE.textPrimary}
          border={`1px solid ${SURFACE.border}`}
          px="3"
          py="2"
        >
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          {label}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
}
