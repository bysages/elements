<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("menu");

import { Menu as ArkMenu } from "@ark-ui/svelte/menu";
import { getContext } from "svelte";

import { MENU_SIZE_KEY } from "./context";
import type { MenuContentProps } from "./props";


const size = getContext<() => "sm" | "md" | "lg">(MENU_SIZE_KEY, () => () => "md");

let { children, ...rest }: MenuContentProps = $props();
</script>

<ArkMenu.Content {...rest} data-size={size()}>
  {@render children?.()}
</ArkMenu.Content>
