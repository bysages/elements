import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Progress } from "./index.js";

const meta: Meta = { title: "Components / Progress" };
export default meta;

/** Linear progress: label and value sit on one line, the groove runs the
 * full measure beneath them. */
export const Basic = {
  render: () =>
    h(Progress.Root, { defaultValue: 42 }, () => [
      h(Progress.Label, () => "Upload"),
      h(Progress.ValueText),
      h(Progress.Track, () => h(Progress.Range)),
    ]),
};
