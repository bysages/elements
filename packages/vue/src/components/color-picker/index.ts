import { ColorPicker as ArkColorPicker, parseColor } from "@ark-ui/vue/color-picker";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** ColorPicker, dressed in the paper-and-ink system: a seal-sized swatch
 * on the paper, opening into an area and channel sliders where pigment is
 * picked. The parts — Root, Label, Control, Trigger, Positioner,
 * Content, Area, AreaThumb, AreaBackground, ValueText, ValueSwatch,
 * ChannelSlider, ChannelSliderLabel, ChannelSliderTrack, ChannelSliderThumb,
 * ChannelSliderValueText, ChannelInput, TransparencyGrid, SwatchGroup,
 * SwatchTrigger, SwatchIndicator, Swatch, EyeDropperTrigger, FormatTrigger,
 * FormatSelect, HiddenInput, Context. */
const ColorPickerRoot = defineComponent({
  name: "SColorPickerRoot",
  props: {
    /** One rung of the control-height ladder for the swatch seal. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("color-picker");

    return () => h(ArkColorPicker.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const ColorPicker: Omit<typeof ArkColorPicker, "Root"> & {
  Root: typeof ColorPickerRoot;
} = {
  ...ArkColorPicker,
  Root: ColorPickerRoot,
};

export { parseColor };
