import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, Teleport } from "vue";

import { Tour, useTour, type TourStepDetails } from "./index.js";

const meta: Meta = { title: "Components / Tour" };
export default meta;

const steps: TourStepDetails[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome",
    description: "A short walk through the room before the ink settles.",
    actions: [{ label: "Start", action: "next" }],
  },
  {
    id: "first",
    type: "tooltip",
    title: "The first seal",
    description: "Primary actions sit quiet until asked — then they answer.",
    target: () => document.querySelector<HTMLElement>("#tour-anchor-first"),
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "second",
    type: "tooltip",
    title: "The second seal",
    description: "Everything stays on the paper; nothing leaves the page.",
    target: () => document.querySelector<HTMLElement>("#tour-anchor-second"),
    actions: [{ label: "Finish", action: "dismiss" }],
  },
];

const TourStory = defineComponent({
  name: "TourStory",
  setup() {
    const tour = useTour({ steps });
    return () =>
      h(Tour.Root, { tour: tour.value }, () => [
        h("div", { style: { display: "flex", gap: "0.75rem", marginBottom: "1.5rem" } }, [
          h(
            "button",
            { id: "tour-anchor-first", type: "button", onClick: () => tour.value.start() },
            () => "First",
          ),
          h(
            "button",
            { id: "tour-anchor-second", type: "button", onClick: () => tour.value.start("second") },
            () => "Second",
          ),
        ]),
        h(Teleport, { to: "body" }, () => [
          h(Tour.Backdrop),
          h(Tour.Spotlight),
          h(Tour.Positioner, () =>
            h(Tour.Content, () => [
              h(Tour.Arrow, () => h(Tour.ArrowTip)),
              h(Tour.CloseTrigger, () => "×"),
              h(Tour.ProgressText),
              h(Tour.Title),
              h(Tour.Description),
              h(Tour.Control, () =>
                h(Tour.Actions, null, {
                  default: (actions: TourStepDetails["actions"]) =>
                    actions?.map((action) =>
                      h(Tour.ActionTrigger, { key: action.label, action }, () => action.label),
                    ),
                }),
              ),
            ]),
          ),
        ]),
      ]);
  },
});

export const Basic = {
  render: () => h(TourStory),
};
