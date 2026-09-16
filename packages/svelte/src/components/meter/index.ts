import { injectComponentStyle } from "@bysages/core";

import MeterRoot from "./Meter.svelte";
import MeterLabel from "./MeterLabel.svelte";
import MeterTrack from "./MeterTrack.svelte";
import MeterValueText from "./MeterValueText.svelte";

/** A measure in the world, not a task in flight: how much of the toner
 * remains, how full the cistern stands. The level chooses the pigment. */
export const Meter = Object.assign(MeterRoot, {
  Root: MeterRoot,
  Label: MeterLabel,
  ValueText: MeterValueText,
  Track: MeterTrack,
});

export type { MeterRootProps, MeterPartProps } from "./props";

injectComponentStyle("meter");
