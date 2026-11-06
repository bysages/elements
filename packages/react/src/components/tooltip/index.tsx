import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import { injectComponentStyle } from "@bysages/core/styling";
import { isValidElement, type ComponentProps, type ReactNode } from "react";

import {
  definePositioner,
  FloatingPortal,
  type FloatingPortalTarget,
} from "../../internal/floating";
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
  /** Portal after hydration; `false` keeps the vessel inline. */
  portal?: FloatingPortalTarget;
  open?: boolean;
  defaultOpen?: boolean;
  trigger: ReactNode;
  content: string;
  disabled?: boolean;
  placement?: TooltipPlacement;
  onOpenChange?: (open: boolean) => void;
}

const TooltipPositioner = definePositioner(ArkTooltip.Positioner);

function TooltipFacade({
  portal = false,
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
      <FloatingPortal portal={portal}>
        <ArkTooltip.Positioner>
          <ArkTooltip.Content>
            <ArkTooltip.Arrow>
              <ArkTooltip.ArrowTip />
            </ArkTooltip.Arrow>
            {content}
          </ArkTooltip.Content>
        </ArkTooltip.Positioner>
      </FloatingPortal>
    </TooltipRoot>
  );
}

TooltipFacade.displayName = "STooltip";

type TooltipParts = Omit<typeof ArkTooltip, "Root" | "Positioner"> & {
  Positioner: typeof TooltipPositioner;
  Root: typeof TooltipRoot;
};
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Tooltip = Object.assign(TooltipFacade, {
  ...ArkTooltip,
  Positioner: TooltipPositioner,
  Root: TooltipRoot,
}) as typeof TooltipFacade & TooltipParts;

injectComponentStyle("tooltip");
