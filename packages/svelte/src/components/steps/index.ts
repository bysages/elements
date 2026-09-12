import { Steps as ArkSteps } from "@ark-ui/svelte/steps";
import { injectComponentStyle } from "@bysages/core";

/**
 * Steps — linear progress through a sequence.
 *
 * Parts: Root, List, Item, Trigger, Indicator, Separator, Content,
 * PrevTrigger, NextTrigger, Progress. Indicator and Separator carry
 * data-complete / data-current / data-incomplete.
 */
export const Steps = ArkSteps;

injectComponentStyle("steps");
