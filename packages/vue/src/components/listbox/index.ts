import { Listbox as ArkListbox } from "@ark-ui/vue/listbox";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** Listbox, dressed in the paper-and-ink system: quiet rows of ink
 * where the checked row alone takes the flat primary fill. The parts — Root, Label, Input, Content, Empty, Item, ItemText,
 * ItemIndicator, ItemGroup, ItemGroupLabel, ValueText; the collections
 * live in the shared collection module. */

const ListboxRoot = defineComponent({
  name: "SListboxRoot",
  props: {
    /** One rung of the ladder for the row register and the filter field. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("listbox");

    // `as never` sidesteps the h() overload the collection prop's generic
    // cannot unroll — see the select preset for the same turn.
    return () => h(ArkListbox.Root as never, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data properties
 * so Root can be the sized wrapper while the rest stay Ark's own parts. */
export const Listbox: Omit<typeof ArkListbox, "Root"> & { Root: typeof ListboxRoot } = {
  ...ArkListbox,
  Root: ListboxRoot,
};
