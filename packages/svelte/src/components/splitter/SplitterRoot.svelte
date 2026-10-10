<script lang="ts">
import { Splitter as ArkSplitter } from "@ark-ui/svelte/splitter";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { SplitterRootProps } from "@ark-ui/svelte/splitter";

injectComponentStyle("splitter");

let { ref = $bindable(null), size = $bindable(), children, ...rest }: SplitterRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("splitter", generatedId, rest.id));
</script>

<ArkSplitter.Root bind:ref bind:size {...rest} {id}>
  {@render children?.()}
</ArkSplitter.Root>

