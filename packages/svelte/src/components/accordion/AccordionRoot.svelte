<script lang="ts">
import { Accordion as ArkAccordion } from "@ark-ui/svelte/accordion";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { AccordionRootProps } from "@ark-ui/svelte/accordion";

injectComponentStyle("accordion");

let { ref = $bindable(null), value = $bindable(), children, ...rest }: AccordionRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("accordion", generatedId, rest.id));
</script>

<ArkAccordion.Root bind:ref bind:value {...rest} {id}>
  {@render children?.()}
</ArkAccordion.Root>

