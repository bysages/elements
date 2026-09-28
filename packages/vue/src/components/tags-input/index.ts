import { TagsInput as ArkTagsInput } from "@ark-ui/vue/tags-input";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** TagsInput, dressed in the paper-and-ink system: one field vessel
 * whose chips rest as quiet ink and lift only a tone when edited. The parts — Root, Label, Control, Input, ClearTrigger, Item,
 * ItemPreview, ItemText, ItemInput, ItemDeleteTrigger, HiddenInput,
 * Context. */
const TagsInputRoot = defineComponent({
  name: "STagsInputRoot",
  props: {
    /** One rung of the control-height ladder for the vessel at rest. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("tags-input");

    return () => h(ArkTagsInput.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const TagsInput: Omit<typeof ArkTagsInput, "Root"> & { Root: typeof TagsInputRoot } = {
  ...ArkTagsInput,
  Root: TagsInputRoot,
};
