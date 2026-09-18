<script lang="ts">
import type { ProgressGroupProps, ProgressSegment } from "./props";

let { segments, max, showLegend = true, ...rest }: ProgressGroupProps = $props();

// A zero whole must not divide — the bar simply stays empty.
const total = $derived(max ?? segments.reduce((sum, segment) => sum + segment.value, 0));
const share = (value: number) => (total > 0 ? `${(value / total) * 100}%` : "0%");
const nameOf = (segment: ProgressSegment, index: number) =>
  segment.label ?? segment.pigment ?? `Segment ${index + 1}`;
</script>

<!-- One bar, several verdicts: the segments stand shoulder to shoulder,
each as wide as its share of the whole and speaking its own pigment;
the legend reads them back beneath (swatch, label, value) unless the
caller declines it. The whole is the sum of the parts unless the caller
brings a larger one — the remainder then shows as groove. -->
<div {...rest} data-scope="progress-group" data-part="root">
  <div data-scope="progress-group" data-part="track">
    {#each segments as segment, index (index)}
      <div
        data-scope="progress-group"
        data-part="segment"
        data-pigment={segment.pigment}
        role="progressbar"
        aria-valuenow={segment.value}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={nameOf(segment, index)}
        style:inline-size={share(segment.value)}
      ></div>
    {/each}
  </div>
  {#if showLegend}
    <div data-scope="progress-group" data-part="legend">
      {#each segments as segment, index (index)}
        <div data-scope="progress-group" data-part="legend-item" data-pigment={segment.pigment}>
          <span data-scope="progress-group" data-part="swatch" aria-hidden="true"></span>
          <span data-scope="progress-group" data-part="legend-label">{nameOf(segment, index)}</span>
          <span data-scope="progress-group" data-part="legend-value">{String(segment.value)}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
