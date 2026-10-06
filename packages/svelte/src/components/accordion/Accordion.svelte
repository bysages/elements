<script lang="ts">
import { Accordion as ArkAccordion } from "@ark-ui/svelte/accordion";

import AccordionRoot from "./AccordionRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

export type AccordionItem = { value: string; title: string; content: string };

let {
  items,
  multiple = false,
  collapsible = true,
  disabled = false,
  orientation = "vertical",
  children,
  ...rest
}: {
  items: AccordionItem[];
  multiple?: boolean;
  collapsible?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/accordion").AccordionRootProps = $props();
</script>

<AccordionRoot {multiple} {collapsible} {disabled} {orientation} {...rest}>
  {#each items as item (item.value)}
    <ArkAccordion.Item value={item.value}>
      <ArkAccordion.ItemTrigger>
        {item.title}
        <ArkAccordion.ItemIndicator>
          <InternalIcon name="chevron-down" />
        </ArkAccordion.ItemIndicator>
      </ArkAccordion.ItemTrigger>
      <ArkAccordion.ItemContent><p>{item.content}</p></ArkAccordion.ItemContent>
    </ArkAccordion.Item>
  {/each}
  {@render children?.()}
</AccordionRoot>
