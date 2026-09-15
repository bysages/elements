import { Toggle as ArkToggle } from "@ark-ui/vue/toggle";
import { injectComponentStyle } from "@bysages/core";

/** Toggle, dressed in the paper-and-ink system: a standalone seal that
 * settles into the flat ink fill while pressed on. The parts —
 * Root, Indicator. */
export const Toggle = ArkToggle;

injectComponentStyle("toggle");
