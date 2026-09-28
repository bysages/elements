import { Steps as ArkSteps } from "@ark-ui/vue/steps";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/**
 * Steps — linear progress through a sequence.
 *
 * Parts: Root, List, Item, Trigger, Indicator, Separator, Content,
 * PrevTrigger, NextTrigger, Progress. Indicator and Separator carry
 * data-complete / data-current / data-incomplete.
 */
const StepsRoot = defineComponent({
  name: "SStepsRoot",
  props: {
    /** One rung of the control-height ladder every indicator stands on. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("steps");

    return () => h(ArkSteps.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Steps: Omit<typeof ArkSteps, "Root"> & { Root: typeof StepsRoot } = {
  ...ArkSteps,
  Root: StepsRoot,
};
