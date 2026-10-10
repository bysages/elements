<script lang="ts">
import { Toggle as ArkToggle } from "@ark-ui/svelte/toggle";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { ToggleRootProps } from "@ark-ui/svelte/toggle";

injectComponentStyle("toggle");

let { ref = $bindable(null), pressed = $bindable(), children, ...rest }: ToggleRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("toggle", generatedId, rest.id));
</script>

<ArkToggle.Root bind:ref bind:pressed {...rest} {id}>
  {@render children?.()}
</ArkToggle.Root>

