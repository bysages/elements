<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("slider");

import { Slider as ArkSlider } from "@ark-ui/svelte/slider";
import { useElementId } from "../../internal/id";
import type { SliderRootProps } from "./props";

let { size = "md", children, ...rest }: SliderRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("slider", generatedId, rest.id));
</script>

<ArkSlider.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkSlider.Root>

