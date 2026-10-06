<script lang="ts">
import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/svelte/floating-panel";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { FloatingPanelRootProps } from "@ark-ui/svelte/floating-panel";

injectComponentStyle("floating-panel");

let { open = $bindable(), position = $bindable(), size = $bindable(), children, ...rest }: FloatingPanelRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("floating-panel", generatedId, rest.id));
</script>

<ArkFloatingPanel.Root bind:open bind:position bind:size {...rest} {id}>
  {@render children?.()}
</ArkFloatingPanel.Root>
