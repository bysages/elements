import { Menu as ArkMenu } from "@ark-ui/react/menu";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

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
export interface MenubarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** The menus across the bar, each with its entries. */
  items: MenubarGroup[];
  /** Called with the entry's `value` when it is chosen. */
  onSelect?: (value: string) => void;
}

export function Menubar({ items, onSelect, children, ...rest }: MenubarProps) {
  return (
    <div {...rest} data-scope="menubar" data-part="root" role="menubar">
      {items.map((group) => (
        <ArkMenu.Root key={group.label} positioning={{ placement: "bottom-start" }}>
          <ArkMenu.Trigger asChild>
            <button type="button" data-scope="menubar" data-part="trigger">
              {group.label}
            </button>
          </ArkMenu.Trigger>
          <Portal>
            <ArkMenu.Positioner>
              <ArkMenu.Content>
                {group.items.map((entry) => (
                  <ArkMenu.Item
                    key={entry.value}
                    value={entry.value}
                    disabled={entry.disabled}
                    // Danger rides a data flag of our own — the menubar
                    // stylesheet tints the row.
                    data-danger={entry.danger ? "" : undefined}
                    onSelect={() => onSelect?.(entry.value)}
                  >
                    <ArkMenu.ItemText>{entry.label}</ArkMenu.ItemText>
                  </ArkMenu.Item>
                ))}
              </ArkMenu.Content>
            </ArkMenu.Positioner>
          </Portal>
        </ArkMenu.Root>
      ))}
      {children}
    </div>
  );
}

injectComponentStyle("menubar");
// The popups keep the menu parts, so the menu stylesheet dresses them.
injectComponentStyle("menu");
