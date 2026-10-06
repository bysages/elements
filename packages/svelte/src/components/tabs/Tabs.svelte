<script lang="ts">
import { Tabs as ArkTabs } from "@ark-ui/svelte/tabs";

import TabsRoot from "./TabsRoot.svelte";

export type TabsItem = {
  value: string;
  label: string;
  content?: import("svelte").Snippet;
};

let {
  value = $bindable(),
  defaultValue,
  items,
  variant = "line",
  orientation = "horizontal",
  children,
  ...rest
}: {
  value?: string;
  defaultValue?: string;
  items: TabsItem[];
  variant?: "line" | "card";
  orientation?: "horizontal" | "vertical";
  children?: import("svelte").Snippet;
} & import("./props").TabsRootProps = $props();
</script>

<TabsRoot bind:value {defaultValue} data-variant={variant} {orientation} {...rest}>
  <ArkTabs.List>
    {#each items as item (item.value)}
      <ArkTabs.Trigger value={item.value}>{item.label}</ArkTabs.Trigger>
    {/each}
    <ArkTabs.Indicator />
  </ArkTabs.List>
  {#each items as item (item.value)}
    <ArkTabs.Content value={item.value}>{@render item.content?.()}</ArkTabs.Content>
  {/each}
  {@render children?.()}
</TabsRoot>
