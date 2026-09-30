import type { CollectionItem } from "@ark-ui/react/collection";
import type { ListboxRootComponentProps } from "@ark-ui/react/listbox";
import { Listbox as ArkListbox } from "@ark-ui/react/listbox";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Listbox, dressed in the paper-and-ink system: quiet rows of ink
 * where the checked row alone takes the flat primary fill. The API is
 * Ark's own — Root, Label, Input, Content, Empty, Item, ItemText,
 * ItemIndicator, ItemGroup, ItemGroupLabel, ValueText, plus
 * createListCollection. */

type ListboxOwnProps = {
  /** One rung of the ladder for the row register and the filter field. */
  size?: "sm" | "md" | "lg";
};

function ListboxRoot<T extends CollectionItem>(
  props: ListboxRootComponentProps<T, ListboxOwnProps>,
) {
  const { size = "md", ...rest } = props;
  return <ArkListbox.Root {...rest} data-size={size} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Listbox: Omit<typeof ArkListbox, "Root"> & {
  Root: typeof ListboxRoot;
} = {
  ...ArkListbox,
  Root: ListboxRoot,
};

export { createListCollection } from "@ark-ui/react/listbox";

injectComponentStyle("listbox");
