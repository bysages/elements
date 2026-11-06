import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";

import {
  definePositioner,
  FloatingPortal,
  type FloatingPortalTarget,
} from "../../internal/floating";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

export type { DialogOpenChangeDetails } from "@ark-ui/react/dialog";

export type DialogSize = "sm" | "md" | "lg" | "xl";

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

/** The semantic sheet: `size` names one content measure instead of a caller
 * overriding the sheet's max-width for every dialog. */
interface DialogContentProps extends ComponentProps<typeof ArkDialog.Content> {
  size?: DialogSize;
}

function DialogContent({ size, ...rest }: DialogContentProps) {
  return <ArkDialog.Content {...rest} data-size={size} />;
}

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
  /** Portal after hydration; `false` keeps the vessel inline. */
  portal?: FloatingPortalTarget;
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: string;
  content?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: DialogSize;
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const DialogPositioner = definePositioner(ArkDialog.Positioner);

function DialogFacade({
  portal = true,
  open,
  defaultOpen,
  trigger,
  content,
  label,
  description,
  disabled = false,
  size = "md",
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
      <FloatingPortal portal={portal}>
        <ArkDialog.Positioner>
          <DialogContent size={size}>
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
          </DialogContent>
        </ArkDialog.Positioner>
      </FloatingPortal>
    </DialogRoot>
  );
}

DialogFacade.displayName = "SDialog";

type DialogParts = Omit<typeof ArkDialog, "Root" | "Content" | "Positioner"> & {
  Positioner: typeof DialogPositioner;
  Root: typeof DialogRoot;
  Content: typeof DialogContent;
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts, with the local
 * section parts layered on top. */
export const Dialog = Object.assign(DialogFacade, {
  ...ArkDialog,
  Positioner: DialogPositioner,
  Root: DialogRoot,
  Content: DialogContent,
  Header,
  Body,
  Footer,
}) as typeof DialogFacade & DialogParts;

injectComponentStyle("dialog");
