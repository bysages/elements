import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { injectComponentStyle } from "@bysages/core";
import { Show, createComponent, mergeProps, type ComponentProps, type JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

export type { DialogOpenChangeDetails } from "@ark-ui/solid/dialog";

/** Ark's Dialog, dressed in the paper-and-ink system: the sheet dissolves
 * in on elevation, the backdrop fades, and nested overlays stack through
 * the shared z-index ladder. The API is Ark's own — Root, Trigger,
 * Backdrop, Positioner, Content, Title, Description, CloseTrigger. */
function DialogRoot(props: ComponentProps<typeof ArkDialog.Root>) {
  const id = useElementId("dialog", () => props.id);

  return createComponent(
    ArkDialog.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export interface DialogFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: string;
  content?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  children?: JSX.Element;
  onOpenChange?: (open: boolean) => void;
}

function DialogFacade(props: DialogFacadeProps) {
  injectComponentStyle("dialog");
  const title = () => props.label ?? props.trigger;

  return (
    <DialogRoot
      {...(props.open === undefined ? {} : { open: props.open })}
      {...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen })}
      onOpenChange={(details: { open: boolean }) => props.onOpenChange?.(details.open)}
    >
      <ArkDialog.Trigger disabled={props.disabled}>{title() ?? "Open"}</ArkDialog.Trigger>
      <ArkDialog.Backdrop />
      <ArkDialog.Positioner>
        <ArkDialog.Content>
          <ArkDialog.Title>{title()}</ArkDialog.Title>
          <Show when={props.description}>
            <ArkDialog.Description>{props.description}</ArkDialog.Description>
          </Show>
          <Show when={props.content}>
            <p>{props.content}</p>
          </Show>
          {props.children}
          <ArkDialog.CloseTrigger aria-label="Close">
            {iconNode("x", { width: 14, height: 14 })}
          </ArkDialog.CloseTrigger>
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </DialogRoot>
  );
}

export const Dialog: typeof DialogFacade &
  Omit<typeof ArkDialog, "Root"> & { Root: typeof DialogRoot } = defineFamily(DialogFacade, {
  ...ArkDialog,
  Root: DialogRoot,
});
injectComponentStyle("dialog");
