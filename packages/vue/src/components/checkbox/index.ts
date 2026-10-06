import { Checkbox as ArkCheckbox } from "@ark-ui/vue/checkbox";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Checkbox, dressed in the paper-and-ink system: a square-cut seal
 * that fills flat with primary ink when ticked, the mark springing into
 * place. The parts — Root, Label, Control, Indicator,
 * HiddenInput. */
const CheckboxRoot = defineComponent({
  name: "SCheckboxRoot",
  props: {
    /** One rung for the control's box: the tick scales with it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("checkbox", attrs);
    injectComponentStyle("checkbox");

    return () => h(ArkCheckbox.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The complete checkbox behind one checked model and its label. */
const CheckboxFacade = defineComponent({
  name: "SCheckbox",
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultValue: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    /** One rung for the control's box: the tick scales with it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("checkbox");

    return () =>
      h(
        CheckboxRoot,
        {
          ...attrs,
          disabled: props.disabled,
          invalid: props.invalid,
          readOnly: props.readOnly,
          required: props.required,
          defaultChecked: props.defaultValue,
          ...(props.modelValue === undefined ? {} : { checked: props.modelValue }),
          "onUpdate:checked": (checked: boolean) => emit("update:modelValue", checked === true),
        } as never,
        () => [
          h(ArkCheckbox.Control, () =>
            h(ArkCheckbox.Indicator, () => iconNode("check", { width: 14, height: 14 })),
          ),
          ...(props.label ? [h(ArkCheckbox.Label, () => props.label)] : []),
          h(ArkCheckbox.HiddenInput),
        ],
      );
  },
});

type CheckboxParts = Omit<typeof ArkCheckbox, "Root"> & {
  Root: typeof CheckboxRoot;
};

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Checkbox = defineFamily(CheckboxFacade, {
  ...ArkCheckbox,
  Root: CheckboxRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof CheckboxFacade &
  CheckboxParts;
