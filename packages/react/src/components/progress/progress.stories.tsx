import type { Meta } from "@storybook/react-vite";

import { Progress } from ".";

const meta: Meta = { title: "Components/Feedback/Progress" };
export default meta;

/** The facade is the one-tag path for the common completion. */
export const Basic = {
  render: () => <Progress defaultValue={42} label="Copying the archive" />,
};

/** Linear progress: label and value sit on one line, the groove runs the
 * full measure beneath them. */
export const Anatomy = {
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
