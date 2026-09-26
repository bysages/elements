/** Ark's ColorPicker, dressed in the paper-and-ink system: a seal-sized swatch
 * on the paper, opening into an area and channel sliders where pigment is
 * picked. The API is Ark's own — Root, Label, Control, Trigger, Positioner,
 * Content, Area, AreaThumb, AreaBackground, ValueText, ValueSwatch,
 * ChannelSlider, ChannelSliderLabel, ChannelSliderTrack, ChannelSliderThumb,
 * ChannelSliderValueText, ChannelInput, TransparencyGrid, SwatchGroup,
 * SwatchTrigger, SwatchIndicator, Swatch, EyeDropperTrigger, FormatTrigger,
 * FormatSelect, HiddenInput, Context. */
import { ColorPicker as ArkColorPicker } from "@ark-ui/svelte/color-picker";
import { injectComponentStyle } from "@bysages/core";

import ColorPickerRoot from "./ColorPickerRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const ColorPicker: Omit<typeof ArkColorPicker, "Root"> & { Root: typeof ColorPickerRoot } = {
  ...ArkColorPicker,
  Root: ColorPickerRoot,
};

injectComponentStyle("color-picker");
