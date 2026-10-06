import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { injectComponentStyle } from "@bysages/core";
import { isValidElement, type ComponentProps, type ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Popover, dressed in the paper-and-ink system: a paper vessel that
 * dissolves in on elevation, anchored to its trigger by a whisker arrow.
 * The API is Ark's own — Root, Trigger, Anchor, Indicator, Positioner,
 * Content, Title, Description, CloseTrigger, Arrow, ArrowTip. */
function PopoverRoot(props: ComponentProps<typeof ArkPopover.Root>) {
  const id = useElementId("popover", props);

  return <ArkPopover.Root {...props} id={id} />;
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
  trigger?: ReactNode;
  content?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  placement?: PopoverPlacement;
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

function PopoverFacade({
  open,
  defaultOpen,
  trigger,
  content,
  label,
  description,
  disabled = false,
  placement,
  children,
  onOpenChange,
}: PopoverFacadeProps) {
  return (
    <PopoverRoot
      {...(placement === undefined ? {} : { positioning: { placement } })}
      {...(open === undefined ? {} : { open })}
      {...(defaultOpen === undefined ? {} : { defaultOpen })}
      onOpenChange={(details: { open: boolean }) => onOpenChange?.(details.open)}
    >
      <ArkPopover.Trigger asChild={isValidElement(trigger)} disabled={disabled}>
        {trigger ?? label}
      </ArkPopover.Trigger>
      <ArkPopover.Positioner>
        <ArkPopover.Content>
          <ArkPopover.CloseTrigger aria-label="Close">
            {iconNode("x", { width: 14, height: 14 })}
          </ArkPopover.CloseTrigger>
          <ArkPopover.Title>{label}</ArkPopover.Title>
          {description ? <ArkPopover.Description>{description}</ArkPopover.Description> : null}
          {content ? <p>{content}</p> : null}
          {children}
        </ArkPopover.Content>
      </ArkPopover.Positioner>
    </PopoverRoot>
  );
}

PopoverFacade.displayName = "SPopover";

type PopoverParts = typeof ArkPopover;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Popover = Object.assign(PopoverFacade, {
  ...ArkPopover,
  Root: PopoverRoot,
}) as typeof PopoverFacade & PopoverParts;

injectComponentStyle("popover");
