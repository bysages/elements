import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Editable } from "./index.js";

const meta: Meta = { title: "Components / Editable" };
export default meta;

function icon(d: string) {
  return () =>
    h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2 }, [
      h("path", { d, "stroke-linecap": "round", "stroke-linejoin": "round" }),
    ]);
}

const pencil = icon("M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z");
const check = icon("M20 6 9 17l-5-5");
const cross = icon("M18 6 6 18M6 6l12 12");

/** Click the text to edit it — the ghost preview becomes the field, and
 * the submit seal carries the ink. */
export const Basic = {
  render: () =>
    h(Editable.Root, { placeholder: "Enter text…", defaultValue: "Hello World" }, () => [
      h(Editable.Label, () => "Label"),
      h(Editable.Area, () => [h(Editable.Preview), h(Editable.Input)]),
      h(Editable.Control, () => [
        h(Editable.EditTrigger, { "aria-label": "Edit" }, { default: pencil }),
        h(Editable.SubmitTrigger, { "aria-label": "Submit" }, { default: check }),
        h(Editable.CancelTrigger, { "aria-label": "Cancel" }, { default: cross }),
      ]),
    ]),
};
