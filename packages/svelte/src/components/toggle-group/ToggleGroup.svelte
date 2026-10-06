<script lang="ts">
import { ToggleGroup as ArkToggleGroup } from "@ark-ui/svelte/toggle-group";

import ToggleGroupRoot from "./ToggleGroupRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

export type ToggleGroupItem = {
  value: string;
  label: string;
  /** A built-in core-registry icon; omit it to render the label as text. */
  icon?: string;
  disabled?: boolean;
};

let {
  value = $bindable(),
  defaultValue,
  items,
  multiple = false,
  disabled = false,
  readOnly = false,
  orientation = "horizontal",
  children,
  ...rest
}: {
  value?: string[];
  defaultValue?: string[];
  items: ToggleGroupItem[];
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  orientation?: "horizontal" | "vertical";
  children?: import("svelte").Snippet;
} & import("./props").ToggleGroupRootProps = $props();
</script>

<ToggleGroupRoot bind:value {defaultValue} {multiple} {disabled} readOnly={readOnly} {orientation} {...rest}>
  {#each items as item (item.value)}
    <ArkToggleGroup.Item value={item.value} disabled={item.disabled} aria-label={item.label} data-variant={item.icon ? "icon" : "text"}>
      {#if item.icon}<InternalIcon name={item.icon} />{:else}{item.label}{/if}
    </ArkToggleGroup.Item>
  {/each}
  {@render children?.()}
</ToggleGroupRoot>
