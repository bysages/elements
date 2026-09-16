import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Form } from ".";
import { Button } from "../button";
import { FormField } from "../form";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Form" };
export default meta;
type Story = StoryObj<typeof Form>;

function submitButton(label = "Submit") {
  return h(Button as never, { type: "submit" }, () => label);
}

function statusLine(text: Ref<string>) {
  return h(
    "p",
    {
      role: "status",
      style: "font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);",
    },
    () => text.value,
  );
}

/** The validate function: submit runs it first; errors land on the
 * FormField whose name matches. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const state = ref({ email: "", abstract: "" });
      const status = ref("");
      return () => [
        h(
          Form as never,
          {
            state: state.value,
            validate: (value: Record<string, unknown>) => {
              const errors = [] as { name: string; message: string }[];
              if (!String(value.email).includes("@"))
                errors.push({ name: "email", message: "Enter a valid email address." });
              if (String(value.abstract).length < 20)
                errors.push({ name: "abstract", message: "Write at least 20 characters." });
              return errors;
            },
            onSubmit: () => (status.value = "Submitted."),
            onError: () => (status.value = "Fix the errors below."),
          },
          () => [
            h(
              FormField,
              { name: "email", label: "Email address", hint: "We only write about your orders." },
              () =>
                h(Input, {
                  modelValue: state.value.email,
                  "onUpdate:modelValue": (v: string) => (state.value.email = v),
                }),
            ),
            h(FormField, { name: "abstract", label: "Abstract" }, () =>
              h(Textarea, {
                rows: 3,
                modelValue: state.value.abstract,
                "onUpdate:modelValue": (v: string) => (state.value.abstract = v),
              }),
            ),
            submitButton(),
          ],
        ),
        statusLine(status),
      ];
    }),
};

/** The Standard Schema shape: this story fakes the slice of the spec the
 * Form reads — the same object a valibot or zod schema passes as. */
export const StandardSchemaShape: Story = {
  render: () =>
    withState(() => {
      const state = ref({ title: "", year: "" });
      const status = ref("");
      const schema = {
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
      return () => [
        h(
          Form as never,
          {
            state: state.value,
            schema,
            onSubmit: () => (status.value = "Submitted."),
            onError: (errors: unknown) => (status.value = `${(errors as []).length} error(s).`),
          },
          () => [
            h(FormField, { name: "title", label: "Title", required: true }, () =>
              h(Input, {
                modelValue: state.value.title,
                "onUpdate:modelValue": (v: string) => (state.value.title = v),
              }),
            ),
            h(FormField, { name: "year", label: "Year" }, () =>
              h(Input, {
                modelValue: state.value.year,
                "onUpdate:modelValue": (v: string) => (state.value.year = v),
              }),
            ),
            submitButton(),
          ],
        ),
        statusLine(status),
      ];
    }),
};

/** Live re-validation: the form listens to input, change and blur off
 * its own element and re-runs the checks as the reader moves. */
export const LiveValidation: Story = {
  render: () =>
    withState(() => {
      const state = ref({ handle: "" });
      return () =>
        h(
          Form as never,
          {
            state: state.value,
            validate: (value: Record<string, unknown>) =>
              /^[a-z-]+$/.test(String(value.handle))
                ? []
                : [{ name: "handle", message: "Lowercase letters and dashes only." }],
          },
          () => [
            h(
              FormField,
              { name: "handle", label: "Handle", hint: "Lowercase letters and dashes." },
              () =>
                h(Input, {
                  modelValue: state.value.handle,
                  "onUpdate:modelValue": (v: string) => (state.value.handle = v),
                }),
            ),
          ],
        );
    }),
};

/** The imperative handle: errors can be set from outside — say, from a
 * server response — and cleared again. */
export const Imperative: Story = {
  render: () =>
    withState(() => {
      const state = ref({ code: "" });
      const status = ref("");
      let formRef: {
        setErrors: (e: { name: string; message: string }[]) => void;
        clear: () => void;
      } | null = null;
      const bind = (instance: unknown) => {
        if (instance) formRef = instance as typeof formRef;
      };
      return () => [
        h(Form as never, { ref: bind, state: state.value }, () => [
          h(FormField, { name: "code", label: "Redemption code" }, () =>
            h(Input, {
              modelValue: state.value.code,
              "onUpdate:modelValue": (v: string) => (state.value.code = v),
            }),
          ),
        ]),
        h(
          "div",
          {
            style: "display: flex; gap: var(--bs-space-3); margin-block-start: var(--bs-space-4);",
          },
          [
            h(
              Button as never,
              {
                variant: "outline",
                size: "sm",
                onClick: () =>
                  formRef?.setErrors([{ name: "code", message: "This code was already used." }]),
              },
              () => "Simulate server error",
            ),
            h(
              Button as never,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => (formRef?.clear(), (status.value = "")),
              },
              () => "Clear",
            ),
          ],
        ),
        statusLine(status),
      ];
    }),
};
