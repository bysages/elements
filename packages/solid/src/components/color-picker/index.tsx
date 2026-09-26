import { ColorPicker as ArkColorPicker } from "@ark-ui/solid/color-picker";
import type { ColorPickerRootProps as ArkColorPickerRootProps } from "@ark-ui/solid/color-picker";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/** Ark's ColorPicker, dressed in the paper-and-ink system: a seal-sized swatch
 * on the paper, opening into an area and channel sliders where pigment is
 * picked. The API is Ark's own — Root, Label, Control, Trigger, Positioner,
 * Content, Area, AreaThumb, AreaBackground, ValueText, ValueSwatch,
 * ChannelSlider, ChannelSliderLabel, ChannelSliderTrack, ChannelSliderThumb,
 * ChannelSliderValueText, ChannelInput, TransparencyGrid, SwatchGroup,
 * SwatchTrigger, SwatchIndicator, Swatch, EyeDropperTrigger, FormatTrigger,
 * FormatSelect, HiddenInput, Context. */

type ColorPickerOwnProps = {
  /** One rung of the control-height ladder for the swatch seal. */
  size?: "sm" | "md" | "lg";
};

function ColorPickerRoot(props: ArkColorPickerRootProps & ColorPickerOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkColorPicker.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const ColorPicker: Omit<typeof ArkColorPicker, "Root"> & { Root: typeof ColorPickerRoot } = {
  ...ArkColorPicker,
  Root: ColorPickerRoot,
};

injectComponentStyle("color-picker");
