import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import { injectComponentStyle } from "@bysages/core/styling";
import { isValidElement, type ComponentProps, type ReactNode } from "react";

import { useElementId } from "../../internal/id";

/** Ark's Tooltip, dressed in the paper-and-ink system: the smallest
 * vessel — a tight chip of ink that dissolves in over its anchor. The
 * API is Ark's own — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
function TooltipRoot(props: ComponentProps<typeof ArkTooltip.Root>) {
  const id = useElementId("tooltip", props);

  return <ArkTooltip.Root {...props} id={id} />;
}

type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface TooltipFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger: ReactNode;
  content: string;
  disabled?: boolean;
  placement?: TooltipPlacement;
  onOpenChange?: (open: boolean) => void;
}

function TooltipFacade({
  open,
  defaultOpen,
  trigger,
  content,
  disabled = false,
  placement,
  onOpenChange,
}: TooltipFacadeProps) {
  return (
    <TooltipRoot
      {...(placement === undefined ? {} : { positioning: { placement } })}
      {...(open === undefined ? {} : { open })}
      {...(defaultOpen === undefined ? {} : { defaultOpen })}
      onOpenChange={(details: { open: boolean }) => onOpenChange?.(details.open)}
    >
      <ArkTooltip.Trigger asChild={isValidElement(trigger)} disabled={disabled}>
        {trigger}
      </ArkTooltip.Trigger>
      <ArkTooltip.Positioner>
        <ArkTooltip.Content>
          <ArkTooltip.Arrow>
            <ArkTooltip.ArrowTip />
          </ArkTooltip.Arrow>
          {content}
        </ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </TooltipRoot>
  );
}

TooltipFacade.displayName = "STooltip";

type TooltipParts = typeof ArkTooltip;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Tooltip = Object.assign(TooltipFacade, {
  ...ArkTooltip,
  Root: TooltipRoot,
}) as typeof TooltipFacade & TooltipParts;

injectComponentStyle("tooltip");
