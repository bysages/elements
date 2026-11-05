import type { HTMLAttributes } from "svelte/elements";

import type { FloatingPortalTarget } from "../../internal/floating";

export interface TreeSelectNode {
  label: string;
  value: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

export interface TreeSelectProps extends HTMLAttributes<HTMLButtonElement> {
  /** Two-way bindable — `bind:value` keeps the bound variable mirroring
   * the chosen leaf. */
  value?: string;
  data: TreeSelectNode[];
  placeholder?: string;
  /** Put a filter line at the top of the vessel; matches keep their
   * ancestors and the branches fan open. */
  filterable?: boolean;
  disabled?: boolean;
  /** After hydration, portal the floating vessel to body (`true`) or a CSS selector. */
  portal?: FloatingPortalTarget;
}
