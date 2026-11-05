import type { HTMLAttributes } from "svelte/elements";

import type { FloatingPortalTarget } from "../../internal/floating";

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
  /** After hydration, portal each popup to body (`true`) or a CSS selector. */
  portal?: FloatingPortalTarget;
}
