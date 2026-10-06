<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("angle-slider");

import { AngleSlider as ArkAngleSlider } from "@ark-ui/svelte/angle-slider";
import { useElementId } from "../../internal/id";
import type { AngleSliderRootProps } from "./props";

let { size = "md", children, ...rest }: AngleSliderRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("angle-slider", generatedId, rest.id));
</script>

<ArkAngleSlider.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkAngleSlider.Root>
