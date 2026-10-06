<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("menu");

import { Menu as ArkMenu } from "@ark-ui/svelte/menu";
import { setContext } from "svelte";

import { MENU_SIZE_KEY } from "./context";
import { useElementId } from "../../internal/id";
import type { MenuRootProps } from "./props";

/** The row rung rides the context because Ark's Root renders no DOM of
 * its own — the vessel (Content) is the element the rung can land on,
 * and the Portal breaks CSS ancestry between the two. */

let { size = "md", children, ...rest }: MenuRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("menu", generatedId, rest.id));

// The getter rides the context so a bound size retunes an open vessel.
setContext(MENU_SIZE_KEY, () => size);
</script>

<ArkMenu.Root {...rest} {id}>
  {@render children?.()}
</ArkMenu.Root>
