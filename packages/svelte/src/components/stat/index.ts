import { injectComponentStyle } from "@bysages/core";
import StatRoot from "./Stat.svelte";
import StatLabel from "./StatLabel.svelte";
import StatValue from "./StatValue.svelte";
import StatDelta from "./StatDelta.svelte";
import StatDescription from "./StatDescription.svelte";

/** One figure on the page: the label whispers what it is, the value
 * states it plainly in tabular figures, the delta reads the direction
 * in the fixed semantic pigments. */
export const Stat = Object.assign(StatRoot, {
  Root: StatRoot,
  Label: StatLabel,
  Value: StatValue,
  Delta: StatDelta,
  Description: StatDescription,
});

export type { StatDeltaProps, StatPartProps } from "./props";

injectComponentStyle("stat");
