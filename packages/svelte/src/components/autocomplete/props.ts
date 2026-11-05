import type { HTMLAttributes } from "svelte/elements";

import type { FloatingPortalTarget } from "../../internal/floating";

export interface AutoCompleteProps extends HTMLAttributes<HTMLDivElement> {
  /** Two-way bindable — `bind:value` keeps the bound variable mirroring
   * the field; a pick and a custom value land here alike. */
  value?: string;
  /** Seeds the suggestion list once. */
  items?: string[];
  placeholder?: string;
  /** Field text to match against; defaults to a case-insensitive
   * substring. */
  filter?: (item: string, input: string) => boolean;
  /** After hydration, portal the suggestion vessel to body (`true`) or a CSS selector. */
  portal?: FloatingPortalTarget;
}
