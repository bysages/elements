<script lang="ts">
import { Progress as ArkProgress } from "@ark-ui/svelte/progress";

import ProgressRoot from "./ProgressRoot.svelte";

let {
  value = $bindable(),
  label,
  disabled = false,
  children,
  ...rest
}: {
  value?: number;
  label?: string;
  disabled?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").ProgressRootProps = $props();
</script>

<ProgressRoot bind:value {disabled} {...rest}>
  {#if label}<ArkProgress.Label>{label}</ArkProgress.Label>{/if}
  <ArkProgress.ValueText />
  <ArkProgress.Track><ArkProgress.Range /></ArkProgress.Track>
  {@render children?.()}
</ProgressRoot>
