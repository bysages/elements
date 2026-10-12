import { Progress as ArkProgress, useProgressContext } from "@ark-ui/solid/progress";
import type { ProgressRootProps as ArkProgressRootProps } from "@ark-ui/solid/progress";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, createMemo, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Progress, dressed in the paper-and-ink system: a quiet hairline
 * groove that the primary ink fills at the machine's pace. The API is
 * Ark's own — Root, Label, ValueText, Track, Range, View, Circle,
 * CircleTrack, CircleRange. */

type ProgressOwnProps = {
  /** One rung of the groove ladder — the track's thickness. */
  size?: "sm" | "md" | "lg";
  /** Linear is the groove; circle and dashboard are compact dials. */
  variant?: "linear" | "circle" | "dashboard";
  /** The accessible name shown beside the dashboard dial. */
  label?: string;
};

function ProgressRoot(props: ArkProgressRootProps & ProgressOwnProps) {
  injectComponentStyle("progress");

  const [own, rest] = splitProps(props, [
    "id",
    "size",
    "variant",
    "label",
    "value",
    "defaultValue",
    "min",
    "max",
  ]);
  const id = useElementId("progress", () => own.id);

  // Ark exposes percent only through the inline geometry of its SVG range,
  // so the dashboard derives the same measure from the root props to
  // drive a CSS gradient.
  const dashboardPercent = createMemo(() => {
    const min = own.min ?? 0;
    const max = own.max ?? 100;
    const value = own.value ?? own.defaultValue ?? min + (max - min) / 2;
    const percent = ((value - min) / (max - min)) * 100;

    return !Number.isFinite(percent) ? 0 : Math.min(100, Math.max(0, percent));
  });

  return (
    <ArkProgress.Root
      {...rest}
      id={id()}
      data-size={own.size ?? "md"}
      data-variant={own.variant ?? "linear"}
    >
      <Show when={own.variant === "dashboard"} fallback={rest.children}>
        {own.label ? <ArkProgress.Label>{own.label}</ArkProgress.Label> : null}
        <div data-scope="progress" data-part="view" data-view="dashboard">
          <div
            aria-hidden="true"
            data-scope="progress"
            data-part="dash-ring"
            style={{ "--percent": String(dashboardPercent()) }}
          />
          <ArkProgress.ValueText />
        </div>
      </Show>
    </ArkProgress.Root>
  );
}

export interface ProgressFacadeProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  label?: string;
  variant?: "linear" | "circle" | "dashboard";
  /** One rung of the groove ladder — the track's thickness. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: number | null) => void;
}

function ProgressCircleView() {
  const progress = useProgressContext();
  const value = progress().value;
  const max = progress().max;
  const state = value === null ? "indeterminate" : value === max ? "complete" : "loading";

  return (
    <ArkProgress.View state={state}>
      <ArkProgress.Circle>
        <ArkProgress.CircleRange />
      </ArkProgress.Circle>
    </ArkProgress.View>
  );
}

/** The complete progress behind one value: a labelled linear groove by
 * default, with circular and dashboard dials for compact status. */
function ProgressFacade(props: ProgressFacadeProps) {
  const variant = () => props.variant ?? "linear";

  return (
    <ProgressRoot
      size={props.size ?? "md"}
      variant={variant()}
      label={props.label}
      defaultValue={props.defaultValue}
      min={props.min}
      max={props.max}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: number | null }) => props.onValueChange?.(details.value)}
    >
      {variant() === "dashboard"
        ? null
        : [
            props.label ? <ArkProgress.Label>{props.label}</ArkProgress.Label> : null,
            variant() === "circle" ? (
              <ProgressCircleView />
            ) : (
              <ArkProgress.Track>
                <ArkProgress.Range />
              </ArkProgress.Track>
            ),
          ]}
    </ProgressRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Progress: typeof ProgressFacade &
  Omit<typeof ArkProgress, "Root"> & { Root: typeof ProgressRoot } = defineFamily(ProgressFacade, {
  ...ArkProgress,
  Root: ProgressRoot,
});

injectComponentStyle("progress");
