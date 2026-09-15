import { Accordion as ArkAccordion } from "@ark-ui/vue/accordion";
import { injectComponentStyle } from "@bysages/core";

/** Accordion, dressed in the paper-and-ink system: a ruled sheet
 * folded by quiet rows, unfolding with a spring-chevoned dissolve. The parts — Root, Item, ItemTrigger, ItemContent, ItemIndicator. */
export const Accordion = ArkAccordion;

injectComponentStyle("accordion");
