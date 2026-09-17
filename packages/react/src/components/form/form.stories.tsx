import type { Meta } from "@storybook/react-vite";
import { useRef, useState } from "react";

import { Form, FormField, type FormHandle, type StandardSchema } from ".";
import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";

const meta: Meta = { title: "Components/Forms/Form" };
export default meta;

const statusStyle = {
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
} as const;

/** The validate function: submit runs it first; errors land on the
 * FormField whose name matches. */
export const Basic = {
  render: () => {
    const [state, setState] = useState({ email: "", abstract: "" });
    const [status, setStatus] = useState("");
    return (
      <>
        <Form
          state={state}
          validate={(value) => {
            const errors = [] as { name: string; message: string }[];
            if (!String(value.email).includes("@"))
              errors.push({ name: "email", message: "Enter a valid email address." });
            if (String(value.abstract).length < 20)
              errors.push({ name: "abstract", message: "Write at least 20 characters." });
            return errors;
          }}
          onSubmit={() => setStatus("Submitted.")}
          onError={() => setStatus("Fix the errors below.")}
        >
          <FormField name="email" label="Email address" hint="We only write about your orders.">
            <Input
              value={state.email}
              onValueChange={(email) => setState((s) => ({ ...s, email }))}
            />
          </FormField>
          <FormField name="abstract" label="Abstract">
            <Textarea
              rows={3}
              value={state.abstract}
              onValueChange={(abstract) => setState((s) => ({ ...s, abstract }))}
            />
          </FormField>
          <Button type="submit">Submit</Button>
        </Form>
        <p role="status" style={statusStyle}>
          {status}
        </p>
      </>
    );
  },
};

/** The Standard Schema shape: this story fakes the slice of the spec the
 * Form reads — the same object a valibot or zod schema passes as. */
export const StandardSchemaShape = {
  render: () => {
    const [state, setState] = useState({ title: "", year: "" });
    const [status, setStatus] = useState("");
    const schema: StandardSchema = {
      "~standard": {
        validate: (value: unknown) => {
          const issues = [] as { message: string; path: string[] }[];
          const record = value as Record<string, string>;
          if (!record.title) issues.push({ message: "The title is required.", path: ["title"] });
          if (!/^\d{4}$/.test(record.year ?? ""))
            issues.push({ message: "Year must be four digits.", path: ["year"] });
          return issues.length ? { issues } : { value };
        },
      },
    };
    return (
      <>
        <Form
          state={state}
          schema={schema}
          onSubmit={() => setStatus("Submitted.")}
          onError={(errors) => setStatus(`${errors.length} error(s).`)}
        >
          <FormField name="title" label="Title" required>
            <Input
              value={state.title}
              onValueChange={(title) => setState((s) => ({ ...s, title }))}
            />
          </FormField>
          <FormField name="year" label="Year">
            <Input value={state.year} onValueChange={(year) => setState((s) => ({ ...s, year }))} />
          </FormField>
          <Button type="submit">Submit</Button>
        </Form>
        <p role="status" style={statusStyle}>
          {status}
        </p>
      </>
    );
  },
};

/** Live re-validation: the form listens to input, change and blur off
 * its own element and re-runs the checks as the reader moves. */
export const LiveValidation = {
  render: () => {
    const [state, setState] = useState({ handle: "" });
    return (
      <Form
        state={state}
        validate={(value) =>
          /^[a-z-]+$/.test(String(value.handle))
            ? []
            : [{ name: "handle", message: "Lowercase letters and dashes only." }]
        }
      >
        <FormField name="handle" label="Handle" hint="Lowercase letters and dashes.">
          <Input
            value={state.handle}
            onValueChange={(handle) => setState((s) => ({ ...s, handle }))}
          />
        </FormField>
      </Form>
    );
  },
};

/** The imperative handle: errors can be set from outside — say, from a
 * server response — and cleared again. */
export const Imperative = {
  render: () => {
    const [state, setState] = useState({ code: "" });
    const [status, setStatus] = useState("");
    const formRef = useRef<FormHandle>(null);
    return (
      <>
        <Form ref={formRef} state={state}>
          <FormField name="code" label="Redemption code">
            <Input value={state.code} onValueChange={(code) => setState((s) => ({ ...s, code }))} />
          </FormField>
        </Form>
        <div
          style={{
            display: "flex",
            gap: "var(--bs-space-3)",
            marginBlockStart: "var(--bs-space-4)",
          }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              formRef.current?.setErrors([{ name: "code", message: "This code was already used." }])
            }
          >
            Simulate server error
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              formRef.current?.clear();
              setStatus("");
            }}
          >
            Clear
          </Button>
        </div>
        <p role="status" style={statusStyle}>
          {status}
        </p>
      </>
    );
  },
};
