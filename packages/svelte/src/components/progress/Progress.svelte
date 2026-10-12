<script lang="ts">
import { Progress as ArkProgress } from "@ark-ui/svelte/progress";

import ProgressRoot from "./ProgressRoot.svelte";

let {
  value = $bindable(),
  defaultValue,
  min,
  max,
  label,
  variant = "linear",
  size = "md",
  disabled = false,
  children,
  ...rest
}: {
  value?: number | null;
  defaultValue?: number | null;
  min?: number;
  max?: number;
  label?: string;
  variant?: "linear" | "circle" | "dashboard";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").ProgressRootProps = $props();

// Ark exposes percent only through the inline geometry of its SVG range,
// so the dashboard derives the same measure from the facade props to
// drive a CSS gradient.
const dashboardPercent = $derived.by(() => {
  const lower = min ?? 0;
  const upper = max ?? 100;
  const current = value ?? defaultValue ?? lower + (upper - lower) / 2;
  const percent = ((current - lower) / (upper - lower)) * 100;

  return !Number.isFinite(percent) ? 0 : Math.min(100, Math.max(0, percent));
});
</script>

<ProgressRoot bind:value {defaultValue} {min} {max} {disabled} {size} data-variant={variant} {...rest}>
  {#if label}<ArkProgress.Label>{label}</ArkProgress.Label>{/if}
  {#if variant === "dashboard"}
    <div data-scope="progress" data-part="view" data-view="dashboard">
      <div
        aria-hidden="true"
        data-scope="progress"
        data-part="dash-ring"
        style:--percent={String(dashboardPercent)}
      />
      <ArkProgress.ValueText />
    </div>
  {:else if variant === "circle"}
    <ArkProgress.View view="circle">
      <ArkProgress.Circle>
        <ArkProgress.CircleRange />
      </ArkProgress.Circle>
    </ArkProgress.View>
  {:else}
    <ArkProgress.Track><ArkProgress.Range /></ArkProgress.Track>
  {/if}
  {@render children?.()}
</ProgressRoot>
