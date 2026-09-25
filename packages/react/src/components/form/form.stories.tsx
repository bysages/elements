import type { Meta } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { z } from "zod";

import { Form, FormField, type FormHandle } from ".";
import { Button } from "../button";
import { CheckboxGroup } from "../checkbox-group";
import { Input } from "../input";
import { Switch } from "../switch";
import { Textarea } from "../textarea";

const meta: Meta = { title: "Components/Forms/Form" };
export default meta;

const statusStyle = {
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
} as const;

/** The schema path: any Standard Schema (zod here) describes the shape;
 * submit validates against it and errors land on the FormField whose
 * name matches the issue path. */
export const Basic = {
  render: () => {
    const schema = z.object({
      title: z.string().min(1, "The title is required."),
      abstract: z.string().min(8, "Write at least 8 characters."),
    });
    const [state, setState] = useState<z.infer<typeof schema>>({ title: "", abstract: "" });
    const [status, setStatus] = useState("");
    return (
      <>
        <Form
          state={state}
          schema={schema}
          onSubmit={() => setStatus("Submitted.")}
          onError={(errors) => setStatus(`${errors.length} error(s).`)}
        >
          <FormField name="title" label="Title" hint="One line, no period" required>
            <Input
              value={state.title}
              onValueChange={(title) => setState((s) => ({ ...s, title }))}
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

/** The validate function: submit runs it first; errors land on the
 * FormField whose name matches. Composes with a schema when one is
 * present for the checks a schema can't express. */
export const CustomValidation = {
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

/** One schema over every input register: text, prose, a checkbox group
 * bound to an array, and a switch bound to a boolean. Each field keeps
 * its own binding; the form keeps one error map. */
export const WithInputs = {
  render: () => {
    const schema = z.object({
      title: z.string().min(1, "The title is required."),
      summary: z.string().min(8, "Write at least 8 characters."),
      topics: z.array(z.string()).min(1, "Pick at least one topic."),
      consent: z.boolean().refine((v) => v, "Please accept the terms."),
    });
    const [state, setState] = useState<z.infer<typeof schema>>({
      title: "",
      summary: "",
      topics: [],
      consent: false,
    });
    const [status, setStatus] = useState("");
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
          <FormField name="summary" label="Summary">
            <Textarea
              rows={2}
              value={state.summary}
              onValueChange={(summary) => setState((s) => ({ ...s, summary }))}
            />
          </FormField>
          <FormField name="topics" label="Topics" required>
            <CheckboxGroup
              value={state.topics}
              onValueChange={(topics) => setState((s) => ({ ...s, topics }))}
              options={[
                { label: "Typography", value: "typography" },
                { label: "Lighting", value: "lighting" },
                { label: "Motion", value: "motion" },
              ]}
            />
          </FormField>
          <FormField name="consent">
            <Switch.Root
              checked={state.consent}
              onCheckedChange={(e) => setState((s) => ({ ...s, consent: e.checked }))}
            >
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Label>I accept the terms</Switch.Label>
              <Switch.HiddenInput />
            </Switch.Root>
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
