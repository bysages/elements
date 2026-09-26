import { Progress as ArkProgress } from "@ark-ui/solid/progress";
import type { ProgressRootProps as ArkProgressRootProps } from "@ark-ui/solid/progress";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/** Ark's Progress, dressed in the paper-and-ink system: a quiet hairline
 * groove that the primary ink fills at the machine's pace. The API is
 * Ark's own — Root, Label, ValueText, Track, Range, View, Circle,
 * CircleTrack, CircleRange. */

type ProgressOwnProps = {
  /** One rung of the groove ladder — the track's thickness. */
  size?: "sm" | "md" | "lg";
};

function ProgressRoot(props: ArkProgressRootProps & ProgressOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkProgress.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Progress: Omit<typeof ArkProgress, "Root"> & { Root: typeof ProgressRoot } = {
  ...ArkProgress,
  Root: ProgressRoot,
};

injectComponentStyle("progress");
