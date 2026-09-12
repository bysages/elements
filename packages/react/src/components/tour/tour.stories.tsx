import type { Meta } from "@storybook/react-vite";

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

export function Basic() {
  const tour = useTour({ steps });
  return (
    <Tour.Root tour={tour}>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <button id="tour-anchor-first" type="button" onClick={() => tour.start()}>
          First
        </button>
        <button id="tour-anchor-second" type="button" onClick={() => tour.start("second")}>
          Second
        </button>
      </div>
      <Tour.Backdrop />
      <Tour.Spotlight />
      <Tour.Positioner>
        <Tour.Content>
          <Tour.Arrow>
            <Tour.ArrowTip />
          </Tour.Arrow>
          <Tour.CloseTrigger>×</Tour.CloseTrigger>
          <Tour.ProgressText />
          <Tour.Title />
          <Tour.Description />
          <Tour.Control>
            <Tour.Actions>
              {(actions) =>
                actions.map((action) => <Tour.ActionTrigger key={action.label} action={action} />)
              }
            </Tour.Actions>
          </Tour.Control>
        </Tour.Content>
      </Tour.Positioner>
    </Tour.Root>
  );
}
