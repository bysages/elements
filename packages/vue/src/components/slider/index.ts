import { Slider as ArkSlider } from "@ark-ui/vue/slider";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

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
    injectComponentStyle("slider");

    return () => h(ArkSlider.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Slider: Omit<typeof ArkSlider, "Root"> & { Root: typeof SliderRoot } = {
  ...ArkSlider,
  Root: SliderRoot,
};
