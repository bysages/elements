import { Menu as ArkMenu } from "@ark-ui/vue/menu";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";
import { Teleport } from "vue";

export interface MenubarEntry {
  label: string;
  value: string;
  danger?: boolean;
  disabled?: boolean;
}

export interface MenubarGroup {
  label: string;
  items: MenubarEntry[];
}

export interface MenubarProps {
  /** The menus across the bar, each with its entries. */
  items: MenubarGroup[];
  /** Called with the entry's `value` when it is chosen. */
  onSelect?: (value: string) => void;
}

/**
 * A desktop-style menu bar: a row of quiet ghost triggers, each opening
 * the same paper vessel as the menu family. The triggers are our own
 * buttons grafted onto the menu machine's trigger via `asChild` — the
 * machine keeps the trigger element (positioning, focus restore,
 * `data-state`) while the element wears the menubar scope. The popups
 * keep the menu parts untouched, so the menu stylesheet dresses them.
 *
 * Keyboard note: the triggers move between each other with Tab, not
 * arrow keys — cross-menu arrow traversal is out of scope for this
 * version. Inside an open menu the machine handles arrows and Escape.
 */
export const Menubar = defineComponent({
  name: "Menubar",
  props: {
    items: { type: Array as PropType<MenubarGroup[]>, default: () => [] },
    onSelect: { type: Function as PropType<(value: string) => void>, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "div",
        { ...ctx.attrs, "data-scope": "menubar", "data-part": "root", role: "menubar" },
        () =>
          props.items.map((group) =>
            h(
              ArkMenu.Root,
              { key: group.label, positioning: { placement: "bottom-start" } },
              () => [
                h(ArkMenu.Trigger, { asChild: true }, () =>
                  h(
                    "button",
                    {
                      type: "button",
                      "data-scope": "menubar",
                      "data-part": "trigger",
                    },
                    () => group.label,
                  ),
                ),
                h(Teleport, { to: "body" }, () => [
                  h(ArkMenu.Positioner, () =>
                    h(ArkMenu.Content, {}, () =>
                      group.items.map((entry) =>
                        h(
                          ArkMenu.Item,
                          {
                            key: entry.value,
                            value: entry.value,
                            disabled: entry.disabled,
                            // Danger rides a data flag of our own — the
                            // menubar stylesheet tints the row.
                            "data-danger": entry.danger ? "" : undefined,
                            onSelect: () => props.onSelect?.(entry.value),
                          },
                          () => h(ArkMenu.ItemText, () => entry.label),
                        ),
                      ),
                    ),
                  ),
                ]),
              ],
            ),
          ),
      );
  },
});

injectComponentStyle("menubar");
// The popups keep the menu parts, so the menu stylesheet dresses them.
injectComponentStyle("menu");
