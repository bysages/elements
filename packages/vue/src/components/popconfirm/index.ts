import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, ref } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
import { Button } from "../button";
import { Popover } from "../popover";

/**
 * A question at the point of no return: the trigger opens a small
 * anchored vessel carrying the message and two answers. Confirmation
 * and cancellation are the caller's to act on — the panel closes
 * either way. The default slot is the trigger; give it a single
 * element (wrap a group in a span otherwise).
 */
const PopconfirmFacade = defineComponent({
  name: "Popconfirm",
  props: {
    /** The question the reader is answering. */
    message: { type: String, required: true },
    confirmText: { type: String, default: "Confirm" },
    cancelText: { type: String, default: "Cancel" },
  },
  emits: {
    confirm: () => true,
    cancel: () => true,
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("popconfirm");

    const hostId = useElementId("popconfirm", ctx.attrs);
    const open = ref(false);
    function settle(confirmed: boolean) {
      open.value = false;
      ctx.emit(confirmed ? "confirm" : "cancel");
    }
    return () =>
      h(
        withPresenceRoot(ArkPopover.Root as never),
        withPresenceEnter({
          id: `${hostId.value}:popover`,
          open: open.value,
          "onUpdate:open": (value: boolean) => (open.value = value),
          positioning: { placement: "top" },
        }),
        () => [
          h(ArkPopover.Trigger, { asChild: true }, ctx.slots.default),
          h(ArkPopover.Positioner, () => [
            h(ArkPopover.Content, { class: "bs-popconfirm" }, () => [
              h("p", { "data-part": "message" }, () => props.message),
              h("div", { "data-part": "actions" }, () => [
                h(
                  Button,
                  { variant: "ghost", size: "sm", onClick: () => settle(false) },
                  () => props.cancelText,
                ),
                h(Button, { size: "sm", onClick: () => settle(true) }, () => props.confirmText),
              ]),
            ]),
          ]),
        ],
      );
  },
});

export const Popconfirm = defineFamily(PopconfirmFacade, Popover) as typeof PopconfirmFacade &
  typeof Popover;
