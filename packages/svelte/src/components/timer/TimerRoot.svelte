<script lang="ts">
import { Timer as ArkTimer } from "@ark-ui/svelte/timer";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { TimerRootProps } from "@ark-ui/svelte/timer";

injectComponentStyle("timer");

let { ref = $bindable(null), children, ...rest }: TimerRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("timer", generatedId, rest.id));
</script>

<ArkTimer.Root bind:ref {...rest} {id}>
  {@render children?.()}
</ArkTimer.Root>
