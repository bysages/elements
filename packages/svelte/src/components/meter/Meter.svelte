<script lang="ts">
import type { MeterRootProps } from "./props";
import MeterLabel from "./MeterLabel.svelte";
import MeterValueText from "./MeterValueText.svelte";
import MeterTrack from "./MeterTrack.svelte";

let {
  value,
  min = 0,
  max = 100,
  level = "normal",
  label,
  children,
  ...rest
}: MeterRootProps = $props();

const ratio = $derived.by(() => {
  const span = max - min;
  return span > 0 ? Math.min(Math.max((value - min) / span, 0), 1) : 0;
});
</script>

<div
  {...rest}
  role="meter"
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={value}
  aria-label={label ?? (rest["aria-label"] as string | undefined)}
  data-scope="meter"
  data-part="root"
  data-level={level !== "normal" ? level : undefined}
  style:--_percent={`${ratio * 100}%`}
>
  {#if children}
    {@render children()}
  {:else}
    <MeterLabel>{label}</MeterLabel>
    <MeterValueText>{`${Math.round(ratio * 100)}%`}</MeterValueText>
    <MeterTrack />
  {/if}
</div>
