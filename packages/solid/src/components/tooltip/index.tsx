import { Tooltip as ArkTooltip, type TooltipTriggerProps } from "@ark-ui/solid/tooltip";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { isElement, withElementProps } from "../../internal/element";
import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Tooltip, dressed in the paper-and-ink system: the smallest
 * vessel — a tight chip of ink that dissolves in over its anchor. The
 * API is Ark's own — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
function TooltipRoot(props: ComponentProps<typeof ArkTooltip.Root>) {
  const id = useElementId("tooltip", () => props.id);

  return createComponent(
    ArkTooltip.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
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
  trigger: string | Element;
  content: string;
  disabled?: boolean;
  placement?: TooltipPlacement;
  onOpenChange?: (open: boolean) => void;
}

function TooltipFacade(props: TooltipFacadeProps) {
  injectComponentStyle("tooltip");

  const triggerElement = () => (isElement(props.trigger) ? props.trigger : undefined);
  const triggerChildren = () => (triggerElement() ? undefined : props.trigger);
  const triggerAsChild = (propsFn: Parameters<NonNullable<TooltipTriggerProps["asChild"]>>[0]) => {
    const trigger = triggerElement();
    return trigger ? withElementProps(trigger, propsFn()) : props.trigger;
  };

  return (
    <TooltipRoot
      {...(props.open === undefined ? {} : { open: props.open })}
      {...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen })}
      {...(props.placement === undefined ? {} : { positioning: { placement: props.placement } })}
      onOpenChange={(details: { open: boolean }) => props.onOpenChange?.(details.open)}
    >
      <ArkTooltip.Trigger
        disabled={props.disabled}
        asChild={triggerElement() ? triggerAsChild : undefined}
      >
        {triggerChildren()}
      </ArkTooltip.Trigger>
      <ArkTooltip.Positioner>
        <ArkTooltip.Content>
          <ArkTooltip.Arrow>
            <ArkTooltip.ArrowTip />
          </ArkTooltip.Arrow>
          {props.content}
        </ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </TooltipRoot>
  );
}

export const Tooltip: typeof TooltipFacade &
  Omit<typeof ArkTooltip, "Root"> & { Root: typeof TooltipRoot } = defineFamily(TooltipFacade, {
  ...ArkTooltip,
  Root: TooltipRoot,
});
injectComponentStyle("tooltip");
