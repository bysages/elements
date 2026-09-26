import type { CollectionItem } from "@ark-ui/solid/collection";
import { Combobox as ArkCombobox } from "@ark-ui/solid/combobox";
import type { ComboboxRootProps as ArkComboboxRootProps } from "@ark-ui/solid/combobox";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/** Ark's Combobox, dressed in the paper-and-ink system: the field carries
 * the control recipe and its matches dissolve open as a paper vessel, the
 * checked row taking the flat ink fill. The API is Ark's own — Root, Label,
 * Control, Input, Trigger, ClearTrigger, Positioner, Content, List, Empty,
 * Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */

type ComboboxOwnProps = {
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
};

function ComboboxRoot<T extends CollectionItem>(props: ArkComboboxRootProps<T> & ComboboxOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkCombobox.Root<T> {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Combobox: Omit<typeof ArkCombobox, "Root"> & { Root: typeof ComboboxRoot } = {
  ...ArkCombobox,
  Root: ComboboxRoot,
};

injectComponentStyle("combobox");
