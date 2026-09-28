import { Progress as ArkProgress } from "@ark-ui/vue/progress";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

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

    return () => h(ArkProgress.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Progress: Omit<typeof ArkProgress, "Root"> & { Root: typeof ProgressRoot } = {
  ...ArkProgress,
  Root: ProgressRoot,
};
