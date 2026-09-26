import { Editable as ArkEditable, useEditableContext } from "@ark-ui/vue/editable";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, unref, type PropType, type SetupContext } from "vue";

/* zag hands the preview its text as an innerHTML prop (the Vue
   normalization turns its `children` into markup), while Ark's own
   preview still renders a slot — Vue warns of the clash on every
   mount. Rendering the machine's value as plain text here keeps one
   source and silences it. */
const Preview = defineComponent({
  name: "EditablePreview",
  inheritAttrs: false,
  setup(_, ctx: SetupContext) {
    const editable = useEditableContext();
    return () => {
      const machine = unref(editable);
      const { innerHTML: _innerHTML, ...props } = machine.getPreviewProps() as Record<
        string,
        unknown
      >;
      return h("span", { ...props, ...ctx.attrs }, ctx.slots.default?.() ?? machine.valueText);
    };
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while Preview keeps
 * its text rendering. */
const EditableRoot = defineComponent({
  name: "SEditableRoot",
  props: {
    /** One rung of the control-height ladder for the editing field. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    return () => h(ArkEditable.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/** Editable, dressed in the paper-and-ink system: bare ink while
 * reading, the full field recipe while editing. The parts —
 * Root, Area, Label, Preview, Input, EditTrigger, SubmitTrigger,
 * CancelTrigger, Control. Preview renders the machine's value as
 * text (the asChild escape hatch stays with the Ark primitives). */
export const Editable: Omit<typeof ArkEditable, "Root" | "Preview"> & {
  Root: typeof EditableRoot;
  Preview: typeof Preview;
} = {
  ...ArkEditable,
  Root: EditableRoot,
  Preview,
};

injectComponentStyle("editable");
