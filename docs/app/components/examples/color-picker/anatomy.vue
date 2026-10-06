<script setup lang="ts">
import { parseColor } from "@ark-ui/vue/color-picker";
import { check } from "@bysages/icons";
import { ColorPicker, Icon, SegmentGroup } from "@bysages/vue";

const savedColors = ["#eb5e41", "#3d5a80", "#61892f", "#d9a648", "#7048a8"];

function setFormat(api: { setFormat: (f: string) => void }, e: { value: string }) {
  api.setFormat(e.value);
}
</script>

<template>
  <ColorPicker.Root :default-value="parseColor('#3d5a80')" default-format="rgba">
    <ColorPicker.Label>Ink color</ColorPicker.Label>
    <ColorPicker.Control>
      <ColorPicker.ChannelInput channel="hex" />
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
        <div class="flex items-center gap-2">
          <ColorPicker.EyeDropperTrigger>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              aria-hidden="true"
            >
              <path d="m15 3 6 6M11.5 6.5 3 15v6h6l8.5-8.5M11.5 6.5l6 6" />
            </svg>
          </ColorPicker.EyeDropperTrigger>
          <div class="flex min-w-0 flex-1 flex-col gap-2">
            <ColorPicker.ChannelSlider channel="hue">
              <ColorPicker.ChannelSliderTrack />
              <ColorPicker.ChannelSliderThumb />
            </ColorPicker.ChannelSlider>
            <ColorPicker.ChannelSlider channel="alpha">
              <ColorPicker.TransparencyGrid />
              <ColorPicker.ChannelSliderTrack />
              <ColorPicker.ChannelSliderThumb />
            </ColorPicker.ChannelSlider>
          </div>
        </div>
        <ColorPicker.SwatchGroup>
          <ColorPicker.SwatchTrigger v-for="color in savedColors" :key="color" :value="color">
            <ColorPicker.Swatch :value="color">
              <ColorPicker.SwatchIndicator>
                <Icon :glyph="check" />
              </ColorPicker.SwatchIndicator>
            </ColorPicker.Swatch>
          </ColorPicker.SwatchTrigger>
        </ColorPicker.SwatchGroup>
        <ColorPicker.View format="rgba">
          <div class="flex gap-2">
            <ColorPicker.ChannelInput channel="red" />
            <ColorPicker.ChannelInput channel="green" />
            <ColorPicker.ChannelInput channel="blue" />
            <ColorPicker.ChannelInput channel="alpha" />
          </div>
        </ColorPicker.View>
        <ColorPicker.View format="hsla">
          <div class="flex gap-2">
            <ColorPicker.ChannelInput channel="hue" />
            <ColorPicker.ChannelInput channel="saturation" />
            <ColorPicker.ChannelInput channel="lightness" />
            <ColorPicker.ChannelInput channel="alpha" />
          </div>
        </ColorPicker.View>
        <ColorPicker.Context v-slot="api">
          <SegmentGroup.Root :value="api.format" @update:value="(e) => setFormat(api, e)">
            <SegmentGroup.Indicator />
            <SegmentGroup.Item value="rgba">
              <SegmentGroup.ItemText>rgba</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="hsla">
              <SegmentGroup.ItemText>hsla</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          </SegmentGroup.Root>
        </ColorPicker.Context>
      </ColorPicker.Content>
    </ColorPicker.Positioner>
    <ColorPicker.HiddenInput />
  </ColorPicker.Root>
</template>
