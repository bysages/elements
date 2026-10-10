import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ReactNode } from "react";

import { useElementId } from "../../internal/id";
import { Button } from "../button";
import { Popover } from "../popover";

/**
 * A question at the point of no return: the trigger opens a small
 * anchored vessel carrying the message and two answers. Each answer is
 * a close trigger: the answer reports through its own handler and the
 * popover machine folds the panel either way. The children are the
 * trigger; give it a single element (wrap a group in a span
 * otherwise).
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
  return (
    <ArkPopover.Root id={`${hostId}:popover`} positioning={{ placement: "top" }}>
      <ArkPopover.Trigger asChild>{children}</ArkPopover.Trigger>
      <Portal>
        <ArkPopover.Positioner>
          <ArkPopover.Content className="bs-popconfirm">
            <p data-part="message">{message}</p>
            <div data-part="actions">
              <ArkPopover.CloseTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={cancelText}
                  onClick={() => onCancel?.()}
                >
                  {cancelText}
                </Button>
              </ArkPopover.CloseTrigger>
              <ArkPopover.CloseTrigger asChild>
                <Button size="sm" aria-label={confirmText} onClick={() => onConfirm?.()}>
                  {confirmText}
                </Button>
              </ArkPopover.CloseTrigger>
            </div>
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  );
}

export const Popconfirm = Object.assign(PopconfirmImpl, Popover) as typeof PopconfirmImpl &
  typeof Popover;
