<script lang="ts">
import { TreeView as ArkTreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewNodeCheckboxProps } from "@ark-ui/svelte/tree-view";

let { children, ...rest }: TreeViewNodeCheckboxProps = $props();
</script>

<ArkTreeView.NodeCheckbox {...rest} aria-hidden="true">
  {@render children?.()}
</ArkTreeView.NodeCheckbox>
