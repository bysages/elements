import { RadioGroup as ArkRadioGroup } from "@ark-ui/vue/radio-group";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** RadioGroup, dressed in the paper-and-ink system: a column of
 * full-circle seals that fill flat with primary ink when chosen, the dot
 * punched through as paper. The parts — Root, Label, Item,
 * ItemText, ItemControl, Indicator, ItemHiddenInput. */
const RadioGroupRoot = defineComponent({
  name: "SRadioGroupRoot",
  props: {
    /** One rung for the dial; the chosen dot rides it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("radio-group", attrs);
    injectComponentStyle("radio-group");

    return () => h(ArkRadioGroup.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

export type RadioGroupItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

/** The complete radio group behind one choice and its named rows. */
const RadioGroupFacade = defineComponent({
  name: "SRadioGroup",
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    items: { type: Array as PropType<RadioGroupItem[]>, required: true },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "vertical",
    },
    /** One rung for the dial; the chosen dot rides it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("radio-group");

    return () =>
      h(
        RadioGroupRoot,
        {
          ...attrs,
          disabled: props.disabled,
          invalid: props.invalid,
          readOnly: props.readOnly,
          required: props.required,
          orientation: props.orientation,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined ? {} : { modelValue: props.modelValue }),
          "onUpdate:modelValue": (value: string | null) => emit("update:modelValue", value ?? ""),
        },
        () => [
          ...(props.label ? [h(ArkRadioGroup.Label, () => props.label)] : []),
          ...props.items.map((item) =>
            h(
              ArkRadioGroup.Item,
              { key: item.value, value: item.value, disabled: item.disabled },
              () => [
                h(ArkRadioGroup.ItemControl),
                h(ArkRadioGroup.ItemText, () => item.label),
                h(ArkRadioGroup.ItemHiddenInput),
              ],
            ),
          ),
        ],
      );
  },
});

type RadioGroupParts = Omit<typeof ArkRadioGroup, "Root"> & {
  Root: typeof RadioGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const RadioGroup = defineFamily(RadioGroupFacade, {
  ...ArkRadioGroup,
  Root: RadioGroupRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof RadioGroupFacade &
  RadioGroupParts;
