import { HoverCard as ArkHoverCard, type HoverCardTriggerProps } from "@ark-ui/solid/hover-card";
import { injectComponentStyle } from "@bysages/core";
import { Show, createComponent, mergeProps, type ComponentProps, type JSX } from "solid-js";

import { isElement, withElementProps } from "../../internal/element";
import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's HoverCard, dressed in the paper-and-ink system: a preview card
 * that dissolves in over a quiet inline link, never stealing focus. The
 * API is Ark's own — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
function HoverCardRoot(props: ComponentProps<typeof ArkHoverCard.Root>) {
  const id = useElementId("hover-card", () => props.id);

  return createComponent(
    ArkHoverCard.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

type HoverCardPlacement =
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

export interface HoverCardFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger: string | Element;
  content?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  placement?: HoverCardPlacement;
  children?: JSX.Element;
  onOpenChange?: (open: boolean) => void;
}

function HoverCardFacade(props: HoverCardFacadeProps) {
  injectComponentStyle("hover-card");

  const triggerElement = () => (isElement(props.trigger) ? props.trigger : undefined);
  const triggerChildren = () => (triggerElement() ? undefined : props.trigger);
  const triggerAsChild = (
    propsFn: Parameters<NonNullable<HoverCardTriggerProps["asChild"]>>[0],
  ) => {
    const trigger = triggerElement();
    return trigger ? withElementProps(trigger, propsFn()) : props.trigger;
  };

  return (
    <HoverCardRoot
      {...(props.open === undefined ? {} : { open: props.open })}
      {...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen })}
      {...(props.placement === undefined ? {} : { positioning: { placement: props.placement } })}
      onOpenChange={(details: { open: boolean }) => props.onOpenChange?.(details.open)}
    >
      <ArkHoverCard.Trigger
        disabled={props.disabled}
        asChild={triggerElement() ? triggerAsChild : undefined}
      >
        {triggerChildren()}
      </ArkHoverCard.Trigger>
      <ArkHoverCard.Positioner>
        <ArkHoverCard.Content>
          <ArkHoverCard.Arrow>
            <ArkHoverCard.ArrowTip />
          </ArkHoverCard.Arrow>
          <h3>{props.label}</h3>
          <Show when={props.description}>
            <p>{props.description}</p>
          </Show>
          <Show when={props.content}>
            <p>{props.content}</p>
          </Show>
          {props.children}
        </ArkHoverCard.Content>
      </ArkHoverCard.Positioner>
    </HoverCardRoot>
  );
}

export const HoverCard: typeof HoverCardFacade &
  Omit<typeof ArkHoverCard, "Root"> & { Root: typeof HoverCardRoot } = defineFamily(
  HoverCardFacade,
  {
    ...ArkHoverCard,
    Root: HoverCardRoot,
  },
);
injectComponentStyle("hover-card");
