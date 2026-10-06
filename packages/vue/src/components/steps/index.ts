import { Steps as ArkSteps } from "@ark-ui/vue/steps";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

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
    const id = useElementId("steps", attrs);
    injectComponentStyle("steps");

    return () => h(ArkSteps.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

export type StepsItem = {
  title: string;
};

/** The complete numbered progression; step bodies and navigation stay on
 * the anatomy. */
const StepsFacade = defineComponent({
  name: "SSteps",
  props: {
    items: { type: Array as PropType<StepsItem[]>, required: true },
    step: { type: Number, default: undefined },
    defaultStep: { type: Number, default: 0 },
    linear: { type: Boolean, default: true },
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
    /** One rung of the control-height ladder every indicator stands on. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:step"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("steps");

    return () =>
      h(
        StepsRoot,
        {
          ...attrs,
          count: props.items.length,
          linear: props.linear,
          orientation: props.orientation,
          defaultStep: props.defaultStep,
          ...(props.step === undefined ? {} : { step: props.step }),
          "onUpdate:step": (step: number) => emit("update:step", step),
        },
        () =>
          h(ArkSteps.List, () =>
            props.items.map((item, index) =>
              h(ArkSteps.Item, { key: item.title, index }, () => [
                h(ArkSteps.Trigger, () => [
                  h(ArkSteps.Indicator, () => String(index + 1)),
                  item.title,
                ]),
                h(ArkSteps.Separator),
              ]),
            ),
          ),
      );
  },
});

type StepsParts = Omit<typeof ArkSteps, "Root"> & { Root: typeof StepsRoot };

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Steps = defineFamily(StepsFacade, {
  ...ArkSteps,
  Root: StepsRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof StepsFacade & StepsParts;
