import type { CollectionItem } from "@ark-ui/react/collection";
import { Select as ArkSelect } from "@ark-ui/react/select";
import type { SelectRootComponentProps } from "@ark-ui/react/select";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Select, dressed in the paper-and-ink system: the trigger is the
 * whole control and its list dissolves open as a paper vessel, the checked
 * row taking the flat ink fill. The API is Ark's own — Root, Label, Control,
 * Trigger, ValueText, Indicator, ClearTrigger, HiddenSelect, Positioner,
 * Content, List, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */

type SelectOwnProps = {
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
};

function SelectRoot<T extends CollectionItem>(props: SelectRootComponentProps<T, SelectOwnProps>) {
  const { size = "md", ...rest } = props;
  return <ArkSelect.Root {...rest} data-size={size} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Select: Omit<typeof ArkSelect, "Root"> & { Root: typeof SelectRoot } = {
  ...ArkSelect,
  Root: SelectRoot,
};

injectComponentStyle("select");
