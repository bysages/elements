import { Fieldset as ArkFieldset } from "@ark-ui/vue/fieldset";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Fieldset, dressed in the paper-and-ink system: a song-serif
 * legend heading a column of fields. The parts — Root, Legend,
 * HelperText, ErrorText. */
const FieldsetRoot = defineComponent({
  name: "SFieldsetRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("fieldset", attrs);

    return () => h(ArkFieldset.Root, { ...attrs, id: id.value }, slots);
  },
});

/** The one-tag path: one label and optional description around the
 * caller's controls; compound or bespoke groups keep the anatomy. */
const FieldsetFacade = defineComponent({
  name: "SFieldset",
  props: {
    label: { type: String, default: undefined },
    description: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }: SetupContext) {
    return () =>
      h(
        FieldsetRoot,
        {
          ...attrs,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
        },
        () => [
          ...(props.label ? [h(ArkFieldset.Legend, () => props.label)] : []),
          slots.default?.(),
          ...(props.description ? [h(ArkFieldset.HelperText, () => props.description)] : []),
        ],
      );
  },
});

export const Fieldset = defineFamily(FieldsetFacade, {
  ...ArkFieldset,
  Root: FieldsetRoot,
}) as unknown as typeof FieldsetFacade &
  (Omit<typeof ArkFieldset, "Root"> & { Root: typeof FieldsetRoot });

injectComponentStyle("fieldset");
