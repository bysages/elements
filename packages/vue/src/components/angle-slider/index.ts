import { AngleSlider as ArkAngleSlider } from "@ark-ui/vue/angle-slider";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** AngleSlider, dressed in the paper-and-ink system: a flat paper dial
 * the thumb sweeps as a pigment needle over hairline degree ticks. The parts — Root, Label, ValueText, Control, Thumb, MarkerGroup,
 * Marker, HiddenInput. */
const AngleSliderRoot = defineComponent({
  name: "SAngleSliderRoot",
  props: {
    /** One rung of the dial ladder — the diameter the needle sweeps. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("angle-slider");
    const id = useElementId("angle-slider", attrs);

    return () => h(ArkAngleSlider.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The complete dial behind one angle and its cardinal degree marks. */
const AngleSliderFacade = defineComponent({
  name: "SAngleSlider",
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 45 },
    label: { type: String, default: undefined },
    step: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    /** One rung of the dial ladder — the diameter the needle sweeps. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("angle-slider");

    return () =>
      h(
        AngleSliderRoot,
        {
          ...attrs,
          disabled: props.disabled,
          readOnly: props.readOnly,
          step: props.step,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined ? {} : { modelValue: props.modelValue }),
          "onUpdate:modelValue": (value: number) => emit("update:modelValue", value),
        },
        () => [
          ...(props.label ? [h(ArkAngleSlider.Label, () => props.label)] : []),
          h(ArkAngleSlider.ValueText),
          h(ArkAngleSlider.Control, () => [
            h(ArkAngleSlider.MarkerGroup, () =>
              [0, 90, 180, 270].map((degree) =>
                h(ArkAngleSlider.Marker, { key: degree, value: degree }),
              ),
            ),
            h(ArkAngleSlider.Thumb, () => [h(ArkAngleSlider.HiddenInput)]),
          ]),
        ],
      );
  },
});

type AngleSliderParts = Omit<typeof ArkAngleSlider, "Root"> & {
  Root: typeof AngleSliderRoot;
};

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const AngleSlider = defineFamily(AngleSliderFacade, {
  ...ArkAngleSlider,
  Root: AngleSliderRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof AngleSliderFacade &
  AngleSliderParts;
