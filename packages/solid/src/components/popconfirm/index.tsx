import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { injectComponentStyle } from "@bysages/core";
import { createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { Button } from "../button";
import { Popover } from "../popover";

export interface PopconfirmProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  /** The question the reader is answering. */
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/** A question at the point of no return: the trigger opens a small
 * anchored vessel carrying the message and two answers. Confirmation
 * and cancellation are the caller's to act on — the panel closes
 * either way. The children are the trigger's content, riding the
 * machine-driven trigger button. */
function PopconfirmImpl(props: PopconfirmProps) {
  injectComponentStyle("popconfirm");
  const [own, rest] = splitProps(props, [
    "message",
    "confirmText",
    "cancelText",
    "onConfirm",
    "onCancel",
    "children",
  ]);
  const id = useElementId("popconfirm");
  const [open, setOpen] = createSignal(false);
  function settle(confirmed: boolean) {
    setOpen(false);
    (confirmed ? own.onConfirm : own.onCancel)?.();
  }
  return (
    <ArkPopover.Root
      {...rest}
      id={id()}
      open={open()}
      onOpenChange={(details) => setOpen(details.open)}
      positioning={{ placement: "top" }}
    >
      <ArkPopover.Trigger
        asChild={(propsFn) => (
          <button {...propsFn()} {...rest}>
            {own.children}
          </button>
        )}
      />
      <Portal>
        <ArkPopover.Positioner>
          <ArkPopover.Content class="bs-popconfirm">
            <p data-part="message">{own.message}</p>
            <div data-part="actions">
              <Button variant="ghost" size="sm" onClick={() => settle(false)}>
                {own.cancelText ?? "Cancel"}
              </Button>
              <Button size="sm" onClick={() => settle(true)}>
                {own.confirmText ?? "Confirm"}
              </Button>
            </div>
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  );
}

export const Popconfirm = defineFamily(PopconfirmImpl, Popover) as typeof PopconfirmImpl &
  typeof Popover;
