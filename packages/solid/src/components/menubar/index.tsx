import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { injectComponentStyle } from "@bysages/core";
import { For, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

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

export interface MenubarProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** The menus across the bar, each with its entries. */
  items?: MenubarGroup[];
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
export function Menubar(props: MenubarProps) {
  const [own, rest] = splitProps(props, ["items", "onSelect"]);
  return (
    <div {...rest} data-scope="menubar" data-part="root" role="menubar">
      <For each={own.items ?? []}>
        {(group) => (
          <ArkMenu.Root positioning={{ placement: "bottom-start" }}>
            <ArkMenu.Trigger
              asChild={(triggerProps) => (
                <button {...triggerProps()} type="button" data-scope="menubar" data-part="trigger">
                  {group.label}
                </button>
              )}
            />
            <Portal>
              <ArkMenu.Positioner>
                <ArkMenu.Content>
                  <For each={group.items}>
                    {(entry) => (
                      <ArkMenu.Item
                        value={entry.value}
                        disabled={entry.disabled}
                        // Danger rides a data flag of our own — the
                        // menubar stylesheet tints the row.
                        data-danger={entry.danger ? "" : undefined}
                        onSelect={() => own.onSelect?.(entry.value)}
                      >
                        <ArkMenu.ItemText>{entry.label}</ArkMenu.ItemText>
                      </ArkMenu.Item>
                    )}
                  </For>
                </ArkMenu.Content>
              </ArkMenu.Positioner>
            </Portal>
          </ArkMenu.Root>
        )}
      </For>
    </div>
  );
}

injectComponentStyle("menubar");
// The popups keep the menu parts, so the menu stylesheet dresses them.
injectComponentStyle("menu");
