import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref, type Ref } from "vue";
import { z } from "zod";

import { Form } from ".";
import { Button } from "../button";
import { CheckboxGroup } from "../checkbox-group";
import { FormField } from "../form";
import { Input } from "../input";
import { Switch } from "../switch";
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

function switchControl() {
  return h(Switch.Control, () => h(Switch.Thumb));
}

/** The schema path: any Standard Schema (zod here) describes the shape;
 * submit validates against it and errors land on the FormField whose
 * name matches the issue path. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const schema = z.object({
        title: z.string().min(1, "The title is required."),
        abstract: z.string().min(8, "Write at least 8 characters."),
      });
      const state = ref<z.infer<typeof schema>>({ title: "", abstract: "" });
      const status = ref("");
      return () => [
        h(
          Form as never,
          {
            state: state.value,
            schema,
            onSubmit: () => (status.value = "Submitted."),
            onError: (errors: unknown) =>
              (status.value = `${(errors as unknown[]).length} error(s).`),
          },
          () => [
            h(
              FormField,
              { name: "title", label: "Title", hint: "One line, no period", required: true },
              () =>
                h(Input, {
                  modelValue: state.value.title,
                  "onUpdate:modelValue": (v: string) => (state.value.title = v),
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

/** The validate function: submit runs it first; errors land on the
 * FormField whose name matches. Composes with a schema when one is
 * present for the checks a schema can't express. */
export const CustomValidation: Story = {
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

/** One schema over every input register: text, prose, a checkbox group
 * bound to an array, and a switch bound to a boolean. Each field keeps
 * its own binding; the form keeps one error map. */
export const WithInputs: Story = {
  render: () =>
    withState(() => {
      const schema = z.object({
        title: z.string().min(1, "The title is required."),
        summary: z.string().min(8, "Write at least 8 characters."),
        topics: z.array(z.string()).min(1, "Pick at least one topic."),
        consent: z.boolean().refine((v) => v, "Please accept the terms."),
      });
      const state = ref<z.infer<typeof schema>>({
        title: "",
        summary: "",
        topics: [],
        consent: false,
      });
      const status = ref("");
      return () => [
        h(
          Form as never,
          {
            state: state.value,
            schema,
            onSubmit: () => (status.value = "Submitted."),
            onError: (errors: unknown) =>
              (status.value = `${(errors as unknown[]).length} error(s).`),
          },
          () => [
            h(FormField, { name: "title", label: "Title", required: true }, () =>
              h(Input, {
                modelValue: state.value.title,
                "onUpdate:modelValue": (v: string) => (state.value.title = v),
              }),
            ),
            h(FormField, { name: "summary", label: "Summary" }, () =>
              h(Textarea, {
                rows: 2,
                modelValue: state.value.summary,
                "onUpdate:modelValue": (v: string) => (state.value.summary = v),
              }),
            ),
            h(FormField, { name: "topics", label: "Topics", required: true }, () =>
              h(CheckboxGroup as never, {
                modelValue: state.value.topics,
                "onUpdate:modelValue": (v: string[]) => (state.value.topics = v),
                options: [
                  { label: "Typography", value: "typography" },
                  { label: "Lighting", value: "lighting" },
                  { label: "Motion", value: "motion" },
                ],
              }),
            ),
            h(FormField, { name: "consent" }, () =>
              h(
                Switch.Root as never,
                {
                  checked: state.value.consent,
                  onCheckedChange: (e: { checked: boolean }) => (state.value.consent = e.checked),
                },
                () => [
                  switchControl(),
                  h(Switch.Label, () => "I accept the terms"),
                  h(Switch.HiddenInput),
                ],
              ),
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
