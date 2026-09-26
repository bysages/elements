import type { CollectionItem } from "@ark-ui/react/collection";
import { Combobox as ArkCombobox } from "@ark-ui/react/combobox";
import type { ComboboxRootComponentProps } from "@ark-ui/react/combobox";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Combobox, dressed in the paper-and-ink system: the field carries
 * the control recipe and its matches dissolve open as a paper vessel, the
 * checked row taking the flat ink fill. The API is Ark's own — Root, Label,
 * Control, Input, Trigger, ClearTrigger, Positioner, Content, List, Empty,
 * Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */

type ComboboxOwnProps = {
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
};

function ComboboxRoot<T extends CollectionItem>(
  props: ComboboxRootComponentProps<T, ComboboxOwnProps>,
) {
  const { size = "md", ...rest } = props;
  return <ArkCombobox.Root {...rest} data-size={size} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Combobox: Omit<typeof ArkCombobox, "Root"> & { Root: typeof ComboboxRoot } = {
  ...ArkCombobox,
  Root: ComboboxRoot,
};

injectComponentStyle("combobox");
