import type { CollectionItem } from "@ark-ui/svelte/collection";
import type { ComboboxRootProps as ArkComboboxRootProps } from "@ark-ui/svelte/combobox";

export type ComboboxRootProps = ArkComboboxRootProps<CollectionItem> & {
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
};
