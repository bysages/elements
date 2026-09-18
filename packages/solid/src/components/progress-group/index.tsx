import { injectComponentStyle } from "@bysages/core";
import { For, Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** One verdict on the bar. */
export interface ProgressSegment {
  value: number;
  label?: string;
  pigment?: "primary" | "success" | "warning" | "danger" | "info";
}

/**
 * One bar, several verdicts: the segments stand shoulder to shoulder,
 * each as wide as its share of the whole and speaking its own pigment;
 * the legend reads them back beneath (swatch, label, value) unless the
 * caller declines it. The whole is the sum of the parts unless the
 * caller brings a larger one — the remainder then shows as groove.
 */
export interface ProgressGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  segments: ProgressSegment[];
  max?: number;
  showLegend?: boolean;
}

export function ProgressGroup(props: ProgressGroupProps) {
  const [own, rest] = splitProps(props, ["segments", "max", "showLegend"]);

  // A zero whole must not divide — the bar simply stays empty.
  const total = () => own.max ?? own.segments.reduce((sum, segment) => sum + segment.value, 0);
  const share = (value: number) => {
    const whole = total();
    return whole > 0 ? `${(value / whole) * 100}%` : "0%";
  };
  const nameOf = (segment: ProgressSegment, index: number) =>
    segment.label ?? segment.pigment ?? `Segment ${index + 1}`;

  return (
    <div {...rest} data-scope="progress-group" data-part="root">
      <div data-scope="progress-group" data-part="track">
        <For each={own.segments}>
          {(segment, index) => (
            <div
              data-scope="progress-group"
              data-part="segment"
              data-pigment={segment.pigment}
              role="progressbar"
              aria-valuenow={segment.value}
              aria-valuemin={0}
              aria-valuemax={total()}
              aria-label={nameOf(segment, index())}
              style={{ "inline-size": share(segment.value) }}
            />
          )}
        </For>
      </div>
      <Show when={own.showLegend ?? true}>
        <div data-scope="progress-group" data-part="legend">
          <For each={own.segments}>
            {(segment, index) => (
              <div
                data-scope="progress-group"
                data-part="legend-item"
                data-pigment={segment.pigment}
              >
                <span data-scope="progress-group" data-part="swatch" aria-hidden="true" />
                <span data-scope="progress-group" data-part="legend-label">
                  {nameOf(segment, index())}
                </span>
                <span data-scope="progress-group" data-part="legend-value">
                  {String(segment.value)}
                </span>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

injectComponentStyle("progress-group");
