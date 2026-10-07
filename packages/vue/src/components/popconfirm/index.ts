import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
import { Button } from "../button";
import { Popover } from "../popover";

/**
 * A question at the point of no return: the trigger opens a small
 * anchored vessel carrying the message and two answers. Each answer is
 * a close trigger: the answer reports through its own handler and the
 * popover machine folds the panel either way. The default slot is the
 * trigger; give it a single element (wrap a group in a span
 * otherwise).
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
    return () =>
      h(
        withPresenceRoot(ArkPopover.Root as never),
        withPresenceEnter({
          id: `${hostId.value}:popover`,
          positioning: { placement: "top" },
        }),
        () => [
          h(ArkPopover.Trigger, { asChild: true }, ctx.slots.default),
          h(ArkPopover.Positioner, () => [
            h(ArkPopover.Content, { class: "bs-popconfirm" }, () => [
              h("p", { "data-part": "message" }, () => props.message),
              h("div", { "data-part": "actions" }, () => [
                h(ArkPopover.CloseTrigger, { asChild: true }, () =>
                  h(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      // The close trigger injects its own "Close"
                      // label; the answer's name is the accessible
                      // one. The recipe names ride along too, so the
                      // button keeps its own anatomy under the merged
                      // trigger props.
                      "aria-label": props.cancelText,
                      onClick: () => ctx.emit("cancel"),
                      "data-scope": "button",
                      "data-part": "root",
                    },
                    () => props.cancelText,
                  ),
                ),
                h(ArkPopover.CloseTrigger, { asChild: true }, () =>
                  h(
                    Button,
                    {
                      size: "sm",
                      "aria-label": props.confirmText,
                      onClick: () => ctx.emit("confirm"),
                      "data-scope": "button",
                      "data-part": "root",
                    },
                    () => props.confirmText,
                  ),
                ),
              ]),
            ]),
          ]),
        ],
      );
  },
});

export const Popconfirm = defineFamily(PopconfirmFacade, Popover) as typeof PopconfirmFacade &
  typeof Popover;
