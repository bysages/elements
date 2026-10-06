<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("tabs");

import { Tabs as ArkTabs } from "@ark-ui/svelte/tabs";
import { useElementId } from "../../internal/id";
import type { TabsRootProps } from "./props";

let { size = "md", variant = "line", children, ...rest }: TabsRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("tabs", generatedId, rest.id));
</script>

<ArkTabs.Root {...rest} {id} data-size={size} data-variant={variant}>
  {@render children?.()}
</ArkTabs.Root>
