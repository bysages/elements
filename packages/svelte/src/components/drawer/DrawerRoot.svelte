<script lang="ts">
import { Drawer as ArkDrawer } from "@ark-ui/svelte/drawer";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { DrawerRootProps } from "@ark-ui/svelte/drawer";

injectComponentStyle("drawer");

let { open = $bindable(), children, ...rest }: DrawerRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("drawer", generatedId, rest.id));
</script>

<ArkDrawer.Root bind:open {...rest} {id}>
  {@render children?.()}
</ArkDrawer.Root>

