<script lang="ts">
import { DateInput as ArkDateInput } from "@ark-ui/svelte/date-input";

import DateInputRoot from "./DateInputRoot.svelte";

let {
  value = $bindable(),
  defaultValue,
  label,
  disabled = false,
  invalid = false,
  required = false,
  children,
  ...rest
}: {
  value?: unknown;
  defaultValue?: unknown;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").DateInputRootProps = $props();
</script>

<DateInputRoot bind:value {defaultValue} {disabled} {invalid} {required} {...rest}>
  {#if label}<ArkDateInput.Label>{label}</ArkDateInput.Label>{/if}
  <ArkDateInput.Control>
    <ArkDateInput.SegmentGroup>
      <ArkDateInput.SegmentContext>
        {#snippet children(segment)}
          <ArkDateInput.Segment segment={segment} />
        {/snippet}
      </ArkDateInput.SegmentContext>
    </ArkDateInput.SegmentGroup>
  </ArkDateInput.Control>
  <ArkDateInput.HiddenInput />
  {@render children?.()}
</DateInputRoot>
