import type { Meta } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

import { Form, FormField } from ".";
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

function textField(field: any, placeholder?: string) {
  return (
    <Input
      value={field.state.value}
      placeholder={placeholder}
      onValueChange={field.handleChange}
      onBlur={field.handleBlur}
    />
  );
}

/** The schema path: any Standard Schema (zod here) describes the shape;
 * the engine validates as the reader types and the errors land on the
 * field whose name matches the issue path. */
export const Basic = {
  render: () => {
    const [status, setStatus] = useState("");
    const form = useForm({
      defaultValues: { title: "", abstract: "" },
      validators: {
        onChange: z.object({
          title: z.string().min(1, "The title is required."),
          abstract: z.string().min(8, "Write at least 8 characters."),
        }),
      },
      onSubmit: () => setStatus("Submitted."),
    });
    return (
      <>
        <Form form={form}>
          <FormField name="title" label="Title" hint="One line, no period" required>
            {(field: any) => textField(field, "Title of the piece")}
          </FormField>
          <FormField name="abstract" label="Abstract">
            {(field: any) => (
              <Textarea
                value={field.state.value}
                rows={3}
                onValueChange={field.handleChange}
                onBlur={field.handleBlur}
              />
            )}
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

/** Per-field validators as plain functions — the checks a schema can't
 * express, living right on the field they belong to. */
export const CustomValidation = {
  render: () => {
    const [status, setStatus] = useState("");
    const form = useForm({
      defaultValues: { email: "", abstract: "" },
      onSubmit: () => setStatus("Submitted."),
    });
    return (
      <>
        <Form form={form}>
          <FormField
            name="email"
            label="Email address"
            hint="We only write about your orders."
            validators={{
              onChange: ({ value }: { value: string }) =>
                value.includes("@") ? undefined : "Enter a valid email address.",
            }}
          >
            {(field: any) => textField(field)}
          </FormField>
          <FormField
            name="abstract"
            label="Abstract"
            validators={{
              onChange: ({ value }: { value: string }) =>
                value.length >= 20 ? undefined : "Write at least 20 characters.",
            }}
          >
            {(field: any) => (
              <Textarea
                value={field.state.value}
                rows={3}
                onValueChange={field.handleChange}
                onBlur={field.handleBlur}
              />
            )}
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
 * its own binding; the engine keeps one error map. */
export const WithInputs = {
  render: () => {
    const [status, setStatus] = useState("");
    const form = useForm({
      defaultValues: {
        title: "",
        summary: "",
        topics: [] as string[],
        consent: false,
      },
      validators: {
        onChange: z.object({
          title: z.string().min(1, "The title is required."),
          summary: z.string().min(8, "Write at least 8 characters."),
          topics: z.array(z.string()).min(1, "Pick at least one topic."),
          consent: z.boolean().refine((v) => v, "Please accept the terms."),
        }),
      },
      onSubmit: () => setStatus("Submitted."),
    });
    return (
      <>
        <Form form={form}>
          <FormField name="title" label="Title" required>
            {(field: any) => textField(field, "Title of the piece")}
          </FormField>
          <FormField name="summary" label="Summary" hint="A few sentences">
            {(field: any) => (
              <Textarea
                value={field.state.value}
                rows={3}
                onValueChange={field.handleChange}
                onBlur={field.handleBlur}
              />
            )}
          </FormField>
          <FormField name="topics" label="Topics" required>
            {(field: any) => (
              <CheckboxGroup
                value={field.state.value}
                options={[
                  { label: "Typography", value: "typography" },
                  { label: "Lighting", value: "lighting" },
                  { label: "Motion", value: "motion" },
                ]}
                onValueChange={field.handleChange}
                onBlur={field.handleBlur}
              />
            )}
          </FormField>
          <FormField name="consent">
            {(field: any) => (
              <Switch.Root
                checked={field.state.value}
                onCheckedChange={(details) => field.handleChange(details.checked)}
                onBlur={field.handleBlur}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>I accept the terms</Switch.Label>
                <Switch.HiddenInput />
              </Switch.Root>
            )}
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

/** Live validation: the engine re-checks as the reader types. */
export const LiveValidation = {
  render: () => {
    const form = useForm({
      defaultValues: { handle: "" },
    });
    return (
      <Form form={form}>
        <FormField
          name="handle"
          label="Handle"
          hint="Lowercase letters and dashes."
          validators={{
            onChange: ({ value }: { value: string }) =>
              /^[a-z-]+$/.test(value) ? undefined : "Lowercase letters and dashes only.",
          }}
        >
          {(field: any) => textField(field)}
        </FormField>
      </Form>
    );
  },
};

/** The engine is a live object: errors can be set from outside — say,
 * from a server response — and cleared again. */
export const Imperative = {
  render: () => {
    const [status, setStatus] = useState("");
    const form = useForm({
      defaultValues: { code: "" },
    });
    return (
      <>
        <Form form={form}>
          <FormField name="code" label="Redemption code">
            {(field: any) => textField(field)}
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
              form.setFieldMeta("code", (prev) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  onChange: { message: "This code was already used." },
                },
              }))
            }
          >
            Simulate server error
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              form.setFieldMeta("code", (prev) => ({ ...prev, errorMap: {} }));
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
