import { ColorPicker as ArkColorPicker, parseColor } from "@ark-ui/vue/color-picker";
import { injectComponentStyle } from "@bysages/core";
import {
  defineComponent,
  h,
  ref,
  type Component,
  type PropType,
  type Ref,
  type SetupContext,
} from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";

/** The parsed color representation accepted by the picker. */
type Color = ReturnType<typeof parseColor>;
import { useElementId } from "../../internal/id";

/** ColorPicker, dressed in the paper-and-ink system: a seal-sized swatch
 * on the paper, opening into an area, channel sliders, format inputs, and
 * an optional saved-color row. The parts — Root, Label, Control, Trigger, Positioner,
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

const eyedropperIcon = () => iconNode("pipette", { width: 14, height: 14 });

const checkIcon = () => iconNode("check", { width: 12, height: 12 });

function channelSlider(channel: "hue" | "alpha") {
  return h(ArkColorPicker.ChannelSlider, { channel }, () =>
    channel === "alpha"
      ? [
          h(ArkColorPicker.TransparencyGrid),
          h(ArkColorPicker.ChannelSliderTrack),
          h(ArkColorPicker.ChannelSliderThumb),
        ]
      : [h(ArkColorPicker.ChannelSliderTrack), h(ArkColorPicker.ChannelSliderThumb)],
  );
}

function channelInputs(channels: string[]) {
  return h(
    "div",
    { style: { display: "flex", gap: "0.5rem" } },
    channels.map((channel) => h(ArkColorPicker.ChannelInput as never, { channel })),
  );
}

function formatSwitch(format: Ref<"rgba" | "hsla">) {
  return h(
    "select",
    {
      "data-scope": "color-picker",
      "data-part": "format-select",
      "aria-label": "Color format",
      value: format.value,
      onChange: (event: Event) => {
        const value = (event.target as HTMLSelectElement).value;
        if (value === "rgba" || value === "hsla") format.value = value;
      },
    },
    ["rgba", "hsla"].map((itemFormat) =>
      h("option", { key: itemFormat, value: itemFormat }, itemFormat),
    ),
  );
}

/** The complete picker behind one color: a swatch trigger opens the area,
 * eyedropper, hue and alpha tracks, per-format channel inputs, and the
 * native format select. Optional swatches ride the same saved-color row. */
const ColorPickerFacade = defineComponent({
  name: "SColorPicker",
  props: {
    modelValue: { type: [String, Object] as PropType<string | Color>, default: undefined },
    defaultValue: { type: [String, Object] as PropType<string | Color>, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    /** Colors shown as the saved-color row. */
    swatches: { type: Array as PropType<string[]>, default: () => [] },
    /** Initial channel format shown by the built-in format switch. */
    defaultFormat: { type: String as PropType<"rgba" | "hsla">, default: "rgba" },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    const format = ref(props.defaultFormat);

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
          format: format.value,
          "onUpdate:format": (value: "rgba" | "hsla") => {
            format.value = value;
          },
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
              h("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } }, [
                h(ArkColorPicker.EyeDropperTrigger, () => eyedropperIcon()),
                h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      flex: 1,
                      minWidth: 0,
                    },
                  },
                  [channelSlider("hue"), channelSlider("alpha")],
                ),
              ]),
              ...(props.swatches.length
                ? [
                    h(ArkColorPicker.SwatchGroup, () =>
                      props.swatches.map((color) =>
                        h(ArkColorPicker.SwatchTrigger, { key: color, value: color }, () => [
                          h(ArkColorPicker.Swatch as never, { value: color }, () => [
                            h(ArkColorPicker.SwatchIndicator, () => checkIcon()),
                          ]),
                        ]),
                      ),
                    ),
                  ]
                : []),
              h(ArkColorPicker.View as never, { format: "rgba" }, () =>
                channelInputs(["red", "green", "blue", "alpha"]),
              ),
              h(ArkColorPicker.View as never, { format: "hsla" }, () =>
                channelInputs(["hue", "saturation", "lightness", "alpha"]),
              ),
              formatSwitch(format),
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
