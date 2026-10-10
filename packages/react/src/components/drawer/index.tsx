import { Drawer as ArkDrawer } from "@ark-ui/react/drawer";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Drawer, dressed in the paper-and-ink system: a full-height sheet
 * cut flush to the edge it rises from, sliding on the machine's translate
 * under the grabber's hand. The API is Ark's own — Root, Trigger,
 * Backdrop, Positioner, Content, Grabber, GrabberIndicator, Title,
 * Description, CloseTrigger, SwipeArea. */
function DrawerRoot(props: ComponentProps<typeof ArkDrawer.Root>) {
  const id = useElementId("drawer", props);

  return <ArkDrawer.Root {...props} id={id} />;
}

export interface DrawerFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: string;
  content?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

function DrawerFacade({
  open,
  defaultOpen,
  trigger,
  content,
  label,
  description,
  disabled = false,
  children,
  onOpenChange,
}: DrawerFacadeProps) {
  return (
    <DrawerRoot
      {...(open === undefined ? {} : { open })}
      {...(defaultOpen === undefined ? {} : { defaultOpen })}
      onOpenChange={(details: { open: boolean }) => onOpenChange?.(details.open)}
    >
      <ArkDrawer.Trigger disabled={disabled}>{trigger ?? label}</ArkDrawer.Trigger>
      <ArkDrawer.Backdrop />
      <ArkDrawer.Positioner>
        <ArkDrawer.Content>
          <ArkDrawer.Grabber>
            <ArkDrawer.GrabberIndicator />
          </ArkDrawer.Grabber>
          <ArkDrawer.Title>{label}</ArkDrawer.Title>
          {description ? <ArkDrawer.Description>{description}</ArkDrawer.Description> : null}
          {content ? <p>{content}</p> : null}
          {children}
          <ArkDrawer.CloseTrigger aria-label="Close">{iconNode("x")}</ArkDrawer.CloseTrigger>
        </ArkDrawer.Content>
      </ArkDrawer.Positioner>
    </DrawerRoot>
  );
}

DrawerFacade.displayName = "SDrawer";

type DrawerParts = typeof ArkDrawer;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Drawer = Object.assign(DrawerFacade, {
  ...ArkDrawer,
  Root: DrawerRoot,
}) as typeof DrawerFacade & DrawerParts;

injectComponentStyle("drawer");
