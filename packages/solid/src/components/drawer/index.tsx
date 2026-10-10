import { Drawer as ArkDrawer } from "@ark-ui/solid/drawer";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, createComponent, mergeProps, type ComponentProps, type JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Drawer, dressed in the paper-and-ink system: a full-height sheet
 * cut flush to the edge it rises from, sliding on the machine's translate
 * under the grabber's hand. The API is Ark's own — Root, Trigger,
 * Backdrop, Positioner, Content, Grabber, GrabberIndicator, Title,
 * Description, CloseTrigger, SwipeArea. */
function DrawerRoot(props: ComponentProps<typeof ArkDrawer.Root>) {
  const id = useElementId("drawer", () => props.id);

  return createComponent(
    ArkDrawer.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export interface DrawerFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: string;
  content?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  children?: JSX.Element;
  onOpenChange?: (open: boolean) => void;
}

function DrawerFacade(props: DrawerFacadeProps) {
  injectComponentStyle("drawer");

  return (
    <DrawerRoot
      {...(props.open === undefined ? {} : { open: props.open })}
      {...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen })}
      onOpenChange={(details: { open: boolean }) => props.onOpenChange?.(details.open)}
    >
      <ArkDrawer.Trigger disabled={props.disabled}>
        {props.trigger ?? props.label}
      </ArkDrawer.Trigger>
      <ArkDrawer.Backdrop />
      <ArkDrawer.Positioner>
        <ArkDrawer.Content>
          <ArkDrawer.Grabber>
            <ArkDrawer.GrabberIndicator />
          </ArkDrawer.Grabber>
          <ArkDrawer.Title>{props.label}</ArkDrawer.Title>
          <Show when={props.description}>
            <ArkDrawer.Description>{props.description}</ArkDrawer.Description>
          </Show>
          <Show when={props.content}>
            <p>{props.content}</p>
          </Show>
          {props.children}
          <ArkDrawer.CloseTrigger aria-label="Close">{iconNode("x")}</ArkDrawer.CloseTrigger>
        </ArkDrawer.Content>
      </ArkDrawer.Positioner>
    </DrawerRoot>
  );
}

export const Drawer: typeof DrawerFacade &
  Omit<typeof ArkDrawer, "Root"> & { Root: typeof DrawerRoot } = defineFamily(DrawerFacade, {
  ...ArkDrawer,
  Root: DrawerRoot,
});
injectComponentStyle("drawer");
