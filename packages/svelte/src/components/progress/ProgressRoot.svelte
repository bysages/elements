<script lang="ts">
import { Progress as ArkProgress } from "@ark-ui/svelte/progress";
import type { ProgressRootProps } from "./props";

let { size = "md", children, ...rest }: ProgressRootProps = $props();
</script>

<ArkProgress.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkProgress.Root>
