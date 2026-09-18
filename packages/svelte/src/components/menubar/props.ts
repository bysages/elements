import type { HTMLAttributes } from "svelte/elements";

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

export interface MenubarProps extends HTMLAttributes<HTMLDivElement> {
  /** The menus across the bar, each with its entries. */
  items?: MenubarGroup[];
  /** Called with the entry's `value` when it is chosen. */
  onSelect?: (value: string) => void;
}
