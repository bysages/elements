import { Switch as ArkSwitch } from "@ark-ui/vue/switch";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Switch, dressed in the paper-and-ink system: a track that rests
 * in the inset shade of the paper and fills flat with primary ink when on,
 * the thumb sliding on the spring. The parts — Root, Label,
 * Control, Thumb, HiddenInput. */
const SwitchRoot = defineComponent({
  name: "SSwitchRoot",
  props: {
    /** One rung for the thumb; the track travels with it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("switch", attrs);
    injectComponentStyle("switch");

    return () => h(ArkSwitch.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The complete switch behind one on/off model and its label. */
const SwitchFacade = defineComponent({
  name: "SSwitch",
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultValue: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    /** One rung for the thumb; the track travels with it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: {
    "update:modelValue": (_value: boolean) => true,
  },
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("switch");

    return () =>
      h(
        SwitchRoot,
        {
          ...attrs,
          size: props.size,
          disabled: props.disabled,
          invalid: props.invalid,
          readOnly: props.readOnly,
          required: props.required,
          defaultChecked: props.defaultValue,
          ...(props.modelValue === undefined ? {} : { checked: props.modelValue }),
          "onUpdate:checked": (checked: boolean) => emit("update:modelValue", checked),
        } as never,
        () => [
          h(ArkSwitch.Control, () => h(ArkSwitch.Thumb)),
          ...(props.label ? [h(ArkSwitch.Label, () => props.label)] : []),
          h(ArkSwitch.HiddenInput),
        ],
      );
  },
});

type SwitchParts = Omit<typeof ArkSwitch, "Root"> & { Root: typeof SwitchRoot };

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Switch = defineFamily(SwitchFacade, {
  ...ArkSwitch,
  Root: SwitchRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof SwitchFacade &
  SwitchParts;
