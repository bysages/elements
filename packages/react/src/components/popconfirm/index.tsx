import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import { useState } from "react";
import type { ReactNode } from "react";

import { Button } from "../button";

/**
 * A question at the point of no return: the trigger opens a small
 * anchored vessel carrying the message and two answers. Confirmation
 * and cancellation are the caller's to act on — the panel closes
 * either way. The children are the trigger; give it a single element
 * (wrap a group in a span otherwise).
 */
export interface PopconfirmProps {
  /** The question the reader is answering. */
  message: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function Popconfirm({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  onConfirm,
  onCancel,
}: PopconfirmProps) {
  const [open, setOpen] = useState(false);
  function settle(confirmed: boolean) {
    setOpen(false);
    (confirmed ? onConfirm : onCancel)?.();
  }
  return (
    <ArkPopover.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      positioning={{ placement: "top" }}
    >
      <ArkPopover.Trigger asChild>{children}</ArkPopover.Trigger>
      <Portal>
        <ArkPopover.Positioner>
          <ArkPopover.Content className="bs-popconfirm">
            <p data-part="message">{message}</p>
            <div data-part="actions">
              <Button variant="ghost" size="sm" onClick={() => settle(false)}>
                {cancelText}
              </Button>
              <Button size="sm" onClick={() => settle(true)}>
                {confirmText}
              </Button>
            </div>
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  );
}

injectComponentStyle("popconfirm");
