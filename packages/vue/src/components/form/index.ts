import { Field as ArkField } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core";
import { useForm, useField } from "@tanstack/vue-form";
import { defineComponent, h, inject, provide, type Component, type PropType } from "vue";

import { withSelfRoot } from "../../internal/family";

export { useForm, useField };
export type { VueFormApi } from "@tanstack/vue-form";
export type { FormApi, FieldApi } from "@tanstack/form-core";

/** The seam this family passes the engine through — the members the
 * components drive, with the engine's field-name generics opened to
 * `any`. The engine ships no "any form" alias: its loosest, `FormLikeAPI`,
 * still pins names to `string`, which a concrete form's literal names
 * cannot satisfy. */
interface AnyFormApi {
  handleSubmit(): Promise<unknown>;
  setFieldMeta(field: any, updater: (prev: any) => any): void;
  Field: Component;
}
const FORM_KEY = Symbol("bysages-form");

/** A validator's complaint is a string or a Standard Schema issue; both
 * reduce to the sentence the field shows. */
function errorText(error: unknown): string {
  if (error == null) return "";
  if (typeof error === "string") return error;
  if (typeof error === "object" && "message" in error)
    return String((error as { message: unknown }).message);
  return "";
}

/** The form element itself: native submit interception handing the event
 * to the engine, one grid, one spacing voice. */
export const Form = withSelfRoot(
  defineComponent({
    name: "Form",
    props: {
      /** The engine instance from `useForm` — values, validation and
       * submit all live there. Optional: a form assembled without an
       * engine (the generative vessel) degrades to layout and native
       * semantics. */
      form: { type: Object as PropType<AnyFormApi>, required: false, default: undefined },
    },
    setup(props, { attrs, slots }) {
      injectComponentStyle("form");
      injectComponentStyle("field");

      provide(FORM_KEY, props.form);
      return () =>
        h(
          "form",
          {
            ...attrs,
            "data-scope": "form",
            "data-part": "root",
            novalidate: true,
            onSubmit: (event: Event) => {
              event.preventDefault();
              void props.form?.handleSubmit();
            },
          },
          slots.default?.(),
        );
    },
  }),
);

/**
 * The named slot in the grid: label, control, hint — and the engine's
 * errors for this name, shown through the same parts the standalone
 * Field family styles. The default slot receives the engine's live
 * field (value, handleChange, handleBlur, full state), so every
 * capability it has is right there where the control is wired.
 */
export const FormField = withSelfRoot(
  defineComponent({
    name: "FormField",
    props: {
      /** Overrides the enclosing Form's engine — for a field assembled
       * on its own. */
      form: { type: Object as PropType<AnyFormApi>, default: undefined },
      /** The engine's key for this slot's value and errors. */
      name: { type: String, required: true },
      /** The heading above the control. */
      label: { type: String, default: undefined },
      /** The quiet line under the control, shown while there is no
       * error. */
      hint: { type: String, default: undefined },
      /** Marks the label with the required ornament. */
      required: { type: Boolean, default: false },
      /** Forces the invalid dress, outside any engine's verdict. */
      invalid: { type: Boolean, default: false },
      /** Mutes the slot. */
      disabled: { type: Boolean, default: false },
    },
    setup(props, { attrs, slots }) {
      const injected = inject<AnyFormApi | null>(FORM_KEY, null);
      return () => {
        const form = props.form ?? injected;
        // Layout lands on the wrapper, engine options (validators, mode)
        // ride to the field itself.
        const { class: klass, style, ...fieldOptions } = attrs;
        // Inside a Form the field rides the engine: its slot receives the
        // live field, and the engine's errors for this name surface here.
        // Outside one the field degrades to plain assembly — label, hint,
        // whatever the caller passes as invalid.
        const assemble = (field: any) => {
          // Untouched fields only speak on a submit attempt — the schema's
          // complaints about fields the reader never visited stay quiet.
          const meta = field?.state.meta;
          const surfaced = !meta
            ? []
            : meta.isTouched
              ? (meta.errors ?? [])
              : [meta.errorMap?.onSubmit].flat().filter(Boolean);
          const errors = surfaced.map(errorText).filter(Boolean);
          const invalid = props.invalid || errors.length > 0;
          return h("div", { class: klass, style, "data-form-field": props.name }, [
            h(
              ArkField.Root,
              {
                invalid,
                required: props.required,
                disabled: props.disabled,
              },
              () => [
                props.label ? h(ArkField.Label, () => props.label) : null,
                slots.default?.(field ? { field } : undefined),
                props.hint && errors.length === 0 ? h(ArkField.HelperText, () => props.hint) : null,
                errors.length > 0 ? h(ArkField.ErrorText, () => errors[0]) : null,
              ],
            ),
          ]);
        };
        if (!form) return assemble(undefined);
        return h(
          form.Field,
          { ...fieldOptions, name: props.name },
          { default: (slot: { field: any }) => assemble(slot.field) },
        );
      };
    },
  }),
);

// The fields inside are the field family's own recipe — the form
// stylesheet only lays the grid and routes the errors.
