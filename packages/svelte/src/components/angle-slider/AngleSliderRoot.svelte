<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("angle-slider");

import { AngleSlider as ArkAngleSlider } from "@ark-ui/svelte/angle-slider";
import type { AngleSliderRootProps } from "./props";

let { size = "md", children, ...rest }: AngleSliderRootProps = $props();
</script>

<ArkAngleSlider.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkAngleSlider.Root>
