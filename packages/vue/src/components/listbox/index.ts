import { Listbox as ArkListbox, createListCollection } from "@ark-ui/vue/listbox";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Listbox, dressed in the paper-and-ink system: quiet rows of ink
 * where the checked row alone takes the flat primary fill. The API is
 * Ark's own — Root, Label, Input, Content, Empty, Item, ItemText,
 * ItemIndicator, ItemGroup, ItemGroupLabel, ValueText, plus
 * createListCollection. */
export const Listbox = ArkListbox;
export { createListCollection };

injectComponentStyle("listbox");
