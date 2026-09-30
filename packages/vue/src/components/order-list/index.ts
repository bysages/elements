import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, ref, type PropType } from "vue";

export interface OrderOption {
  label: string;
  value: string;
}

function arrowGlyph(paths: string[]) {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: 12,
      height: 12,
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    () => paths.map((d) => h("path", { d })),
  );
}

const ARROWS = {
  up: ["m18 15-6-6-6 6"],
  down: ["m6 9 6 6 6-6"],
  top: ["m18 15-6-6-6 6", "M5 4h14"],
  bottom: ["m6 9 6 6 6-6", "M5 20h14"],
};

/** A ledger the reader may rewrite: rows move by grip or by the side
 * arrows, and the group reports the new order as the value itself —
 * the model is the order. Dragging rides the native drag events — a
 * hairline of primary ink marks the seam the row will land on — so
 * touch keeps the buttons as its route. */
export const OrderList = defineComponent({
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
          role: "listbox",
          "aria-label": props.label ?? undefined,
          "aria-multiselectable": false,
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
            { "data-scope": "order-list", "data-part": "list" },
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
                  role: "option",
                  "aria-selected": true,
                  draggable: true,
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
                    h(
                      "button",
                      {
                        type: "button",
                        "aria-label": "Move to top",
                        "data-scope": "order-list",
                        "data-part": "move",
                        disabled: index === 0,
                        onClick: () => move(option.value, -index),
                      },
                      arrowGlyph(ARROWS.top),
                    ),
                    h(
                      "button",
                      {
                        type: "button",
                        "aria-label": "Move up",
                        "data-scope": "order-list",
                        "data-part": "move",
                        disabled: index === 0,
                        onClick: () => move(option.value, -1),
                      },
                      arrowGlyph(ARROWS.up),
                    ),
                    h(
                      "button",
                      {
                        type: "button",
                        "aria-label": "Move down",
                        "data-scope": "order-list",
                        "data-part": "move",
                        disabled: index === rows().length - 1,
                        onClick: () => move(option.value, 1),
                      },
                      arrowGlyph(ARROWS.down),
                    ),
                    h(
                      "button",
                      {
                        type: "button",
                        "aria-label": "Move to bottom",
                        "data-scope": "order-list",
                        "data-part": "move",
                        disabled: index === rows().length - 1,
                        onClick: () => move(option.value, rows().length - 1 - index),
                      },
                      arrowGlyph(ARROWS.bottom),
                    ),
                  ]),
                ],
              );
            }),
          ),
        ],
      );
  },
});
