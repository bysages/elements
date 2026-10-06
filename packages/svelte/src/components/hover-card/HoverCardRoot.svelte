<script lang="ts">
import { HoverCard as ArkHoverCard } from "@ark-ui/svelte/hover-card";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { HoverCardRootProps } from "@ark-ui/svelte/hover-card";

injectComponentStyle("hover-card");

let { open = $bindable(), children, ...rest }: HoverCardRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("hover-card", generatedId, rest.id));
</script>

<ArkHoverCard.Root bind:open {...rest} {id}>
  {@render children?.()}
</ArkHoverCard.Root>
