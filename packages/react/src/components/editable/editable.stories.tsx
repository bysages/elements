import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Editable } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Editable" };
export default meta;

function icon(d: string) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pencil = icon("M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z");
const check = icon("M20 6 9 17l-5-5");
const cross = icon("M18 6 6 18M6 6l12 12");

/** The shared anatomy: preview as rest state, input on edit, triggers
 * swapping with the machine. */
function slate(rootProps: any, label: string, extras: React.ReactNode[] = []) {
  return (
    <Editable.Root {...rootProps}>
      <Editable.Label>{label}</Editable.Label>
      <Editable.Area>
        <Editable.Preview />
        <Editable.Input />
      </Editable.Area>
      {extras}
    </Editable.Root>
  );
}

/** Click the text to edit it — the preview becomes the field, and the
 * submit seal carries the ink. */
export const Basic = {
  args: {
    label: "Label",
    placeholder: "Enter text…",
  },
  render: (args: any) => (
    <Editable.Root placeholder={args.placeholder} defaultValue="Hello World">
      <Editable.Label>{args.label}</Editable.Label>
      <Editable.Area>
        <Editable.Preview />
        <Editable.Input />
      </Editable.Area>
      <Editable.Control>
        <Editable.EditTrigger aria-label="Edit">{pencil}</Editable.EditTrigger>
        <Editable.SubmitTrigger aria-label="Submit">{check}</Editable.SubmitTrigger>
        <Editable.CancelTrigger aria-label="Cancel">{cross}</Editable.CancelTrigger>
      </Editable.Control>
    </Editable.Root>
  ),
};

/** The triggers read the machine: pencil at rest, check and cross while
 * editing. */
export const Controls = {
  render: () => (
    <Editable.Root defaultValue="Click edit to start">
      <Editable.Context>
        {(editable: { editing: boolean }) => (
          <>
            <Editable.Label>Label</Editable.Label>
            <Editable.Area>
              <Editable.Preview />
              <Editable.Input />
            </Editable.Area>
            <Editable.Control>
              {editable.editing ? (
                <>
                  <Editable.SubmitTrigger key="submit" aria-label="Submit">
                    {check}
                  </Editable.SubmitTrigger>
                  <Editable.CancelTrigger key="cancel" aria-label="Cancel">
                    {cross}
                  </Editable.CancelTrigger>
                </>
              ) : (
                <Editable.EditTrigger key="edit" aria-label="Edit">
                  {pencil}
                </Editable.EditTrigger>
              )}
            </Editable.Control>
          </>
        )}
      </Editable.Context>
    </Editable.Root>
  ),
};

/** A double click opens the slate — a click merely rests on it. */
export const DoubleClick = {
  render: () =>
    slate({ defaultValue: "Double-click to edit", activationMode: "dblclick" } as any, "Label"),
};

/** Long text takes a taller slate: the input grows into a textarea. */
export const Textarea = {
  render: () => (
    <Editable.Root
      placeholder="Enter a description…"
      defaultValue="A headless component library for building reusable, scalable design systems across frameworks."
      activationMode="dblclick"
    >
      <Editable.Label>Description</Editable.Label>
      <Editable.Area>
        <Editable.Input asChild>
          <textarea rows={3} style={{ resize: "vertical", font: "inherit" }} />
        </Editable.Input>
        <Editable.Preview style={{ whiteSpace: "pre-wrap" }} />
      </Editable.Area>
      <div style={{ fontSize: "var(--bs-font-size-xs)", color: "var(--bs-color-text-tertiary)" }}>
        Press Cmd + Enter to save
      </div>
    </Editable.Root>
  ),
};

/** The value answers to the caller — the slate only mirrors. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("Hello World");
    return (
      <Editable.Root
        placeholder="Enter text…"
        value={value}
        onValueChange={(e: { value: string }) => setValue(e.value)}
      >
        <Editable.Label>Label</Editable.Label>
        <Editable.Area>
          <Editable.Preview />
          <Editable.Input />
        </Editable.Area>
        <Editable.Control>
          <Editable.EditTrigger aria-label="Edit">{pencil}</Editable.EditTrigger>
        </Editable.Control>
      </Editable.Root>
    );
  },
};

/** An editable inside a field: helper and error text ride along. */
export const WithField = {
  render: () => (
    <Field.Root>
      {slate({ placeholder: "Enter your bio" }, "Bio")}
      <Field.HelperText>Click to edit your bio.</Field.HelperText>
      <Field.ErrorText>Bio is required.</Field.ErrorText>
    </Field.Root>
  ),
};
