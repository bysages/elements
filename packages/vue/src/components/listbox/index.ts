import { Listbox as ArkListbox } from "@ark-ui/vue/listbox";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Listbox, dressed in the paper-and-ink system: quiet rows of ink
 * where the checked row alone takes the flat primary fill. The API is
 * Ark's own — Root, Label, Input, Content, Empty, Item, ItemText,
 * ItemIndicator, ItemGroup, ItemGroupLabel, ValueText; the collections
 * live in the shared collection module. */
export const Listbox = ArkListbox;

injectComponentStyle("listbox");
