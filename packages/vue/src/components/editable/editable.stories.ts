import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Field } from "../field/index.js";
import { withState } from "../with-state.js";
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

/** The shared anatomy: preview as rest state, input on edit, triggers
 * swapping with the machine. */
function slate(rootProps: any, label: string, extras: any[] = []) {
  return h(Editable.Root, rootProps, () => [
    h(Editable.Label, () => label),
    h(Editable.Area, () => [h(Editable.Preview), h(Editable.Input)]),
    ...extras,
  ]);
}

/** Click the text to edit it — the preview becomes the field, and the
 * submit seal carries the ink. */
export const Basic = {
  args: {
    label: "Label",
    placeholder: "Enter text…",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(Editable.Root, { placeholder: args.placeholder, defaultValue: "Hello World" }, () => [
          h(Editable.Label, () => args.label),
          h(Editable.Area, () => [h(Editable.Preview), h(Editable.Input)]),
          h(Editable.Control, () => [
            h(Editable.EditTrigger, { "aria-label": "Edit" }, { default: pencil }),
            h(Editable.SubmitTrigger, { "aria-label": "Submit" }, { default: check }),
            h(Editable.CancelTrigger, { "aria-label": "Cancel" }, { default: cross }),
          ]),
        ]),
    ),
};

/** The triggers read the machine: pencil at rest, check and cross while
 * editing. */
export const Controls = {
  render: () =>
    h(Editable.Root, { defaultValue: "Click edit to start" }, () =>
      h(Editable.Context as any, null, {
        default: (editable: { editing: boolean }) => [
          h(Editable.Label, () => "Label"),
          h(Editable.Area, () => [h(Editable.Preview), h(Editable.Input)]),
          h(Editable.Control, () =>
            editable.editing
              ? [
                  h(
                    Editable.SubmitTrigger,
                    { key: "submit", "aria-label": "Submit" },
                    { default: check },
                  ),
                  h(
                    Editable.CancelTrigger,
                    { key: "cancel", "aria-label": "Cancel" },
                    { default: cross },
                  ),
                ]
              : [
                  h(
                    Editable.EditTrigger,
                    { key: "edit", "aria-label": "Edit" },
                    { default: pencil },
                  ),
                ],
          ),
        ],
      }),
    ),
};

/** A double click opens the slate — a click merely rests on it. */
export const DoubleClick = {
  render: () =>
    slate({ defaultValue: "Double-click to edit", activationMode: "dblclick" } as any, "Label"),
};

/** Long text takes a taller slate: the input grows into a textarea. */
export const Textarea = {
  render: () =>
    h(
      Editable.Root,
      {
        placeholder: "Enter a description…",
        defaultValue:
          "A headless component library for building reusable, scalable design systems across frameworks.",
        activationMode: "dblclick",
      },
      () => [
        h(Editable.Label, () => "Description"),
        h(Editable.Area, () => [
          h(Editable.Input, { asChild: true }, () =>
            h("textarea", {
              rows: 3,
              style: { resize: "vertical", font: "inherit" },
            }),
          ),
          h(Editable.Preview, { style: { whiteSpace: "pre-wrap" } }),
        ]),
        h(
          "div",
          { style: { fontSize: "var(--bs-font-size-xs)", color: "var(--bs-color-text-tertiary)" } },
          () => "Press Cmd + Enter to save",
        ),
      ],
    ),
};

/** The value answers to the caller — the slate only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: "Hello World" });
      return () =>
        h(
          Editable.Root,
          {
            placeholder: "Enter text…",
            modelValue: state.value,
            onValueChange: (e: { value: string }) => (state.value = e.value),
          } as any,
          () => [
            h(Editable.Label, () => "Label"),
            h(Editable.Area, () => [h(Editable.Preview), h(Editable.Input)]),
            h(Editable.Control, () => [
              h(Editable.EditTrigger, { "aria-label": "Edit" }, { default: pencil }),
            ]),
          ],
        );
    }),
};

/** An editable inside a field: helper and error text ride along. */
export const WithField = {
  render: () =>
    h(Field.Root, () => [
      slate({ placeholder: "Enter your bio" }, "Bio"),
      h(Field.HelperText, () => "Click to edit your bio."),
      h(Field.ErrorText, () => "Bio is required."),
    ]),
};
