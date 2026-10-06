import type { Meta } from "@storybook/react-vite";

import { Steps } from ".";

const meta: Meta = { title: "Components/Navigation/Steps" };
export default meta;

const ITEMS = [
  { title: "Fill in details", description: "Contact and shipping address" },
  { title: "Confirm the order", description: "Check items and totals" },
  { title: "Complete payment", description: "Choose how to pay" },
];

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => (
    <Steps
      items={[{ title: "Account" }, { title: "Profile" }, { title: "Confirm" }]}
      defaultStep={0}
    />
  ),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  args: {
    backLabel: "Back",
    nextLabel: "Next",
  },
  render: (args: any) => (
    <Steps.Root count={ITEMS.length}>
      <Steps.List>
        {ITEMS.map((item, index) => (
          <Steps.Item key={item.title} index={index}>
            <Steps.Trigger>
              <Steps.Indicator>{String(index + 1)}</Steps.Indicator>
              <span>{item.title}</span>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
      {ITEMS.map((item, index) => (
        <Steps.Content key={item.title} index={index}>
          {item.title} — {item.description}
        </Steps.Content>
      ))}
      <Steps.CompletedContent>All steps completed.</Steps.CompletedContent>
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
        <Steps.PrevTrigger>{args.backLabel}</Steps.PrevTrigger>
        <Steps.NextTrigger>{args.nextLabel}</Steps.NextTrigger>
      </div>
    </Steps.Root>
  ),
};

export const Progress = {
  render: () => (
    <Steps.Root count={ITEMS.length}>
      <Steps.Context>
        {(steps) => (
          <Steps.Progress aria-label="Step progress">
            Done {Math.round(steps.percent)}%
          </Steps.Progress>
        )}
      </Steps.Context>
    </Steps.Root>
  ),
};

/** The vertical climb: the list turns, each step standing on its own
 * row for narrow measures. */
export const Vertical = {
  render: () => (
    <Steps.Root count={ITEMS.length} orientation="vertical">
      <Steps.List>
        {ITEMS.map((item, index) => (
          <Steps.Item key={item.title} index={index}>
            <Steps.Trigger>
              <Steps.Indicator>{String(index + 1)}</Steps.Indicator>
              <span>{item.title}</span>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  ),
};
