<script lang="ts">
import { Marquee as ArkMarquee } from "@ark-ui/svelte/marquee";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { MarqueeRootProps } from "@ark-ui/svelte/marquee";

injectComponentStyle("marquee");

let { ref = $bindable(null), children, ...rest }: MarqueeRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("marquee", generatedId, rest.id));
</script>

<ArkMarquee.Root bind:ref {...rest} {id}>
  {@render children?.()}
</ArkMarquee.Root>
