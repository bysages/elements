<script setup lang="ts">
import { parseColor } from "@ark-ui/vue/color-picker";
import { ColorPicker } from "@bysages/vue";
</script>

<template>
  <ColorPicker.Root :default-value="parseColor('#1e5aa8')">
    <ColorPicker.Label>Ink color</ColorPicker.Label>
    <ColorPicker.Control>
      <ColorPicker.ChannelInput channel="hex" />
      <ColorPicker.Trigger>
        <ColorPicker.ValueSwatch />
      </ColorPicker.Trigger>
    </ColorPicker.Control>
    <ColorPicker.Positioner>
      <ColorPicker.Content>
        <ColorPicker.Area>
          <ColorPicker.AreaBackground />
          <ColorPicker.AreaThumb />
        </ColorPicker.Area>
        <ColorPicker.ChannelSlider channel="hue">
          <ColorPicker.ChannelSliderTrack>
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSliderTrack>
        </ColorPicker.ChannelSlider>
      </ColorPicker.Content>
    </ColorPicker.Positioner>
  </ColorPicker.Root>
</template>
