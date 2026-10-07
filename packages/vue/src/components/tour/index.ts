import {
  Tour as ArkTour,
  useTour as useArkTour,
  type UseTourProps,
  type UseTourReturn,
  type TourStepDetails,
} from "@ark-ui/vue/tour";
import { injectComponentStyle } from "@bysages/core";
import type { Component, PropType, SetupContext } from "vue";
import { computed, defineComponent, h, useId } from "vue";

import { defineFamily } from "../../internal/family";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
import { Button } from "../button";

export type {
  TourInteractOutsideEvent,
  TourPointerDownOutsideEvent,
  TourStepDetails,
} from "@ark-ui/vue/tour";

/** Tour, dressed in the paper-and-ink system: a dimmed page where
 * the spotlight alone keeps the focus halo, and the anchored card rides
 * the shared popup vessel. The parts — Root, Backdrop,
 * Spotlight, Positioner, Content, Arrow, ArrowTip, Title, Description,
 * ProgressText, Control, Actions, ActionTrigger, CloseTrigger, plus
 * useTour. */
const TourRoot = defineComponent({
  name: "STourRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(withPresenceRoot(ArkTour.Root as never), withPresenceEnter(attrs), slots);
  },
}) as unknown as typeof ArkTour.Root;

/** The common path: give it a prepared machine and the starter, dimmed
 * page, spotlight, and standard card arrive as one. The default slot is
 * the anchored page; the content slot replaces the card body. */
const TourFacade = defineComponent({
  name: "STour",
  inheritAttrs: false,
  props: {
    tour: { type: Object as PropType<UseTourReturn["value"]>, required: true },
    trigger: { type: String, default: "Start tour" },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("tour");

    return () =>
      h(TourRoot as never, { ...ctx.attrs, tour: props.tour }, () => [
        h(Button, { size: "sm", onClick: () => props.tour.start() }, () => props.trigger),
        ctx.slots.default?.(),
        h(ArkTour.Backdrop),
        h(ArkTour.Spotlight),
        h(ArkTour.Positioner, () =>
          h(
            ArkTour.Content as never,
            () =>
              ctx.slots.content?.() ?? [
                h(ArkTour.ProgressText),
                h(ArkTour.Title),
                h(ArkTour.Description),
                h(ArkTour.Control, () =>
                  h(ArkTour.Actions, null, {
                    default: (actions: TourStepDetails["actions"]) =>
                      actions?.map((action) =>
                        h(ArkTour.ActionTrigger, { key: action.label, action }, () => action.label),
                      ),
                  }),
                ),
              ],
          ),
        ),
      ]);
  },
});

export const Tour = defineFamily(TourFacade, { ...ArkTour, Root: TourRoot } as unknown as {
  Root: Component;
} & Record<string, Component>) as typeof TourFacade &
  Omit<typeof ArkTour, "Root"> & { Root: typeof TourRoot };
/** Tour machines are created by useTour, so the stable id belongs there. */
export function useTour(
  props: UseTourProps = {},
  emit?: Parameters<typeof useArkTour>[1],
): UseTourReturn {
  const generated = useId();

  return useArkTour(
    computed(() => ({ id: `bs-tour-${generated}`, ...props })),
    emit,
  );
}

injectComponentStyle("tour");
