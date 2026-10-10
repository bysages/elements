<script lang="ts">
import { JsonTreeView as ArkJsonTreeView } from "@ark-ui/svelte/json-tree-view";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { JsonTreeViewRootProps } from "@ark-ui/svelte/json-tree-view";

injectComponentStyle("json-tree-view");

let { children, ...rest }: JsonTreeViewRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("json-tree-view", generatedId, rest.id));
</script>

<ArkJsonTreeView.Root {...rest} {id}>
  {@render children?.()}
</ArkJsonTreeView.Root>

