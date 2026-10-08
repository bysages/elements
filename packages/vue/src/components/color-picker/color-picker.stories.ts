import { parseColor } from "@ark-ui/vue/color-picker";
import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { ColorPicker } from ".";

const meta: Meta = { title: "Components/Forms/Color Picker" };
export default meta;

function eyedropperIcon() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [
      h("path", {
        d: "m15 3 6 6M11.5 6.5 3 15v6h6l8.5-8.5M11.5 6.5l6 6",
      }),
    ],
  );
}

function channelSlider(channel: "hue" | "alpha") {
  return h(ColorPicker.ChannelSlider, { channel }, () =>
    channel === "alpha"
      ? [
          h(ColorPicker.TransparencyGrid),
          h(ColorPicker.ChannelSliderTrack),
          h(ColorPicker.ChannelSliderThumb),
        ]
      : [h(ColorPicker.ChannelSliderTrack), h(ColorPicker.ChannelSliderThumb)],
  );
}

function checkIcon() {
  return h(
    "svg",
    {
      width: 12,
      height: 12,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2.5,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m4 12.5 5 5L20 6.5" })],
  );
}

const savedColors = ["#eb5e41", "#3d5a80", "#61892f", "#d9a648", "#7048a8"];

function channelRow(channels: string[]) {
  return channels.map((channel) => h(ColorPicker.ChannelInput as any, { channel }));
}

/** The facade is the one-tag path for the common completion. */
export const Basic = {
  render: () =>
    h(ColorPicker, {
      defaultValue: "#3d5a80",
      label: "Ink color",
      swatches: savedColors,
    }),
};

/** One hex input beside the seal trigger — alpha lives in the popup where
 * the slider and its channel input already speak for it. The popup opens
 * the picking area, the hue and alpha tracks beside the eyedropper, the
 * saved swatches, one channel-input row per format, and the native
 * format select. */
export const Anatomy = {
  args: {
    label: "Ink color",
  },

  render: (args: any) =>
    h(ColorPicker.Root, { defaultValue: parseColor("#3d5a80"), defaultFormat: "rgba" }, () => [
      h(ColorPicker.Label, () => args.label),
      h(ColorPicker.Control, () => [
        h(ColorPicker.ChannelInput as any, { channel: "hex" }),
        h(ColorPicker.Trigger, () => [h(ColorPicker.TransparencyGrid), h(ColorPicker.ValueSwatch)]),
      ]),
      h(ColorPicker.Positioner, () =>
        h(ColorPicker.Content, () => [
          h(ColorPicker.Area, () => [h(ColorPicker.AreaBackground), h(ColorPicker.AreaThumb)]),
          h("div", { "data-scope": "color-picker", "data-part": "channel-controls" }, [
            h(ColorPicker.EyeDropperTrigger, () => eyedropperIcon()),
            h(
              "div",
              {
                "data-scope": "color-picker",
                "data-part": "channel-sliders",
              },
              [channelSlider("hue"), channelSlider("alpha")],
            ),
          ]),
          h(ColorPicker.SwatchGroup, () =>
            savedColors.map((color) =>
              h(ColorPicker.SwatchTrigger, { key: color, value: color }, () => [
                h(ColorPicker.Swatch as any, { value: color }, () => [
                  h(ColorPicker.SwatchIndicator, () => checkIcon()),
                ]),
              ]),
            ),
          ),
          h(ColorPicker.View as any, { format: "rgba" }, () =>
            channelRow(["red", "green", "blue", "alpha"]),
          ),
          h(ColorPicker.View as any, { format: "hsla" }, () =>
            channelRow(["hue", "saturation", "lightness", "alpha"]),
          ),
          h(ColorPicker.View as any, { format: "hsba" }, () =>
            channelRow(["hue", "saturation", "brightness", "alpha"]),
          ),
          h(ColorPicker.FormatSelect),
        ]),
      ),
      h(ColorPicker.HiddenInput),
    ]),
};
