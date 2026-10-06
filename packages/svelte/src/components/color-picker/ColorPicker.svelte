<script lang="ts">
import { ColorPicker as ArkColorPicker, parseColor, type Color } from "@ark-ui/svelte/color-picker";

import ColorPickerRoot from "./ColorPickerRoot.svelte";

let {
  value = $bindable(),
  defaultValue,
  label,
  disabled = false,
  invalid = false,
  required = false,
  children,
  ...rest
}: {
  value?: string | Color;
  defaultValue?: string | Color;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").ColorPickerRootProps = $props();

const toColor = (color: string | Color | undefined) => (typeof color === "string" ? parseColor(color) : color);
</script>

<ColorPickerRoot bind:value {defaultValue} {disabled} {invalid} {required} {...rest}>
  {#if label}<ArkColorPicker.Label>{label}</ArkColorPicker.Label>{/if}
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
      <ArkColorPicker.ChannelSlider channel="hue">
        <ArkColorPicker.ChannelSliderTrack />
        <ArkColorPicker.ChannelSliderThumb />
      </ArkColorPicker.ChannelSlider>
      <ArkColorPicker.ChannelSlider channel="alpha">
        <ArkColorPicker.TransparencyGrid />
        <ArkColorPicker.ChannelSliderTrack />
        <ArkColorPicker.ChannelSliderThumb />
      </ArkColorPicker.ChannelSlider>
      <ArkColorPicker.ChannelInput channel="hex" />
    </ArkColorPicker.Content>
  </ArkColorPicker.Positioner>
  <ArkColorPicker.HiddenInput />
  {@render children?.()}
</ColorPickerRoot>
