import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, reactive } from "vue";

import { Field } from "./index.js";

const meta: Meta = { title: "Components / Field" };
export default meta;

const column = { display: "grid", gap: "1.5rem", maxWidth: "20rem" };

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

/** A multiline field: the paper gives as many rows as the thought needs. */
export const Textarea = {
  render: () =>
    h("div", { style: column }, [
      h(Field.Root, null, () => [
        h(Field.Label, () => "Notes"),
        h(Field.Textarea as any, { placeholder: "Placeholder", rows: 4 }),
        h(Field.HelperText, () => "Some additional info"),
      ]),
    ]),
};

/** The textarea grows with its content — autoresize keeps the whole
 * thought on the paper. */
export const TextareaAutoresize = {
  render: () =>
    h(Field.Root, null, () => [
      h(Field.Label, () => "Remarks"),
      h(Field.Textarea as any, { autoresize: true, placeholder: "Type past one line…" }),
      h(Field.HelperText, () => "The field grows as you type"),
    ]),
};

/** A native select wears the same border-and-halo register. */
export const WithSelect = {
  render: () =>
    h(Field.Root, { defaultValue: "vue" } as any, () => [
      h(Field.Label, () => "Framework"),
      h(Field.Select as any, () => [
        h("option", { value: "react" }, "React"),
        h("option", { value: "vue" }, "Vue"),
        h("option", { value: "solid" }, "Solid"),
        h("option", { value: "svelte" }, "Svelte"),
      ]),
      h(Field.HelperText, () => "Pick the layer you build on"),
    ]),
};

/** The invalid pigment: the hairline turns cinnabar and the error text
 * surfaces beneath. */
export const Invalid = {
  render: () =>
    h(Field.Root, { invalid: true } as any, () => [
      h(Field.Label, () => "Username"),
      h(Field.Input as any, { defaultValue: "spaces are wrong" }),
      h(Field.HelperText, () => "Lowercase letters and dots only"),
      h(Field.ErrorText, () => "This field has an error"),
    ]),
};

/** The whole field rests: label, control, and helper all step back. */
export const Disabled = {
  render: () =>
    h(Field.Root, { disabled: true } as any, () => [
      h(Field.Label, () => "Serial number"),
      h(Field.Input as any, { defaultValue: "BS-0001" }),
      h(Field.HelperText, () => "Assigned by the registry"),
    ]),
};

/** The required mark rides the label as a small seal; the native
 * validation follows. */
export const Required = {
  render: () =>
    h(Field.Root, { required: true } as any, () => [
      h(Field.Label, () => ["Username", h(Field.RequiredIndicator)]),
      h(Field.Input as any),
      h(Field.HelperText, () => "Used to sign your work"),
    ]),
};

/** The value answers to the caller: the control only mirrors. */
export const Controlled = {
  render: () => {
    const Bound = defineComponent({
      name: "ControlledField",
      setup() {
        const state = reactive({ value: "" });
        return () =>
          h(Field.Root, null, () => [
            h(Field.Label, () => "Echo"),
            h(Field.Input as any, {
              value: state.value,
              onInput: (e: Event) => (state.value = (e.target as HTMLInputElement).value),
            }),
            h(Field.HelperText, () => state.value || "The field repeats what you type"),
          ]);
      },
    });
    return h("div", { style: column }, [h(Bound)]);
  },
};

/** Any control can wear the field: getContext hands out the aria wiring
 * for controls Ark does not ship. */
export const CustomControl = {
  render: () => {
    const Custom = defineComponent({
      name: "CustomControlField",
      setup() {
        return () =>
          h(Field.Root, { invalid: true } as any, () => [
            h(Field.Label, () => "Any control"),
            h(Field.Context, null, {
              default: (context: any) => h("input", { ...context.getInputProps() }),
            }),
            h(Field.HelperText, () => "Uses getInputProps() for maximum flexibility"),
            h(Field.ErrorText, () => "This field has an error"),
          ]);
      },
    });
    return h("div", { style: column }, [h(Custom)]);
  },
};
