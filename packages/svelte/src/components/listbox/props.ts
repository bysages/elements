import type { CollectionItem } from "@ark-ui/svelte/listbox";
import type { ListboxRootProps as ArkListboxRootProps } from "@ark-ui/svelte/listbox";

export type ListboxRootProps = ArkListboxRootProps<CollectionItem> & {
  /** One rung of the ladder for the row register and the filter field. */
  size?: "sm" | "md" | "lg";
};
