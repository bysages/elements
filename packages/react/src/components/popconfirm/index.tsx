import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import type { ReactNode } from "react";
import { useState } from "react";

import { useElementId } from "../../internal/id";
import { Button } from "../button";
import { Popover } from "../popover";

/**
 * A question at the point of no return: the trigger opens a small
 * anchored vessel carrying the message and two answers. Confirmation
 * and cancellation are the caller's to act on — the panel closes
 * either way. The children are the trigger; give it a single element
 * (wrap a group in a span otherwise).
 */
export interface PopconfirmProps {
  id?: string;
  /** The question the reader is answering. */
  message: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function PopconfirmImpl({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  onConfirm,
  onCancel,
  id,
}: PopconfirmProps) {
  injectComponentStyle("popconfirm");
  const hostId = useElementId("popconfirm", { id });
  const [open, setOpen] = useState(false);
  function settle(confirmed: boolean) {
    setOpen(false);
    (confirmed ? onConfirm : onCancel)?.();
  }
  return (
    <ArkPopover.Root
      id={`${hostId}:popover`}
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

export const Popconfirm = Object.assign(PopconfirmImpl, Popover) as typeof PopconfirmImpl &
  typeof Popover;
