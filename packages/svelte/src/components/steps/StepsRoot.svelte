<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("steps");

import { Steps as ArkSteps } from "@ark-ui/svelte/steps";
import type { StepsRootProps } from "./props";

let { size = "md", children, ...rest }: StepsRootProps = $props();
</script>

<ArkSteps.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkSteps.Root>
