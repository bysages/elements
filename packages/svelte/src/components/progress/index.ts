/** Ark's Progress, dressed in the paper-and-ink system: a quiet hairline
 * groove that the primary ink fills at the machine's pace. The API is
 * Ark's own — Root, Label, ValueText, Track, Range, View, Circle,
 * CircleTrack, CircleRange. */
import { Progress as ArkProgress } from "@ark-ui/svelte/progress";
import { injectComponentStyle } from "@bysages/core";

import ProgressRoot from "./ProgressRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Progress: Omit<typeof ArkProgress, "Root"> & { Root: typeof ProgressRoot } = {
  ...ArkProgress,
  Root: ProgressRoot,
};

injectComponentStyle("progress");
