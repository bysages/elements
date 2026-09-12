import { Collapsible as ArkCollapsible } from "@ark-ui/vue/collapsible";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Collapsible, dressed in the paper-and-ink system: one control on
 * the paper, its panel dissolving open to the machine's measured height.
 * The API is Ark's own — Root, Trigger, Content, Indicator. */
export const Collapsible = ArkCollapsible;

injectComponentStyle("collapsible");
