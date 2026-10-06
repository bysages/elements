/**
 * Steps — linear progress through a sequence.
 *
 * Parts: Root, List, Item, Trigger, Indicator, Separator, Content,
 * PrevTrigger, NextTrigger, Progress. Indicator and Separator carry
 * data-complete / data-current / data-incomplete.
 */
import { Steps as ArkSteps } from "@ark-ui/svelte/steps";

import { defineFamily } from "../../internal/family";
import StepsFacade from "./Steps.svelte";
import StepsItem from "./StepsItem.svelte";
import StepsRoot from "./StepsRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Steps: typeof StepsFacade &
  Omit<typeof ArkSteps, "Root" | "Item"> & {
    Root: typeof StepsRoot;
    Item: typeof StepsItem;
  } = defineFamily(StepsFacade, {
  ...ArkSteps,
  Root: StepsRoot,
  Item: StepsItem,
});
