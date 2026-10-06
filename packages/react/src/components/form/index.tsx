import { Field as ArkField } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";
import { type ComponentType, createContext, useContext } from "react";

import { withSelfRoot } from "../../internal/family";

export type { FieldApi, FormApi } from "@tanstack/form-core";
export { useField, useForm } from "@tanstack/react-form";

/** The seam this family passes the engine through — the members the
 * components drive, with the engine's field-name generics opened to
 * `any`. The engine ships no "any form" alias: its loosest, `FormLikeAPI`,
 * still pins names to `string`, which a concrete form's literal names
 * cannot satisfy. */
interface AnyFormApi {
  handleSubmit(): Promise<unknown>;
  setFieldMeta(field: any, updater: (prev: any) => any): void;
  Field: ComponentType<any>;
}
const FormContext = createContext<AnyFormApi | null>(null);

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
export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  form: AnyFormApi;
}

function FormImpl({ form, children, ...rest }: FormProps) {
  injectComponentStyle("form");
  injectComponentStyle("field");
  return (
    <FormContext.Provider value={form}>
      <form
        {...rest}
        data-scope="form"
        data-part="root"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export const Form = withSelfRoot(FormImpl);

/**
 * The named slot in the grid: label, control, hint — and the engine's
 * errors for this name, shown through the same parts the standalone
 * Field family styles. The children may be a render receiving the live
 * TanStack field (value, handleChange, handleBlur, full state), so every
 * capability the engine has is right there where the control is wired.
 * Without a Form above it degrades to a plain labelled field.
 */
export interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  form?: AnyFormApi;
  name: string;
  /** The engine's validator slots for this name (onChange, onBlur, ...). */
  validators?: any;
  label?: string;
  hint?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children?: ReactNode | ((field: any) => ReactNode);
}

function FormFieldImpl({
  form: formProp,
  name,
  label,
  hint,
  required = false,
  invalid = false,
  disabled = false,
  children,
  ...rest
}: FormFieldProps) {
  const injected = useContext(FormContext);
  const form = formProp ?? injected;
  // Layout lands on the wrapper, engine options (validators, mode) ride
  // to the field itself.
  const { className: klass, style, ...fieldOptions } = rest;

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
    const isInvalid = invalid || errors.length > 0;
    return (
      <div {...{ className: klass, style }} data-form-field={name}>
        <ArkField.Root invalid={isInvalid} required={required} disabled={disabled}>
          {label ? <ArkField.Label>{label}</ArkField.Label> : null}
          {typeof children === "function" ? children(field) : children}
          {hint && errors.length === 0 ? <ArkField.HelperText>{hint}</ArkField.HelperText> : null}
          {errors.length > 0 ? <ArkField.ErrorText>{errors[0]}</ArkField.ErrorText> : null}
        </ArkField.Root>
      </div>
    );
  };

  if (!form) return assemble(undefined);
  return (
    <form.Field {...fieldOptions} name={name}>
      {assemble}
    </form.Field>
  );
}

export const FormField = withSelfRoot(FormFieldImpl);

// The fields inside are the field family's own recipe — the form
// stylesheet only lays the grid and routes the errors.
