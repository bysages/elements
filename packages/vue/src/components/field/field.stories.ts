import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Field } from "./index.js";

const meta: Meta = { title: "Components / Field" };
export default meta;

/** Label, control, help, error — the whole field column in its resting
 * register. */
export const Basic = {
  render: () =>
    h(Field.Root, null, () => [
      h(Field.Label, () => "Label"),
      h(Field.Input as any, { placeholder: "Placeholder" }),
      h(Field.HelperText, () => "Some additional info"),
      h(Field.ErrorText, () => "Error info"),
    ]),
};
