import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Field } from ".";

const meta: Meta = { title: "Components/Forms/Field" };
export default meta;

const column = { display: "grid", gap: "1.5rem", maxWidth: "20rem" };

/** Label, control, help, error — the whole field column in its resting
 * register. */
export const Basic = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Some additional info",
    errorText: "Error info",
    disabled: false,
    required: false,
  },
  render: (args: any) => (
    <Field.Root disabled={args.disabled} required={args.required}>
      <Field.Label>{args.label}</Field.Label>
      <Field.Input placeholder={args.placeholder} />
      <Field.HelperText>{args.helperText}</Field.HelperText>
      <Field.ErrorText>{args.errorText}</Field.ErrorText>
    </Field.Root>
  ),
};

/** A multiline field: the paper gives as many rows as the thought needs. */
export const Textarea = {
  render: () => (
    <div style={column}>
      <Field.Root>
        <Field.Label>Notes</Field.Label>
        <Field.Textarea placeholder="Placeholder" rows={4} />
        <Field.HelperText>Some additional info</Field.HelperText>
      </Field.Root>
    </div>
  ),
};

/** The textarea grows with its content — autoresize keeps the whole
 * thought on the paper. */
export const TextareaAutoresize = {
  render: () => (
    <Field.Root>
      <Field.Label>Remarks</Field.Label>
      <Field.Textarea autoresize placeholder="Type past one line…" />
      <Field.HelperText>The field grows as you type</Field.HelperText>
    </Field.Root>
  ),
};

/** A native select wears the same border-and-halo register. */
export const WithSelect = {
  render: () => (
    <Field.Root defaultValue="vue">
      <Field.Label>Framework</Field.Label>
      <Field.Select>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="solid">Solid</option>
        <option value="svelte">Svelte</option>
      </Field.Select>
      <Field.HelperText>Pick the layer you build on</Field.HelperText>
    </Field.Root>
  ),
};

/** The invalid pigment: the hairline turns cinnabar and the error text
 * surfaces beneath. */
export const Invalid = {
  render: () => (
    <Field.Root invalid>
      <Field.Label>Username</Field.Label>
      <Field.Input defaultValue="spaces are wrong" />
      <Field.HelperText>Lowercase letters and dots only</Field.HelperText>
      <Field.ErrorText>This field has an error</Field.ErrorText>
    </Field.Root>
  ),
};

/** The whole field rests: label, control, and helper all step back. */
export const Disabled = {
  render: () => (
    <Field.Root disabled>
      <Field.Label>Serial number</Field.Label>
      <Field.Input defaultValue="BS-0001" />
      <Field.HelperText>Assigned by the registry</Field.HelperText>
    </Field.Root>
  ),
};

/** The required mark rides the label as a small seal; the native
 * validation follows. */
export const Required = {
  render: () => (
    <Field.Root required>
      <Field.Label>
        Username <Field.RequiredIndicator />
      </Field.Label>
      <Field.Input />
      <Field.HelperText>Used to sign your work</Field.HelperText>
    </Field.Root>
  ),
};

/** The value answers to the caller: the control only mirrors. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={column}>
        <Field.Root>
          <Field.Label>Echo</Field.Label>
          <Field.Input
            value={value}
            onChange={(e) => setValue((e.target as HTMLInputElement).value)}
          />
          <Field.HelperText>{value || "The field repeats what you type"}</Field.HelperText>
        </Field.Root>
      </div>
    );
  },
};

/** Any control can wear the field: getContext hands out the aria wiring
 * for controls Ark does not ship. */
export const CustomControl = {
  render: () => (
    <div style={column}>
      <Field.Root invalid>
        <Field.Label>Any control</Field.Label>
        <Field.Context>{(context: any) => <input {...context.getInputProps()} />}</Field.Context>
        <Field.HelperText>Uses getInputProps() for maximum flexibility</Field.HelperText>
        <Field.ErrorText>This field has an error</Field.ErrorText>
      </Field.Root>
    </div>
  ),
};

/** The floating-label variant: `data-float` opts the field in and the
 * label rides inside the control until the reader types. The space
 * placeholder keeps :placeholder-shown honest, so the empty field holds
 * its label down and the prefilled one keeps it afloat. */
export const FloatingLabel = {
  render: () => (
    <div style={column}>
      <Field.Root data-float="">
        <Field.Label>Cardholder name</Field.Label>
        <Field.Input placeholder=" " />
        <Field.HelperText>The label rides the field until the reader types.</Field.HelperText>
      </Field.Root>
      <Field.Root data-float="">
        <Field.Label>Serial number</Field.Label>
        <Field.Input placeholder=" " defaultValue="BS-0001" />
        <Field.HelperText>A filled field keeps its label afloat.</Field.HelperText>
      </Field.Root>
    </div>
  ),
};
