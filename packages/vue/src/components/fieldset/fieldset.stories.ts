import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Field } from "../field/index.js";
import { Fieldset } from "./index.js";

const meta: Meta = { title: "Components / Fieldset" };
export default meta;

/** A serif legend heading a column of fields — the grouped form unit. */
export const Basic = {
  render: () =>
    h(Fieldset.Root, null, () => [
      h(Fieldset.Legend, () => "Contact details"),
      h(Field.Root, null, () => [
        h(Field.Label, () => "Name"),
        h(Field.Input as any, { placeholder: "John Doe" }),
      ]),
      h(Field.Root, null, () => [
        h(Field.Label, () => "Email"),
        h(Field.Input as any, { type: "email", placeholder: "john@example.com" }),
      ]),
    ]),
};
