import { Progress as ArkProgress } from "@ark-ui/vue/progress";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Progress, dressed in the paper-and-ink system: a quiet hairline
 * groove that the primary ink fills at the machine's pace. The parts — Root, Label, ValueText, Track, Range, View, Circle,
 * CircleTrack, CircleRange. */
const ProgressRoot = defineComponent({
  name: "SProgressRoot",
  props: {
    /** One rung of the groove ladder — the track's thickness. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("progress");
    const id = useElementId("progress", attrs);

    return () => h(ArkProgress.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The complete progress behind one value: a labelled linear groove by
 * default, with a circular variant for compact status. */
const ProgressFacade = defineComponent({
  name: "SProgress",
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: undefined },
    min: { type: Number, default: undefined },
    max: { type: Number, default: undefined },
    label: { type: String, default: undefined },
    variant: {
      type: String as PropType<"linear" | "circle">,
      default: "linear",
    },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    return () =>
      h(
        ProgressRoot,
        {
          ...attrs,
          "data-variant": props.variant,
          defaultValue: props.defaultValue,
          modelValue: props.modelValue,
          min: props.min,
          max: props.max,
          "onUpdate:modelValue": (value: number | null) => emit("update:modelValue", value),
        },
        () => [
          ...(props.label ? [h(ArkProgress.Label, () => props.label)] : []),
          h(ArkProgress.ValueText),
          props.variant === "circle"
            ? h(ArkProgress.View as never, { view: "circle" }, () => [
                h(ArkProgress.Circle, () => h(ArkProgress.CircleRange)),
              ])
            : h(ArkProgress.Track, () => h(ArkProgress.Range)),
        ],
      );
  },
});

export const Progress = defineFamily(ProgressFacade, {
  ...ArkProgress,
  Root: ProgressRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof ProgressFacade &
  Omit<typeof ArkProgress, "Root"> & { Root: typeof ProgressRoot };
