<script lang="ts">
import { Toc as ArkToc } from "@ark-ui/svelte/toc";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { TocRootProps } from "@ark-ui/svelte/toc";

injectComponentStyle("toc");

let { ref = $bindable(null), children, ...rest }: TocRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("toc", generatedId, rest.id));
</script>

<ArkToc.Root bind:ref {...rest} {id}>
  {@render children?.()}
</ArkToc.Root>
