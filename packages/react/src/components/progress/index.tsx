import { Progress as ArkProgress } from "@ark-ui/react/progress";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type ProgressRootProps = ComponentProps<typeof ArkProgress.Root> & {
  /** One rung of the groove ladder — the track's thickness. */
  size?: "sm" | "md" | "lg";
};

function ProgressRoot({ size = "md", ...rest }: ProgressRootProps) {
  return <ArkProgress.Root {...rest} data-size={size} />;
}

/** Ark's Progress, dressed in the paper-and-ink system: a quiet hairline
 * groove that the primary ink fills at the machine's pace. The API is
 * Ark's own — Root, Label, ValueText, Track, Range, View, Circle,
 * CircleTrack, CircleRange. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Progress: Omit<typeof ArkProgress, "Root"> & { Root: typeof ProgressRoot } = {
  ...ArkProgress,
  Root: ProgressRoot,
};

injectComponentStyle("progress");
