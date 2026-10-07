import { ColorPicker as ArkColorPicker, parseColor } from "@ark-ui/vue/color-picker";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";

/** The parsed color representation accepted by the picker. */
type Color = ReturnType<typeof parseColor>;
import { useElementId } from "../../internal/id";

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
    const id = useElementId("color-picker", attrs);
    injectComponentStyle("color-picker");

    return () =>
      h(
        withPresenceRoot(ArkColorPicker.Root),
        withPresenceEnter({ ...attrs, id: id.value, "data-size": props.size }),
        slots,
      );
  },
});

/** The complete picker behind one color: a swatch trigger opens the area,
 * hue and alpha tracks, and a hex field. Saved swatches and format switches
 * remain anatomy work. */
const ColorPickerFacade = defineComponent({
  name: "SColorPicker",
  props: {
    modelValue: { type: [String, Object] as PropType<string | Color>, default: undefined },
    defaultValue: { type: [String, Object] as PropType<string | Color>, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    return () =>
      h(
        ColorPickerRoot,
        {
          ...attrs,
          defaultValue:
            typeof props.defaultValue === "string"
              ? parseColor(props.defaultValue)
              : props.defaultValue,
          modelValue:
            typeof props.modelValue === "string" ? parseColor(props.modelValue) : props.modelValue,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
          "onUpdate:modelValue": (value: unknown) => emit("update:modelValue", value),
        },
        () => [
          ...(props.label ? [h(ArkColorPicker.Label, () => props.label)] : []),
          h(ArkColorPicker.Control, () => [
            h(ArkColorPicker.ChannelInput as never, { channel: "hex" }),
            h(ArkColorPicker.Trigger, () => [
              h(ArkColorPicker.TransparencyGrid),
              h(ArkColorPicker.ValueSwatch),
            ]),
          ]),
          h(ArkColorPicker.Positioner, () =>
            h(ArkColorPicker.Content, () => [
              h(ArkColorPicker.Area, () => [
                h(ArkColorPicker.AreaBackground),
                h(ArkColorPicker.AreaThumb),
              ]),
              h(ArkColorPicker.ChannelSlider, { channel: "hue" }, () => [
                h(ArkColorPicker.ChannelSliderTrack),
                h(ArkColorPicker.ChannelSliderThumb),
              ]),
              h(ArkColorPicker.ChannelSlider, { channel: "alpha" }, () => [
                h(ArkColorPicker.TransparencyGrid),
                h(ArkColorPicker.ChannelSliderTrack),
                h(ArkColorPicker.ChannelSliderThumb),
              ]),
            ]),
          ),
          h(ArkColorPicker.HiddenInput),
        ],
      );
  },
});

export const ColorPicker = defineFamily(ColorPickerFacade, {
  ...ArkColorPicker,
  Root: ColorPickerRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof ColorPickerFacade &
  Omit<typeof ArkColorPicker, "Root"> & { Root: typeof ColorPickerRoot };

export { parseColor };
