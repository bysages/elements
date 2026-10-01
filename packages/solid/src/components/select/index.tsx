import type { CollectionItem } from "@ark-ui/solid/collection";
import { Select as ArkSelect } from "@ark-ui/solid/select";
import type { SelectRootProps as ArkSelectRootProps } from "@ark-ui/solid/select";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/** Ark's Select, dressed in the paper-and-ink system: the trigger is the
 * whole control and its list dissolves open as a paper vessel, the checked
 * row taking the flat ink fill. The API is Ark's own — Root, Label, Control,
 * Trigger, ValueText, Indicator, ClearTrigger, HiddenSelect, Positioner,
 * Content, List, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */

type SelectOwnProps = {
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
};

function SelectRoot<T extends CollectionItem>(props: ArkSelectRootProps<T> & SelectOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkSelect.Root<T> {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Select: Omit<typeof ArkSelect, "Root"> & { Root: typeof SelectRoot } = {
  ...ArkSelect,
  Root: SelectRoot,
};

/** The platform's own list wearing the control recipe. */
export { NativeSelect, type NativeSelectOption, type NativeSelectProps } from "./native";

injectComponentStyle("select");
