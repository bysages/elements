import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { injectComponentStyle } from "@bysages/core/styling";
import {
  Show,
  createComponent,
  mergeProps,
  splitProps,
  type ComponentProps,
  type JSX,
} from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

export type { DialogOpenChangeDetails } from "@ark-ui/solid/dialog";

export interface DialogPartProps extends JSX.HTMLAttributes<HTMLElement> {}

export interface DialogBodyProps extends JSX.HTMLAttributes<HTMLDivElement> {}

/** A semantic section for the dialog's title and description. */
function DialogHeader(props: DialogPartProps) {
  const [own, rest] = splitProps(props, ["children"]);
  return (
    <header {...rest} data-scope="dialog" data-part="header">
      {own.children}
    </header>
  );
}

/** The dialog's principal content; it may shrink inside narrow sheets. */
function DialogBody(props: DialogBodyProps) {
  const [own, rest] = splitProps(props, ["children"]);
  return (
    <div {...rest} data-scope="dialog" data-part="body">
      {own.children}
    </div>
  );
}

/** The dialog's action row; actions read from start to end. */
function DialogFooter(props: DialogPartProps) {
  const [own, rest] = splitProps(props, ["children"]);
  return (
    <footer {...rest} data-scope="dialog" data-part="footer">
      {own.children}
    </footer>
  );
}
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
          <DialogHeader>
            <ArkDialog.Title>{title()}</ArkDialog.Title>
            <Show when={props.description}>
              <ArkDialog.Description>{props.description}</ArkDialog.Description>
            </Show>
          </DialogHeader>
          <DialogBody>
            <Show when={props.content}>
              <p>{props.content}</p>
            </Show>
            {props.children}
          </DialogBody>
          <ArkDialog.CloseTrigger aria-label="Close">
            {iconNode("x", { width: 14, height: 14 })}
          </ArkDialog.CloseTrigger>
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </DialogRoot>
  );
}

export const Dialog: typeof DialogFacade &
  Omit<typeof ArkDialog, "Root"> & {
    Root: typeof DialogRoot;
    Header: typeof DialogHeader;
    Body: typeof DialogBody;
    Footer: typeof DialogFooter;
  } = defineFamily(DialogFacade, {
  ...ArkDialog,
  Root: DialogRoot,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});
injectComponentStyle("dialog");
