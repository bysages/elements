<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("tree-view");

import { TreeView as ArkTreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewRootProps } from "./props";

let { size = "md", children, ...rest }: TreeViewRootProps = $props();
</script>

<ArkTreeView.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkTreeView.Root>
