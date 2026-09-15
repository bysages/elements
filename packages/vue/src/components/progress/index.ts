import { Progress as ArkProgress } from "@ark-ui/vue/progress";
import { injectComponentStyle } from "@bysages/core";

/** Progress, dressed in the paper-and-ink system: a quiet hairline
 * groove that the primary ink fills at the machine's pace. The parts — Root, Label, ValueText, Track, Range, View, Circle,
 * CircleTrack, CircleRange. */
export const Progress = ArkProgress;

injectComponentStyle("progress");
