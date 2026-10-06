<script lang="ts">
import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/svelte/json-tree-view";

import JsonTreeViewRoot from "./JsonTreeViewRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  data,
  defaultExpandedDepth = 1,
  arrow,
  children,
  ...rest
}: {
  data: unknown;
  defaultExpandedDepth?: number;
  arrow?: import("svelte").Snippet;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/json-tree-view").JsonTreeViewRootProps = $props();
</script>

<JsonTreeViewRoot {data} {defaultExpandedDepth} {...rest}>
  <ArkJsonTreeView.Tree arrow={arrow}>
    {#snippet children()}
      {#if arrow}{@render arrow()}{:else}<InternalIcon name="chevron-right" />{/if}
    {/snippet}
  </ArkJsonTreeView.Tree>
  {@render children?.()}
</JsonTreeViewRoot>
