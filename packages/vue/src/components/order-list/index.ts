import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, ref, type PropType } from "vue";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useComponentMessages } from "../../internal/messages";
import { Button } from "../button";

export interface OrderOption {
  label: string;
  value: string;
}

function arrowIcon(name: string, rail?: string) {
  return iconNode(name, { width: 12, height: 12 }, rail ?? "");
}

const ARROWS = {
  up: ["chevron-up"] as const,
  down: ["chevron-down"] as const,
  top: ["chevron-up", '<path d="M5 4h14"/>'] as const,
  bottom: ["chevron-down", '<path d="M5 20h14"/>'] as const,
};

/** Each move step rides the shared ghost square — the recipe carries
 * the native button, cursor, disabled and halo; the part rides the
 * wrapper so the anatomy contract holds. */
function moveControl(
  label: string,
  arrows: readonly [string, string?],
  disabled: boolean,
  onClick: () => void,
) {
  return h("span", { "data-scope": "order-list", "data-part": "move" }, [
    h(
      Button,
      {
        variant: "ghost",
        square: true,
        size: "sm",
        "aria-label": label,
        disabled,
        onClick,
      },
      () => [arrowIcon(arrows[0], arrows[1])],
    ),
  ]);
}

/** A ledger the reader may rewrite: rows move by grip or by the side
 * arrows, and the group reports the new order as the value itself —
 * the model is the order. Dragging rides the native drag events — a
 * hairline of primary ink marks the seam the row will land on — so
 * touch keeps the buttons as its route. */
export const OrderList = withSelfRoot(
  defineComponent({
    name: "OrderList",
    props: {
      /** The rows in their current order — the value is the order. */
      modelValue: { type: Array as PropType<string[]>, required: true },
      /** Every row the ledger knows, in no particular order. */
      options: { type: Array as PropType<OrderOption[]>, required: true },
      label: { type: String, default: undefined },
    },
    emits: ["update:modelValue"],
    setup(props, ctx: SetupContext) {
      injectComponentStyle("order-list");
      const messages = useComponentMessages();

      const dragging = ref<string | null>(null);
      const dropLine = ref<{ index: number; before: boolean } | null>(null);
      const rows = () =>
        props.modelValue
          .map((value) => props.options.find((option) => option.value === value))
          .filter((option): option is OrderOption => option != null);

      function move(value: string, offset: number) {
        const next = [...props.modelValue];
        const from = next.indexOf(value);
        const to = Math.max(0, Math.min(next.length - 1, from + offset));
        if (from === to) return;
        next.splice(to, 0, ...next.splice(from, 1));
        ctx.emit("update:modelValue", next);
      }
      /** Land the dragged row on the seam the pointer chose: the drop
       * index counts the rows still in place, so removing the dragged
       * row first shifts the seam back one when it came from above. */
      function drop() {
        const value = dragging.value;
        if (value == null) return;
        const seam = dropLine.value;
        const from = props.modelValue.indexOf(value);
        if (seam && seam.index === from) return reset();
        const next = props.modelValue.filter((entry) => entry !== value);
        let at = seam ? (seam.before ? seam.index : seam.index + 1) : next.length;
        if (from < at) at -= 1;
        next.splice(Math.max(0, Math.min(next.length, at)), 0, value);
        ctx.emit("update:modelValue", next);
        reset();
      }
      function reset() {
        dragging.value = null;
        dropLine.value = null;
      }
      return () =>
        h(
          "div",
          {
            ...ctx.attrs,
            "data-scope": "order-list",
            "data-part": "root",
            onDragleave: (event: DragEvent) => {
              const host = event.currentTarget as HTMLElement | null;
              if (!host || !event.relatedTarget || !host.contains(event.relatedTarget as Node))
                dropLine.value = null;
            },
          },
          [
            h(
              "ol",
              {
                "data-scope": "order-list",
                "data-part": "list",
                "aria-label": props.label ?? undefined,
              },
              rows().map((option, index) => {
                const seam =
                  dropLine.value && dropLine.value.index === index
                    ? dropLine.value.before
                      ? "top"
                      : "bottom"
                    : undefined;
                return h(
                  "li",
                  {
                    key: option.value,
                    draggable: true,
                    "aria-roledescription": "Sortable item",
                    "data-scope": "order-list",
                    "data-part": "item",
                    "data-dragging": dragging.value === option.value ? "" : undefined,
                    "data-drop-line": seam,
                    onDragstart: (event: DragEvent) => {
                      dragging.value = option.value;
                      event.dataTransfer?.setData("text/plain", option.value);
                      if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
                    },
                    onDragend: reset,
                    onDragover: (event: DragEvent) => {
                      event.preventDefault();
                      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
                      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
                      const before = event.clientY < rect.top + rect.height / 2;
                      dropLine.value =
                        dragging.value != null && !(option.value === dragging.value && before)
                          ? { index, before }
                          : null;
                    },
                    onDrop: (event: DragEvent) => {
                      event.preventDefault();
                      drop();
                    },
                  },
                  [
                    h(
                      "span",
                      {
                        "data-scope": "order-list",
                        "data-part": "grip",
                        "aria-hidden": true,
                      },
                      "⋮⋮",
                    ),
                    h("span", { "data-scope": "order-list", "data-part": "label" }, option.label),
                    h("span", { "data-scope": "order-list", "data-part": "controls" }, [
                      moveControl(
                        messages.value.orderList.toTop,
                        ARROWS.top,
                        index === 0,
                        () => move(option.value, -index),
                      ),
                      moveControl(
                        messages.value.orderList.moveUp,
                        ARROWS.up,
                        index === 0,
                        () => move(option.value, -1),
                      ),
                      moveControl(
                        messages.value.orderList.moveDown,
                        ARROWS.down,
                        index === rows().length - 1,
                        () => move(option.value, 1),
                      ),
                      moveControl(
                        messages.value.orderList.toBottom,
                        ARROWS.bottom,
                        index === rows().length - 1,
                        () => move(option.value, rows().length - 1 - index),
                      ),
                    ]),
                  ],
                );
              }),
            ),
          ],
        );
    },
  }),
);
