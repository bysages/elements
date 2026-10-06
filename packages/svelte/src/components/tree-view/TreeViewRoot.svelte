<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("tree-view");

import { TreeView as ArkTreeView } from "@ark-ui/svelte/tree-view";
import { useElementId } from "../../internal/id";
import type { TreeViewRootProps } from "./props";

let { size = "md", children, ...rest }: TreeViewRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("tree-view", generatedId, rest.id));
</script>

<ArkTreeView.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkTreeView.Root>
