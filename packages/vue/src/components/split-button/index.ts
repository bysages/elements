import { Menu as ArkMenu } from "@ark-ui/vue/menu";
import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";
import { Teleport } from "vue";

import { Button } from "../button";

export interface SplitButtonEntry {
  label: string;
  /** Handed back with `select` when the entry is chosen. */
  value: string;
  danger?: boolean;
  disabled?: boolean;
}

/**
 * A primary action with its alternatives one seam away: the main button
 * fires `click`, the fitted arrow opens a paper vessel of the same
 * register whose entries emit `select` with their value. The arrow is
 * the menu machine's trigger grafting our button via `asChild` — the
 * machine keeps the element (positioning, focus, `data-state`), the
 * button recipe dresses it. The popup keeps the menu parts untouched.
 */
export const SplitButton = defineComponent({
  name: "SplitButton",
  props: {
    /** The main action's label. */
    label: { type: String, required: true },
    /** The dropdown's entries. */
    items: { type: Array as PropType<SplitButtonEntry[]>, default: () => [] },
    /** How both halves rest; the arrow always reads as one control with
     * the main button. */
    variant: { type: String, default: "solid" },
    tone: { type: String, default: "ink" },
    size: { type: String, default: "md" },
    disabled: { type: Boolean, default: false },
  },
  emits: {
    /** The main button was pressed. */
    click: () => true,
    /** An entry was chosen; carries its `value`. */
    select: (value: string) => typeof value === "string",
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h("div", { ...ctx.attrs, "data-scope": "split-button", "data-part": "root" }, () => [
        h(
          Button,
          {
            variant: props.variant,
            tone: props.tone,
            size: props.size,
            disabled: props.disabled,
            onClick: () => ctx.emit("click"),
          },
          () => props.label,
        ),
        h(ArkMenu.Root, { positioning: { placement: "bottom-end" } }, () => [
          h(ArkMenu.Trigger, { asChild: true }, () =>
            h(
              Button,
              {
                variant: props.variant,
                tone: props.tone,
                square: true,
                size: props.size,
                disabled: props.disabled,
                "aria-label": "More actions",
              },
              chevronDown,
            ),
          ),
          h(Teleport, { to: "body" }, () => [
            h(ArkMenu.Positioner, () =>
              h(ArkMenu.Content, {}, () =>
                props.items.map((entry) =>
                  h(
                    ArkMenu.Item,
                    {
                      key: entry.value,
                      value: entry.value,
                      disabled: entry.disabled,
                      // Danger rides a data flag of our own — the
                      // split-button stylesheet tints the row.
                      "data-danger": entry.danger ? "" : undefined,
                      onSelect: () => ctx.emit("select", entry.value),
                    },
                    () => h(ArkMenu.ItemText, () => entry.label),
                  ),
                ),
              ),
            ),
          ]),
        ]),
      ]);
  },
});

/** One stroke pointing down: all a fitted dropdown arrow needs. */
function chevronDown() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m6 9 6 6 6-6" })],
  );
}

injectComponentStyle("split-button");
// The popup keeps the menu parts, so the menu stylesheet dresses them.
injectComponentStyle("menu");
