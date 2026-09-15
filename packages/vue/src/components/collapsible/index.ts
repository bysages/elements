import { Collapsible as ArkCollapsible } from "@ark-ui/vue/collapsible";
import { injectComponentStyle } from "@bysages/core";

/** Collapsible, dressed in the paper-and-ink system: one control on
 * the paper, its panel dissolving open to the machine's measured height.
 * The parts — Root, Trigger, Content, Indicator. */
export const Collapsible = ArkCollapsible;

injectComponentStyle("collapsible");
