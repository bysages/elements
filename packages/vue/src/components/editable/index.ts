import { Editable as ArkEditable, useEditableContext } from "@ark-ui/vue/editable";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, unref, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/* zag hands the preview its text as an innerHTML prop (the Vue
   normalization turns its `children` into markup), while Ark's own
   preview still renders a slot — Vue warns of the clash on every
   mount. Rendering the machine's value as plain text here keeps one
   source and silences it. */
const Preview = defineComponent({
  name: "EditablePreview",
  inheritAttrs: false,
  setup(_, ctx: SetupContext) {
    injectComponentStyle("editable");

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
    const id = useElementId("editable", attrs);
    return () => h(ArkEditable.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The one-tag path: a named value with the house edit controls. Modes,
 * custom triggers, and alternate editors stay on the anatomy. */
const EditableFacade = defineComponent({
  name: "SEditable",
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        EditableRoot,
        {
          ...attrs,
          size: props.size,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
          placeholder: props.placeholder,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined
            ? {}
            : {
                modelValue: props.modelValue,
                "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
              }),
        },
        () => [
          ...(props.label ? [h(ArkEditable.Label, () => props.label)] : []),
          h(ArkEditable.Area, () => [h(Preview), h(ArkEditable.Input)]),
          h(ArkEditable.Control, () => [
            h(ArkEditable.EditTrigger, { "aria-label": "Edit" }, () =>
              iconNode("pencil", { width: 14, height: 14 }),
            ),
            h(ArkEditable.SubmitTrigger, { "aria-label": "Submit" }, () =>
              iconNode("check", { width: 14, height: 14 }),
            ),
            h(ArkEditable.CancelTrigger, { "aria-label": "Cancel" }, () =>
              iconNode("x", { width: 14, height: 14 }),
            ),
          ]),
        ],
      );
  },
});

type EditableParts = Omit<typeof ArkEditable, "Root" | "Preview"> & {
  Root: typeof EditableRoot;
  Preview: typeof Preview;
};

export const Editable = defineFamily(EditableFacade, {
  ...ArkEditable,
  Root: EditableRoot,
  Preview,
}) as unknown as typeof EditableFacade & EditableParts;
