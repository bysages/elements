import { Popover as ArkPopover, type PopoverTriggerProps } from "@ark-ui/solid/popover";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, createComponent, mergeProps, type ComponentProps, type JSX } from "solid-js";

import { isElement, withElementProps } from "../../internal/element";
import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Popover, dressed in the paper-and-ink system: a paper vessel that
 * dissolves in on elevation, anchored to its trigger by a whisker arrow. The
 * API is Ark's own — Root, Trigger, Anchor, Indicator, Positioner, Content,
 * Title, Description, CloseTrigger, Arrow, ArrowTip. */
function PopoverRoot(props: ComponentProps<typeof ArkPopover.Root>) {
  const id = useElementId("popover", () => props.id);

  return createComponent(
    ArkPopover.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

type PopoverPlacement =
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

export interface PopoverFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: string | Element;
  content?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  placement?: PopoverPlacement;
  children?: JSX.Element;
  onOpenChange?: (open: boolean) => void;
}

function PopoverFacade(props: PopoverFacadeProps) {
  injectComponentStyle("popover");

  const triggerElement = () => (isElement(props.trigger) ? props.trigger : undefined);
  const triggerChildren = () => (triggerElement() ? undefined : (props.trigger ?? props.label));
  const triggerAsChild = (propsFn: Parameters<NonNullable<PopoverTriggerProps["asChild"]>>[0]) => {
    const trigger = triggerElement();
    return trigger ? withElementProps(trigger, propsFn()) : (props.trigger ?? props.label);
  };

  return (
    <PopoverRoot
      {...(props.open === undefined ? {} : { open: props.open })}
      {...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen })}
      {...(props.placement === undefined ? {} : { positioning: { placement: props.placement } })}
      onOpenChange={(details: { open: boolean }) => props.onOpenChange?.(details.open)}
    >
      <ArkPopover.Trigger
        disabled={props.disabled}
        asChild={triggerElement() ? triggerAsChild : undefined}
      >
        {triggerChildren()}
      </ArkPopover.Trigger>
      <ArkPopover.Positioner>
        <ArkPopover.Content>
          <ArkPopover.CloseTrigger aria-label="Close">
            {iconNode("x", { width: "14", height: "14" })}
          </ArkPopover.CloseTrigger>
          <ArkPopover.Title>{props.label}</ArkPopover.Title>
          <Show when={props.description}>
            <ArkPopover.Description>{props.description}</ArkPopover.Description>
          </Show>
          <Show when={props.content}>
            <p>{props.content}</p>
          </Show>
          {props.children}
        </ArkPopover.Content>
      </ArkPopover.Positioner>
    </PopoverRoot>
  );
}

export const Popover: typeof PopoverFacade &
  Omit<typeof ArkPopover, "Root"> & { Root: typeof PopoverRoot } = defineFamily(PopoverFacade, {
  ...ArkPopover,
  Root: PopoverRoot,
});
injectComponentStyle("popover");
