import { Progress as ArkProgress } from "@ark-ui/solid/progress";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Progress, dressed in the paper-and-ink system: a quiet hairline
 * groove that the primary ink fills at the machine's pace. The API is
 * Ark's own — Root, Label, ValueText, Track, Range, View, Circle,
 * CircleTrack, CircleRange. */
export const Progress = ArkProgress;

injectComponentStyle("progress");
