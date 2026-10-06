<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("progress");

import { Progress as ArkProgress } from "@ark-ui/svelte/progress";
import { useElementId } from "../../internal/id";
import type { ProgressRootProps } from "./props";

let { size = "md", children, ...rest }: ProgressRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("progress", generatedId, rest.id));
</script>

<ArkProgress.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkProgress.Root>
