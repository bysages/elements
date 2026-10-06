<script lang="ts">
import { AngleSlider as ArkAngleSlider } from "@ark-ui/svelte/angle-slider";

import AngleSliderRoot from "./AngleSliderRoot.svelte";

let {
  value = $bindable(),
  defaultValue = 45,
  label,
  step = 1,
  disabled = false,
  readOnly = false,
  children,
  ...rest
}: {
  value?: number;
  defaultValue?: number;
  label?: string;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").AngleSliderRootProps = $props();

const markers = [0, 90, 180, 270];
</script>

<AngleSliderRoot bind:value {defaultValue} {step} {disabled} readOnly={readOnly} {...rest}>
  {#if label}<ArkAngleSlider.Label>{label}</ArkAngleSlider.Label>{/if}
  <ArkAngleSlider.ValueText />
  <ArkAngleSlider.Control>
    <ArkAngleSlider.MarkerGroup>
      {#each markers as marker (marker)}
        <ArkAngleSlider.Marker value={marker} />
      {/each}
    </ArkAngleSlider.MarkerGroup>
    <ArkAngleSlider.Thumb>
      <ArkAngleSlider.HiddenInput />
    </ArkAngleSlider.Thumb>
  </ArkAngleSlider.Control>
  {@render children?.()}
</AngleSliderRoot>
