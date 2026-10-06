import { Accordion as ArkAccordion } from "@ark-ui/svelte/accordion";

import { defineFamily } from "../../internal/family";
import AccordionFacade from "./Accordion.svelte";
import AccordionRoot from "./AccordionRoot.svelte";

/** Ark's Accordion, dressed in the paper-and-ink system: a ruled sheet
 * folded by quiet rows, unfolding with a spring-chevoned dissolve. The
 * API is Ark's own — Root, Item, ItemTrigger, ItemContent, ItemIndicator. */
export const Accordion: typeof AccordionFacade &
  Omit<typeof ArkAccordion, "Root"> & {
    Root: typeof AccordionRoot;
  } = defineFamily(AccordionFacade, {
  ...ArkAccordion,
  Root: AccordionRoot,
});
