<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("slider");

import { Slider as ArkSlider } from "@ark-ui/svelte/slider";
import type { SliderRootProps } from "./props";

let { size = "md", children, ...rest }: SliderRootProps = $props();
</script>

<ArkSlider.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkSlider.Root>
