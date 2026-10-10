import { Slider as ArkSlider } from "@ark-ui/vue/slider";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Slider, dressed in the paper-and-ink system: a recessed track the
 * primary ink runs along, a paper-seal thumb, and hairline tick markers.
 * The parts — Root, Label, ValueText, Control, Track, Range,
 * Thumb, MarkerGroup, Marker, DraggingIndicator, HiddenInput. */
const SliderRoot = defineComponent({
  name: "SSliderRoot",
  props: {
    /** One rung of the part-size ladder for the thumb seal. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("slider", attrs);
    injectComponentStyle("slider");

    return () => h(ArkSlider.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The common single-value slider; ranges and markers stay on the anatomy. */
const SliderFacade = defineComponent({
  name: "SSlider",
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 50 },
    label: { type: String, default: undefined },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
    /** One rung of the part-size ladder for the thumb seal. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("slider");

    return () =>
      h(
        SliderRoot,
        {
          ...attrs,
          disabled: props.disabled,
          invalid: props.invalid,
          readOnly: props.readOnly,
          required: props.required,
          min: props.min,
          max: props.max,
          step: props.step,
          orientation: props.orientation,
          defaultValue: [props.defaultValue],
          ...(props.modelValue === undefined ? {} : { modelValue: [props.modelValue] }),
          "onUpdate:modelValue": (value: number[]) =>
            emit("update:modelValue", value.at(0) ?? props.min),
        },
        () => [
          ...(props.label ? [h(ArkSlider.Label, () => props.label)] : []),
          h(ArkSlider.ValueText),
          h(ArkSlider.Control, () => [
            h(ArkSlider.Track, () => h(ArkSlider.Range)),
            h(ArkSlider.Thumb, { index: 0 }, () => [h(ArkSlider.HiddenInput)]),
          ]),
        ],
      );
  },
});

type SliderParts = Omit<typeof ArkSlider, "Root"> & { Root: typeof SliderRoot };

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Slider = defineFamily(SliderFacade, {
  ...ArkSlider,
  Root: SliderRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof SliderFacade &
  SliderParts;
