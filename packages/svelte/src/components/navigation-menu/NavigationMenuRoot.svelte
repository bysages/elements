<script lang="ts">
import { NavigationMenu as ArkNavigationMenu } from "@ark-ui/svelte/navigation-menu";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { NavigationMenuRootProps } from "@ark-ui/svelte/navigation-menu";

injectComponentStyle("navigation-menu");

let { ref = $bindable(null), value = $bindable(), children, ...rest }: NavigationMenuRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("navigation-menu", generatedId, rest.id));
</script>

<ArkNavigationMenu.Root bind:ref bind:value {...rest} {id}>
  {@render children?.()}
</ArkNavigationMenu.Root>
