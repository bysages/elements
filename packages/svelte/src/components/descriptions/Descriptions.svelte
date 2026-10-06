<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("descriptions");

import DescriptionsDetail from "./DescriptionsDetail.svelte";
import DescriptionsItem from "./DescriptionsItem.svelte";
import DescriptionsTerm from "./DescriptionsTerm.svelte";
import type { DescriptionsRootProps } from "./props";

let { layout = "horizontal", bordered = false, column = 1, items, children, ...rest }: DescriptionsRootProps = $props();
</script>

<dl
  {...rest}
  style:--bs-desc-columns={String(column)}
  data-scope="descriptions"
  data-part="root"
  data-layout={layout}
  data-bordered={bordered || undefined}
>
  {#if children}
    {@render children()}
  {:else}
    {#each items ?? [] as item}
      <DescriptionsItem span={item.span}>
        <DescriptionsTerm>{item.term}</DescriptionsTerm>
        <DescriptionsDetail>{item.detail}</DescriptionsDetail>
      </DescriptionsItem>
    {/each}
  {/if}
</dl>
