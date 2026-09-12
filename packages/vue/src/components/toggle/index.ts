import { Toggle as ArkToggle } from "@ark-ui/vue/toggle";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Toggle, dressed in the paper-and-ink system: a standalone seal that
 * settles into the flat ink fill while pressed on. The API is Ark's own —
 * Root, Indicator. */
export const Toggle = ArkToggle;

injectComponentStyle("toggle");
