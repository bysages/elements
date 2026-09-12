import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { PinInput } from "./index.js";

const meta: Meta = { title: "Components / Pin Input" };
export default meta;

/** A six-digit code: one character per seal, the caret hopping forward on
 * each keystroke. */
export const Basic = {
  render: () =>
    h(PinInput.Root, { placeholder: "·", otp: true }, () => [
      h(PinInput.Label, () => "Verification code"),
      h(PinInput.Control, () =>
        [0, 1, 2, 3, 4, 5].map((index) => h(PinInput.Input as any, { key: index, index })),
      ),
      h(PinInput.HiddenInput),
    ]),
};
