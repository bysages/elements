<script lang="ts">
import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/svelte/segment-group";

import SegmentGroupRoot from "./SegmentGroupRoot.svelte";

export type SegmentGroupItem = { value: string; label: string; disabled?: boolean };

let {
  value = $bindable(),
  defaultValue,
  items,
  label,
  disabled = false,
  readOnly = false,
  orientation = "horizontal",
  children,
  ...rest
}: {
  value?: string;
  defaultValue?: string;
  items: SegmentGroupItem[];
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  orientation?: "horizontal" | "vertical";
  children?: import("svelte").Snippet;
} & import("./props").SegmentGroupRootProps = $props();
</script>

<SegmentGroupRoot bind:value {defaultValue} {disabled} readOnly={readOnly} {orientation} {...rest}>
  {#if label}<ArkSegmentGroup.Label>{label}</ArkSegmentGroup.Label>{/if}
  <ArkSegmentGroup.Indicator />
  {#each items as item (item.value)}
    <ArkSegmentGroup.Item value={item.value} disabled={item.disabled}>
      <ArkSegmentGroup.ItemText>{item.label}</ArkSegmentGroup.ItemText>
      <ArkSegmentGroup.ItemControl />
      <ArkSegmentGroup.ItemHiddenInput />
    </ArkSegmentGroup.Item>
  {/each}
  {@render children?.()}
</SegmentGroupRoot>
