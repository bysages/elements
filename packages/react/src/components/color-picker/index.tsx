import { ColorPicker as ArkColorPicker } from "@ark-ui/react/color-picker";
import { parseColor, type Color } from "@ark-ui/react/color-picker";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties } from "react";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type ColorPickerRootProps = ComponentProps<typeof ArkColorPicker.Root> & {
  /** One rung of the control-height ladder for the swatch seal. */
  size?: "sm" | "md" | "lg";
};

function ColorPickerRoot(props: ColorPickerRootProps) {
  injectComponentStyle("color-picker");
  const id = useElementId("color-picker", props);
  const { size = "md", ...rest } = props;

  return <ArkColorPicker.Root {...rest} id={id} data-size={size} />;
}

/** Ark's ColorPicker, dressed in the paper-and-ink system: a seal-sized swatch
 * on the paper, opening into an area and channel sliders where pigment is
 * picked. The API is Ark's own — Root, Label, Control, Trigger, Positioner,
 * Content, Area, AreaThumb, AreaBackground, ValueText, ValueSwatch,
 * ChannelSlider, ChannelSliderLabel, ChannelSliderTrack, ChannelSliderThumb,
 * ChannelSliderValueText, ChannelInput, TransparencyGrid, SwatchGroup,
 * SwatchTrigger, SwatchIndicator, Swatch, EyeDropperTrigger, FormatTrigger,
 * FormatSelect, HiddenInput, Context. */

type ColorPickerFacadeProps = {
  value?: string | Color;
  defaultValue?: string | Color;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  onValueChange?: (value: unknown) => void;
};

/** The complete picker behind one color: the hex input rides beside the
 * swatch trigger, while the popup carries the area and hue/alpha tracks.
 * Saved swatches and format switches remain anatomy work. */
function ColorPickerFacade(props: ColorPickerFacadeProps) {
  const {
    value,
    defaultValue,
    disabled,
    invalid,
    required,
    label,
    size = "md",
    className,
    style,
    onValueChange,
  } = props;
  const toColor = (color: string | object | undefined): Color | undefined =>
    typeof color === "string" ? parseColor(color) : (color as Color | undefined);

  return (
    <ColorPickerRoot
      size={size}
      defaultValue={toColor(defaultValue)}
      value={toColor(value)}
      disabled={disabled}
      invalid={invalid}
      required={required}
      className={className}
      style={style}
      onValueChange={(event: { value: unknown }) => onValueChange?.(event.value)}
    >
      {label ? <ArkColorPicker.Label>{label}</ArkColorPicker.Label> : null}
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

export const ColorPicker: typeof ColorPickerFacade &
  Omit<typeof ArkColorPicker, "Root"> & { Root: typeof ColorPickerRoot } = Object.assign(
  ColorPickerFacade,
  {
    ...ArkColorPicker,
    Root: ColorPickerRoot,
  },
) as typeof ColorPickerFacade &
  Omit<typeof ArkColorPicker, "Root"> & { Root: typeof ColorPickerRoot };
