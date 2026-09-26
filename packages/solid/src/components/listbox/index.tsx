import type { CollectionItem } from "@ark-ui/solid/collection";
import { Listbox as ArkListbox } from "@ark-ui/solid/listbox";
import type { ListboxRootProps as ArkListboxRootProps } from "@ark-ui/solid/listbox";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/** Ark's Listbox, dressed in the paper-and-ink system: quiet rows of ink
 * where the checked row alone takes the flat primary fill. The API is
 * Ark's own — Root, Label, Input, Content, Empty, Item, ItemText,
 * ItemIndicator, ItemGroup, ItemGroupLabel, ValueText, plus
 * createListCollection. */

type ListboxOwnProps = {
  /** One rung of the ladder for the row register and the filter field. */
  size?: "sm" | "md" | "lg";
};

// The sized root keeps the list's collection generic; its return rides
// as any the way Ark's own RootComponent types do, past the checker's
// host mismatch.
const ArkRoot = ArkListbox.Root as <T extends CollectionItem>(props: ArkListboxRootProps<T>) => any;

function ListboxRoot<T extends CollectionItem>(props: ArkListboxRootProps<T> & ListboxOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkRoot {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Listbox: Omit<typeof ArkListbox, "Root"> & { Root: typeof ListboxRoot } = {
  ...ArkListbox,
  Root: ListboxRoot,
};

injectComponentStyle("listbox");
