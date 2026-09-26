/** Ark's Listbox, dressed in the paper-and-ink system: quiet rows of ink
 * where the checked row alone takes the flat primary fill. The API is
 * Ark's own — Root, Label, Input, Content, Empty, Item, ItemText,
 * ItemIndicator, ItemGroup, ItemGroupLabel, ValueText, plus
 * createListCollection. */
import { Listbox as ArkListbox } from "@ark-ui/svelte/listbox";
import { injectComponentStyle } from "@bysages/core";

import ListboxRoot from "./ListboxRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Listbox: Omit<typeof ArkListbox, "Root"> & { Root: typeof ListboxRoot } = {
  ...ArkListbox,
  Root: ListboxRoot,
};

export type { ListboxRootProps } from "./props";

injectComponentStyle("listbox");
