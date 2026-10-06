import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps, ReactNode } from "react";

import { useElementId } from "../../internal/id";

export type { DialogOpenChangeDetails } from "@ark-ui/react/dialog";

/** Ark's Dialog, dressed in the paper-and-ink system: the sheet dissolves
 * in on elevation, the backdrop fades, and nested overlays stack through
 * the shared z-index ladder. The API is Ark's own — Root, Trigger,
 * Backdrop, Positioner, Content, Title, Description, CloseTrigger. */
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
          <ArkDialog.Title>{title}</ArkDialog.Title>
          {description ? <ArkDialog.Description>{description}</ArkDialog.Description> : null}
          {content ? <p>{content}</p> : null}
          {children}
          <ArkDialog.CloseTrigger aria-label="Close">×</ArkDialog.CloseTrigger>
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </DialogRoot>
  );
}

DialogFacade.displayName = "SDialog";

type DialogParts = typeof ArkDialog;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Dialog = Object.assign(DialogFacade, {
  ...ArkDialog,
  Root: DialogRoot,
}) as typeof DialogFacade & DialogParts;

injectComponentStyle("dialog");
