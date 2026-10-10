<script lang="ts">
import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { CollapsibleRootProps } from "@ark-ui/svelte/collapsible";

injectComponentStyle("collapsible");

let { ref = $bindable(null), open = $bindable(), children, ...rest }: CollapsibleRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("collapsible", generatedId, rest.id));
</script>

<ArkCollapsible.Root bind:ref bind:open {...rest} {id}>
  {@render children?.()}
</ArkCollapsible.Root>

