import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { PasswordInput } from "./index.js";

const meta: Meta = { title: "Components / Password Input" };
export default meta;

function eye(open: boolean) {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [
      h("path", {
        d: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z",
      }),
      h("circle", { cx: 12, cy: 12, r: 3 }),
      ...(open ? [] : [h("path", { d: "M4 4l16 16" })]),
    ],
  );
}

/** The masked field with its reveal eye — the indicator swaps eye for
 * eye-off in the same seat. */
export const Basic = {
  render: () =>
    h(PasswordInput.Root, null, () => [
      h(PasswordInput.Label, () => "Password"),
      h(PasswordInput.Control, () => [
        h(PasswordInput.Input, { placeholder: "Enter a password" }),
        h(PasswordInput.VisibilityTrigger, () =>
          h(PasswordInput.Indicator, null, {
            default: () => eye(true),
            fallback: () => eye(false),
          }),
        ),
      ]),
    ]),
};
