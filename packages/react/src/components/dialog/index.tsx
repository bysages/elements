import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

export type { DialogOpenChangeDetails } from "@ark-ui/react/dialog";

interface DialogPartProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/** A semantic section for the dialog's title and description. */
function Header({ children, ...rest }: DialogPartProps) {
  return (
    <header {...rest} data-scope="dialog" data-part="header">
      {children}
    </header>
  );
}

/** The dialog's principal content; it may shrink inside narrow sheets. */
function Body({ children, ...rest }: DialogPartProps) {
  return (
    <div {...rest} data-scope="dialog" data-part="body">
      {children}
    </div>
  );
}

/** The dialog's action row; actions read from start to end. */
function Footer({ children, ...rest }: DialogPartProps) {
  return (
    <footer {...rest} data-scope="dialog" data-part="footer">
      {children}
    </footer>
  );
}

Header.displayName = "DialogHeader";
Body.displayName = "DialogBody";
Footer.displayName = "DialogFooter";

/** Ark's Dialog, dressed in the paper-and-ink system: the sheet dissolves
 * in on elevation, the backdrop fades, and nested overlays stack through
 * the shared z-index ladder. The API is Ark's own — Root, Trigger,
 * Backdrop, Positioner, Content, Title, Description, CloseTrigger —
 * plus the Header, Body, and Footer anatomy parts. */
function DialogRoot(props: ComponentProps<typeof ArkDialog.Root>) {
  const id = useElementId("dialog", props);

  return <ArkDialog.Root {...props} id={id} />;
}

export interface DialogFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: string;
  content?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

function DialogFacade({
  open,
  defaultOpen,
  trigger,
  content,
  label,
  description,
  disabled = false,
  children,
  onOpenChange,
}: DialogFacadeProps) {
  const title = label ?? trigger;

  return (
    <DialogRoot
      {...(open === undefined ? {} : { open })}
      {...(defaultOpen === undefined ? {} : { defaultOpen })}
      onOpenChange={(details: { open: boolean }) => onOpenChange?.(details.open)}
    >
      <ArkDialog.Trigger disabled={disabled}>{trigger ?? title ?? "Open"}</ArkDialog.Trigger>
      <ArkDialog.Backdrop />
      <ArkDialog.Positioner>
        <ArkDialog.Content>
          <Header>
            <ArkDialog.Title>{title}</ArkDialog.Title>
            {description ? <ArkDialog.Description>{description}</ArkDialog.Description> : null}
          </Header>
          <Body>
            {content ? <p>{content}</p> : null}
            {children}
          </Body>
          <ArkDialog.CloseTrigger aria-label="Close">
            {iconNode("x", { width: 14, height: 14 })}
          </ArkDialog.CloseTrigger>
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </DialogRoot>
  );
}

DialogFacade.displayName = "SDialog";

type DialogParts = typeof ArkDialog;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts, with the local
 * section parts layered on top. */
export const Dialog = Object.assign(DialogFacade, {
  ...ArkDialog,
  Root: DialogRoot,
  Header,
  Body,
  Footer,
}) as typeof DialogFacade &
  Omit<DialogParts, "Root"> & {
    Root: typeof DialogRoot;
    Header: typeof Header;
    Body: typeof Body;
    Footer: typeof Footer;
  };

injectComponentStyle("dialog");
