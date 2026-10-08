import { ColorPicker as ArkColorPicker, parseColor, type Color } from "@ark-ui/solid/color-picker";
import type { ColorPickerRootProps as ArkColorPickerRootProps } from "@ark-ui/solid/color-picker";
import { injectComponentStyle } from "@bysages/core";
import { Show, splitProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

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
  const id = useElementId("color-picker", () => rest.id);
  return <ArkColorPicker.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

type ColorPickerFacadeProps = Omit<
  ComponentProps<typeof ColorPickerRoot>,
  | "children"
  | "defaultValue"
  | "disabled"
  | "invalid"
  | "label"
  | "onValueChange"
  | "required"
  | "value"
> & {
  value?: string | Color;
  defaultValue?: string | Color;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  label?: string;
  onValueChange?: (value: unknown) => void;
};

function ColorPickerFacade(props: ColorPickerFacadeProps) {
  injectComponentStyle("color-picker");
  const toColor = (color: string | Color | undefined): Color | undefined =>
    typeof color === "string" ? parseColor(color) : color;

  return (
    <ColorPickerRoot
      {...props}
      value={toColor(props.value)}
      defaultValue={toColor(props.defaultValue)}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
      onValueChange={(details: { value: unknown }) => props.onValueChange?.(details.value)}
    >
      <Show when={props.label}>
        <ArkColorPicker.Label>{props.label}</ArkColorPicker.Label>
      </Show>
      <ArkColorPicker.Control>
        <ArkColorPicker.ChannelInput channel="hex" />
        <ArkColorPicker.Trigger>
          <ArkColorPicker.TransparencyGrid />
          <ArkColorPicker.ValueSwatch />
        </ArkColorPicker.Trigger>
      </ArkColorPicker.Control>
      <ArkColorPicker.Positioner>
        <ArkColorPicker.Content>
          <ArkColorPicker.Area>
            <ArkColorPicker.AreaBackground />
            <ArkColorPicker.AreaThumb />
          </ArkColorPicker.Area>
          <div data-scope="color-picker" data-part="channel-controls">
            <ArkColorPicker.EyeDropperTrigger>
              {iconNode("pipette", { width: 14, height: 14 })}
            </ArkColorPicker.EyeDropperTrigger>
            <div data-scope="color-picker" data-part="channel-sliders">
              <ArkColorPicker.ChannelSlider channel="hue">
                <ArkColorPicker.ChannelSliderTrack />
                <ArkColorPicker.ChannelSliderThumb />
              </ArkColorPicker.ChannelSlider>
              <ArkColorPicker.ChannelSlider channel="alpha">
                <ArkColorPicker.TransparencyGrid />
                <ArkColorPicker.ChannelSliderTrack />
                <ArkColorPicker.ChannelSliderThumb />
              </ArkColorPicker.ChannelSlider>
            </div>
          </div>
        </ArkColorPicker.Content>
      </ArkColorPicker.Positioner>
      <ArkColorPicker.HiddenInput />
    </ColorPickerRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const ColorPicker: typeof ColorPickerFacade &
  Omit<typeof ArkColorPicker, "Root"> & { Root: typeof ColorPickerRoot } = defineFamily(
  ColorPickerFacade,
  {
    ...ArkColorPicker,
    Root: ColorPickerRoot,
  },
);

injectComponentStyle("color-picker");
