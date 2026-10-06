/** Ark's Listbox, dressed in the paper-and-ink system: quiet rows of ink
 * where the checked row alone takes the flat primary fill. The API is
 * Ark's own — Root, Label, Input, Content, Empty, Item, ItemText,
 * ItemIndicator, ItemGroup, ItemGroupLabel, ValueText, plus
 * createListCollection. */
import { Listbox as ArkListbox } from "@ark-ui/svelte/listbox";

import { defineFamily } from "../../internal/family";
import ListboxFacade from "./Listbox.svelte";
import ListboxRoot from "./ListboxRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Listbox: typeof ListboxFacade &
  Omit<typeof ArkListbox, "Root"> & { Root: typeof ListboxRoot } = defineFamily(ListboxFacade, {
  ...ArkListbox,
  Root: ListboxRoot,
});

export type { ListboxRootProps } from "./props";
