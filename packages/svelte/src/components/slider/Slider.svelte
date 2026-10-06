<script lang="ts">
import { Slider as ArkSlider } from "@ark-ui/svelte/slider";

import SliderRoot from "./SliderRoot.svelte";

let {
  value = $bindable(),
  defaultValue = 50,
  label,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = "horizontal",
  children,
  ...rest
}: {
  value?: number;
  defaultValue?: number;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  children?: import("svelte").Snippet;
} & import("./props").SliderRootProps = $props();
</script>

<SliderRoot bind:value defaultValue={[defaultValue]} {min} {max} {step} {disabled} {orientation} {...rest}>
  {#if label}<ArkSlider.Label>{label}</ArkSlider.Label>{/if}
  <ArkSlider.ValueText />
  <ArkSlider.Control>
    <ArkSlider.Track>
      <ArkSlider.Range />
    </ArkSlider.Track>
    <ArkSlider.Thumb index={0}>
      <ArkSlider.HiddenInput />
    </ArkSlider.Thumb>
  </ArkSlider.Control>
  {@render children?.()}
</SliderRoot>
