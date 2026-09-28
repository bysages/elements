import { AngleSlider as ArkAngleSlider } from "@ark-ui/vue/angle-slider";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

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

    return () => h(ArkAngleSlider.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const AngleSlider: Omit<typeof ArkAngleSlider, "Root"> & {
  Root: typeof AngleSliderRoot;
} = {
  ...ArkAngleSlider,
  Root: AngleSliderRoot,
};
