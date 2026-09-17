import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

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
export interface ProgressGroupProps {
  segments: ProgressSegment[];
  max?: number;
  showLegend?: boolean;
}

export const ProgressGroup = defineComponent({
  name: "ProgressGroup",
  props: {
    segments: {
      type: Array as PropType<ProgressSegment[]>,
      required: true,
    },
    max: { type: Number, default: undefined },
    showLegend: { type: Boolean, default: true },
  },
  setup(props, ctx: SetupContext) {
    return () => {
      // A zero whole must not divide — the bar simply stays empty.
      const total = props.max ?? props.segments.reduce((sum, segment) => sum + segment.value, 0);
      const share = (value: number) => (total > 0 ? `${(value / total) * 100}%` : "0%");
      const nameOf = (segment: ProgressSegment, index: number) =>
        segment.label ?? segment.pigment ?? `Segment ${index + 1}`;

      return h("div", { ...ctx.attrs, "data-scope": "progress-group", "data-part": "root" }, () => [
        h("div", { "data-scope": "progress-group", "data-part": "track" }, () =>
          props.segments.map((segment, index) =>
            h("div", {
              key: index,
              "data-scope": "progress-group",
              "data-part": "segment",
              "data-pigment": segment.pigment,
              role: "progressbar",
              "aria-valuenow": segment.value,
              "aria-valuemin": 0,
              "aria-valuemax": total,
              "aria-label": nameOf(segment, index),
              style: { inlineSize: share(segment.value) },
            }),
          ),
        ),
        props.showLegend
          ? h("div", { "data-scope": "progress-group", "data-part": "legend" }, () =>
              props.segments.map((segment, index) =>
                h(
                  "div",
                  {
                    key: index,
                    "data-scope": "progress-group",
                    "data-part": "legend-item",
                    "data-pigment": segment.pigment,
                  },
                  [
                    h("span", {
                      "data-scope": "progress-group",
                      "data-part": "swatch",
                      "aria-hidden": "true",
                    }),
                    h("span", { "data-scope": "progress-group", "data-part": "legend-label" }, () =>
                      nameOf(segment, index),
                    ),
                    h("span", { "data-scope": "progress-group", "data-part": "legend-value" }, () =>
                      String(segment.value),
                    ),
                  ],
                ),
              ),
            )
          : null,
      ]);
    };
  },
});

injectComponentStyle("progress-group");
