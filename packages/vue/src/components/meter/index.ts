import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, type PropType } from "vue";

function part(name: string, tag: string) {
  return defineComponent({
    name: "Meter" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "meter", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Label = part("Label", "span");
const ValueText = part("ValueText", "span");

const Track = defineComponent({
  name: "MeterTrack",
  setup(_, ctx: SetupContext) {
    return () =>
      h(
        "span",
        { ...ctx.attrs, "data-scope": "meter", "data-part": "track" },
        h("span", { "data-scope": "meter", "data-part": "range" }),
      );
  },
});

const Root = defineComponent({
  name: "MeterRoot",
  props: {
    /** The measured value — clamped between min and max. */
    value: { type: Number, required: true },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    /** The pigment the ink rides: primary unless a threshold is crossed. */
    level: {
      type: String as PropType<"normal" | "success" | "warning" | "danger">,
      default: "normal",
    },
    label: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    const ratio = computed(() => {
      const span = props.max - props.min;
      return span > 0 ? Math.min(Math.max((props.value - props.min) / span, 0), 1) : 0;
    });
    return () => {
      const children = ctx.slots.default?.() ?? [
        h(Label, () => props.label),
        h(ValueText, () => `${Math.round(ratio.value * 100)}%`),
        h(Track),
      ];
      return h(
        "div",
        {
          ...ctx.attrs,
          role: "meter",
          "aria-valuemin": props.min,
          "aria-valuemax": props.max,
          "aria-valuenow": props.value,
          "aria-label": props.label ?? (ctx.attrs["aria-label"] as string | undefined),
          "data-scope": "meter",
          "data-part": "root",
          "data-level": props.level !== "normal" ? props.level : undefined,
          // The share of the scale, inherited by the range below.
          style: { ...(ctx.attrs.style as object), "--_percent": `${ratio.value * 100}%` },
        },
        children,
      );
    };
  },
});

/** A measure in the world, not a task in flight: how much of the toner
 * remains, how full the cistern stands. The level chooses the pigment —
 * primary while all is well, the fixed semantic pigments at the
 * thresholds. */

export const Meter = Object.assign(Root, { Root, Label, ValueText, Track });

injectComponentStyle("meter");
