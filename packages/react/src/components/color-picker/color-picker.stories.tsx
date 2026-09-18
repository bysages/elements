import { parseColor } from "@ark-ui/react/color-picker";
import type { Meta } from "@storybook/react-vite";

import { ColorPicker } from ".";

const meta: Meta = { title: "Components/Forms/Color Picker" };
export default meta;

const eyedropperGlyph = (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    aria-hidden="true"
  >
    <path d="m15 3 6 6M11.5 6.5 3 15v6h6l8.5-8.5M11.5 6.5l6 6" />
  </svg>
);

function channelSlider(channel: "hue" | "alpha") {
  return (
    <ColorPicker.ChannelSlider channel={channel}>
      {channel === "alpha" ? <ColorPicker.TransparencyGrid /> : null}
      <ColorPicker.ChannelSliderTrack />
      <ColorPicker.ChannelSliderThumb />
    </ColorPicker.ChannelSlider>
  );
}

const checkGlyph = (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

const savedColors = ["#eb5e41", "#3d5a80", "#61892f", "#d9a648", "#7048a8"];

function channelRow(channels: string[]) {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {channels.map((channel) => (
        <ColorPicker.ChannelInput key={channel} channel={channel as any} />
      ))}
    </div>
  );
}

/** The seal trigger holds the picked color; the popup opens the picking
 * area, the hue and alpha tracks beside the eyedropper, the saved swatches,
 * and one channel-input row per format, switched by the format select. */
export const Basic = {
  args: {
    label: "Ink color",
  },
  render: (args: any) => (
    <ColorPicker.Root defaultValue={parseColor("#3d5a80")} defaultFormat="rgba">
      <ColorPicker.Label>{args.label}</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.ChannelInput channel="alpha" />
        <ColorPicker.Trigger>
          <ColorPicker.TransparencyGrid />
          <ColorPicker.ValueSwatch />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ColorPicker.EyeDropperTrigger>{eyedropperGlyph}</ColorPicker.EyeDropperTrigger>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                flex: 1,
                minWidth: 0,
              }}
            >
              {channelSlider("hue")}
              {channelSlider("alpha")}
            </div>
          </div>
          <ColorPicker.SwatchGroup>
            {savedColors.map((color) => (
              <ColorPicker.SwatchTrigger key={color} value={color}>
                <ColorPicker.Swatch value={color}>
                  <ColorPicker.SwatchIndicator>{checkGlyph}</ColorPicker.SwatchIndicator>
                </ColorPicker.Swatch>
              </ColorPicker.SwatchTrigger>
            ))}
          </ColorPicker.SwatchGroup>
          <ColorPicker.View format="rgba">
            {channelRow(["red", "green", "blue", "alpha"])}
          </ColorPicker.View>
          <ColorPicker.View format="hsla">
            {channelRow(["hue", "saturation", "lightness", "alpha"])}
          </ColorPicker.View>
          <ColorPicker.FormatSelect />
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  ),
};
