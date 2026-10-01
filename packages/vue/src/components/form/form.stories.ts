import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useForm } from "@tanstack/vue-form";
import { h, ref, type Ref } from "vue";
import { z } from "zod";

import { Form, FormField } from ".";
import { Button } from "../button";
import { CheckboxGroup } from "../checkbox-group";
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

/** A text field wired to the engine: the slot hands over the field
 * (value, handleChange, handleBlur), the errors surface on the field
 * whose name they belong to. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const status = ref("");
      const form = useForm({
        defaultValues: { title: "", abstract: "" },
        validators: {
          onChange: z.object({
            title: z.string().min(1, "The title is required."),
            abstract: z.string().min(8, "Write at least 8 characters."),
          }),
        },
        onSubmit: () => {
          status.value = "Submitted.";
        },
      });
      const bind =
        (name: "title" | "abstract") =>
        ({ field }: any) =>
          h(name === "title" ? Input : (Textarea as never), {
            ...(name === "title" ? { placeholder: "Title of the piece" } : { rows: 3 }),
            modelValue: field.state.value,
            "onUpdate:modelValue": field.handleChange,
            onBlur: field.handleBlur,
          });
      return () => [
        h(Form as never, { form }, () => [
          h(
            FormField as never,
            { name: "title", label: "Title", hint: "One line, no period", required: true },
            bind("title"),
          ),
          h(FormField as never, { name: "abstract", label: "Abstract" }, bind("abstract")),
          submitButton(),
        ]),
        statusLine(status),
      ];
    }),
};

/** Per-field validators as plain functions — the checks a schema can't
 * express, living right on the field they belong to. */
export const CustomValidation: Story = {
  render: () =>
    withState(() => {
      const status = ref("");
      const form = useForm({
        defaultValues: { email: "", abstract: "" },
        onSubmit: () => {
          status.value = "Submitted.";
        },
      });
      return () => [
        h(Form as never, { form }, () => [
          h(
            FormField as never,
            {
              name: "email",
              label: "Email address",
              hint: "We only write about your orders.",
              validators: {
                onChange: ({ value }: { value: string }) =>
                  value.includes("@") ? undefined : "Enter a valid email address.",
              },
            },
            ({ field }: any) =>
              h(Input, {
                modelValue: field.state.value,
                "onUpdate:modelValue": field.handleChange,
                onBlur: field.handleBlur,
              }),
          ),
          h(
            FormField as never,
            {
              name: "abstract",
              label: "Abstract",
              validators: {
                onChange: ({ value }: { value: string }) =>
                  value.length >= 20 ? undefined : "Write at least 20 characters.",
              },
            },
            ({ field }: any) =>
              h(Textarea, {
                rows: 3,
                modelValue: field.state.value,
                "onUpdate:modelValue": field.handleChange,
                onBlur: field.handleBlur,
              }),
          ),
          submitButton(),
        ]),
        statusLine(status),
      ];
    }),
};

/** One schema over every input register: text, prose, a checkbox group
 * bound to an array, and a switch bound to a boolean. Each field keeps
 * its own binding; the engine keeps one error map. */
export const WithInputs: Story = {
  render: () =>
    withState(() => {
      const status = ref("");
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
        onSubmit: () => {
          status.value = "Submitted.";
        },
      });
      return () => [
        h(Form as never, { form }, () => [
          h(
            FormField as never,
            { name: "title", label: "Title", required: true },
            ({ field }: any) =>
              h(Input, {
                modelValue: field.state.value,
                "onUpdate:modelValue": field.handleChange,
                onBlur: field.handleBlur,
              }),
          ),
          h(
            FormField as never,
            { name: "summary", label: "Summary", hint: "A few sentences" },
            ({ field }: any) =>
              h(Textarea, {
                rows: 3,
                modelValue: field.state.value,
                "onUpdate:modelValue": field.handleChange,
                onBlur: field.handleBlur,
              }),
          ),
          h(
            FormField as never,
            { name: "topics", label: "Topics", required: true },
            ({ field }: any) =>
              h(CheckboxGroup as never, {
                modelValue: field.state.value,
                "onUpdate:modelValue": field.handleChange,
                onBlur: field.handleBlur,
                options: [
                  { label: "Typography", value: "typography" },
                  { label: "Lighting", value: "lighting" },
                  { label: "Motion", value: "motion" },
                ],
              }),
          ),
          h(FormField as never, { name: "consent" }, ({ field }: any) =>
            h(
              Switch.Root as never,
              {
                checked: field.state.value,
                "onUpdate:checked": field.handleChange,
                onBlur: field.handleBlur,
              },
              () => [
                switchControl(),
                h(Switch.Label, () => "I accept the terms"),
                h(Switch.HiddenInput),
              ],
            ),
          ),
          submitButton(),
        ]),
        statusLine(status),
      ];
    }),
};

/** Live validation: the engine re-checks as the reader types — the same
 * three events the field recipe has always answered. */
export const LiveValidation: Story = {
  render: () =>
    withState(() => {
      const form = useForm({
        defaultValues: { handle: "" },
      });
      return () =>
        h(Form as never, { form }, () => [
          h(
            FormField as never,
            {
              name: "handle",
              label: "Handle",
              hint: "Lowercase letters and dashes.",
              validators: {
                onChange: ({ value }: { value: string }) =>
                  /^[a-z-]+$/.test(value) ? undefined : "Lowercase letters and dashes only.",
              },
            },
            ({ field }: any) =>
              h(Input, {
                modelValue: field.state.value,
                "onUpdate:modelValue": field.handleChange,
                onBlur: field.handleBlur,
              }),
          ),
        ]);
    }),
};

/** The engine is a live object: errors can be set from outside — say,
 * from a server response — and cleared again. */
export const Imperative: Story = {
  render: () =>
    withState(() => {
      const status = ref("");
      const form = useForm({
        defaultValues: { code: "" },
      });
      return () => [
        h(Form as never, { form }, () => [
          h(FormField as never, { name: "code", label: "Redemption code" }, ({ field }: any) =>
            h(Input, {
              modelValue: field.state.value,
              "onUpdate:modelValue": field.handleChange,
              onBlur: field.handleBlur,
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
                  form.setFieldMeta("code", (prev: any) => ({
                    ...prev,
                    errorMap: {
                      ...prev.errorMap,
                      onChange: { message: "This code was already used." },
                    },
                  })),
              },
              () => "Simulate server error",
            ),
            h(
              Button as never,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  form.setFieldMeta("code", (prev: any) => ({
                    ...prev,
                    errorMap: {},
                  }));
                  status.value = "";
                },
              },
              () => "Clear",
            ),
          ],
        ),
        statusLine(status),
      ];
    }),
};
