import { HoverCard as ArkHoverCard } from "@ark-ui/react/hover-card";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, ReactNode } from "react";

import { useElementId } from "../../internal/id";

/** Ark's HoverCard, dressed in the paper-and-ink system: a preview card
 * that dissolves in over a quiet inline link, never stealing focus. The
 * API is Ark's own — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
function HoverCardRoot(props: ComponentProps<typeof ArkHoverCard.Root>) {
  const id = useElementId("hover-card", props);

  return <ArkHoverCard.Root {...props} id={id} />;
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
  trigger: string;
  content?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  placement?: HoverCardPlacement;
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

function HoverCardFacade({
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
}: HoverCardFacadeProps) {
  return (
    <HoverCardRoot
      {...(placement === undefined ? {} : { positioning: { placement } })}
      {...(open === undefined ? {} : { open })}
      {...(defaultOpen === undefined ? {} : { defaultOpen })}
      onOpenChange={(details: { open: boolean }) => onOpenChange?.(details.open)}
    >
      <ArkHoverCard.Trigger disabled={disabled}>{trigger}</ArkHoverCard.Trigger>
      <ArkHoverCard.Positioner>
        <ArkHoverCard.Content>
          <ArkHoverCard.Arrow>
            <ArkHoverCard.ArrowTip />
          </ArkHoverCard.Arrow>
          <h3>{label}</h3>
          {description ? <p>{description}</p> : null}
          {content ? <p>{content}</p> : null}
          {children}
        </ArkHoverCard.Content>
      </ArkHoverCard.Positioner>
    </HoverCardRoot>
  );
}

HoverCardFacade.displayName = "SHoverCard";

type HoverCardParts = typeof ArkHoverCard;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const HoverCard = Object.assign(HoverCardFacade, {
  ...ArkHoverCard,
  Root: HoverCardRoot,
}) as typeof HoverCardFacade & HoverCardParts;

injectComponentStyle("hover-card");
