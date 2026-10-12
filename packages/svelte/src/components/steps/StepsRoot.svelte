<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("steps");

import { Steps as ArkSteps } from "@ark-ui/svelte/steps";
import { useElementId } from "../../internal/id";
import type { StepsRootProps } from "./props";

let { size = "md", variant = "default", children, ...rest }: StepsRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("steps", generatedId, rest.id));
</script>

<ArkSteps.Root {...rest} {id} data-size={size} data-variant={variant === "dot" ? variant : undefined}>
  {@render children?.()}
</ArkSteps.Root>
