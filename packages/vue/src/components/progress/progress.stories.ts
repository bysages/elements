import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Progress } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Feedback/Progress" };
export default meta;

/** The facade is the one-tag path for the common completion. */
export const Basic = {
  render: () => h(Progress, { defaultValue: 42, label: "Copying the archive" }),
};

/** Linear progress: label and value sit on one line, the groove runs the
 * full measure beneath them. */
export const Anatomy = {
  args: {
    label: "Upload",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(Progress.Root, { defaultValue: 42 }, () => [
          h(Progress.Label, () => args.label),
          h(Progress.ValueText),
          h(Progress.Track, () => h(Progress.Range)),
        ]),
    ),
};
