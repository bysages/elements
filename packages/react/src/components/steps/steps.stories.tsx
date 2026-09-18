import type { Meta } from "@storybook/react-vite";

import { Steps } from ".";

const meta: Meta = { title: "Components/Navigation/Steps" };
export default meta;

const ITEMS = [
  { title: "Fill in details", description: "Contact and shipping address" },
  { title: "Confirm the order", description: "Check items and totals" },
  { title: "Complete payment", description: "Choose how to pay" },
];

export const Basic = {
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
        {(steps) => <Steps.Progress>Done {Math.round(steps.percent)}%</Steps.Progress>}
      </Steps.Context>
    </Steps.Root>
  ),
};
