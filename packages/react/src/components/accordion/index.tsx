import { Accordion as ArkAccordion } from "@ark-ui/react/accordion";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Accordion, dressed in the paper-and-ink system: a ruled sheet
 * folded by quiet rows, unfolding with a spring-chevoned dissolve. The
 * API is Ark's own — Root, Item, ItemTrigger, ItemContent, ItemIndicator. */
export const Accordion = ArkAccordion;

injectComponentStyle("accordion");
