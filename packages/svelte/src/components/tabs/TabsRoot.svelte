<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("tabs");

import { Tabs as ArkTabs } from "@ark-ui/svelte/tabs";
import type { TabsRootProps } from "./props";

let { size = "md", variant = "line", children, ...rest }: TabsRootProps = $props();
</script>

<ArkTabs.Root {...rest} data-size={size} data-variant={variant}>
  {@render children?.()}
</ArkTabs.Root>
