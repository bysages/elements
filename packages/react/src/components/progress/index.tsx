import { Progress as ArkProgress } from "@ark-ui/react/progress";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties } from "react";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

type ProgressRootProps = ComponentProps<typeof ArkProgress.Root> & {
  /** One rung of the groove ladder — the track's thickness. */
  size?: "sm" | "md" | "lg";
};

const ProgressView = ArkProgress.View as any;

function ProgressRoot(props: ProgressRootProps) {
  injectComponentStyle("progress");
  const id = useElementId("progress", props);
  const { size = "md", ...rest } = props;

  return <ArkProgress.Root {...rest} id={id} data-size={size} />;
}

/** Ark's Progress, dressed in the paper-and-ink system: a quiet hairline
 * groove that the primary ink fills at the machine's pace. The API is
 * Ark's own — Root, Label, ValueText, Track, Range, View, Circle,
 * CircleTrack, CircleRange. */

type ProgressFacadeProps = {
  value?: number | null;
  defaultValue?: number | null;
  min?: number;
  max?: number;
  label?: string;
  variant?: "linear" | "circle" | "dashboard";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  onValueChange?: (value: number | null) => void;
};

/** The complete progress behind one value: a labelled linear groove by
 * default, with circular and dashboard dials for compact status. */
function ProgressFacade(props: ProgressFacadeProps) {
  const {
    value,
    defaultValue,
    min,
    max,
    label,
    variant = "linear",
    size = "md",
    className,
    style,
    onValueChange,
  } = props;

  // Ark exposes percent only through the inline geometry of its SVG range,
  // so the dashboard derives the same measure from the facade props to
  // drive a CSS gradient.
  const dashboardPercent = (() => {
    const lower = min ?? 0;
    const upper = max ?? 100;
    const current = value ?? defaultValue ?? lower + (upper - lower) / 2;
    const percent = ((current - lower) / (upper - lower)) * 100;
    return !Number.isFinite(percent) ? 0 : Math.min(100, Math.max(0, percent));
  })();

  return (
    <ProgressRoot
      size={size}
      data-variant={variant}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={className}
      style={style}
      onValueChange={(event: { value: number | null }) => onValueChange?.(event.value)}
    >
      {label ? <ArkProgress.Label>{label}</ArkProgress.Label> : null}
      {variant === "dashboard" ? (
        <div data-scope="progress" data-part="view" data-view="dashboard">
          <div
            aria-hidden="true"
            data-scope="progress"
            data-part="dash-ring"
            style={{ "--percent": String(dashboardPercent) } as CSSProperties}
          />
          <ArkProgress.ValueText />
        </div>
      ) : variant === "circle" ? (
        <ProgressView view="circle">
          <ArkProgress.Circle>
            <ArkProgress.CircleRange />
          </ArkProgress.Circle>
        </ProgressView>
      ) : (
        <ArkProgress.Track>
          <ArkProgress.Range />
        </ArkProgress.Track>
      )}
      {variant !== "dashboard" ? <ArkProgress.ValueText /> : null}
    </ProgressRoot>
  );
}

export const Progress: typeof ProgressFacade &
  Omit<typeof ArkProgress, "Root"> & { Root: typeof ProgressRoot } = Object.assign(ProgressFacade, {
  ...ArkProgress,
  Root: ProgressRoot,
}) as typeof ProgressFacade & Omit<typeof ArkProgress, "Root"> & { Root: typeof ProgressRoot };
