import type { Meta } from "@storybook/react-vite";

import { Progress } from ".";

const meta: Meta = { title: "Components/Feedback/Progress" };
export default meta;

/** Linear progress: label and value sit on one line, the groove runs the
 * full measure beneath them. */
export const Basic = {
  args: {
    label: "Upload",
  },
  render: (args: any) => (
    <Progress.Root defaultValue={42}>
      <Progress.Label>{args.label}</Progress.Label>
      <Progress.ValueText />
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  ),
};
