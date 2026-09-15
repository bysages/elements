import { Editable as ArkEditable, useEditableContext } from "@ark-ui/vue/editable";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, unref, type SetupContext } from "vue";

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
      const { innerHTML, ...props } = machine.getPreviewProps() as Record<string, unknown>;
      return h("span", { ...props, ...ctx.attrs }, ctx.slots.default?.() ?? machine.valueText);
    };
  },
});

/** Editable, dressed in the paper-and-ink system: bare ink while
 * reading, the full field recipe while editing. The parts —
 * Root, Area, Label, Preview, Input, EditTrigger, SubmitTrigger,
 * CancelTrigger, Control. Preview renders the machine's value as
 * text (the asChild escape hatch stays with the Ark primitives). */
export const Editable = { ...ArkEditable, Preview };

injectComponentStyle("editable");
