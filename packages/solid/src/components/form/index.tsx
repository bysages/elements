import { Field as ArkField } from "@ark-ui/solid/field";
import { injectComponentStyle } from "@bysages/core";
import { createForm, createField } from "@tanstack/solid-form";
import { createContext, useContext, splitProps, Show, type Component, type JSX } from "solid-js";

export { createForm, createField };
export type { SolidFormApi } from "@tanstack/solid-form";
export type { FormApi, FieldApi } from "@tanstack/form-core";

/** The seam this family passes the engine through — the members the
 * components drive, with the engine's field-name generics opened to
 * `any`. The engine ships no "any form" alias: its loosest, `FormLikeAPI`,
 * still pins names to `string`, which a concrete form's literal names
 * cannot satisfy. */
interface AnyFormApi {
  handleSubmit(): Promise<unknown>;
  setFieldMeta(field: any, updater: (prev: any) => any): void;
  Field: Component<any>;
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
export interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
  form: AnyFormApi;
}

export function Form(props: FormProps) {
  const [own, rest] = splitProps(props, ["form"]);
  return (
    <FormContext.Provider value={own.form}>
      <form
        {...rest}
        data-scope="form"
        data-part="root"
        novalidate
        onSubmit={(event) => {
          event.preventDefault();
          void own.form.handleSubmit();
        }}
      />
    </FormContext.Provider>
  );
}

/**
 * The named slot in the grid: label, control, hint — and the engine's
 * errors for this name, shown through the same parts the standalone
 * Field family styles. The children receive the live engine field — in
 * Solid an accessor to the FieldApi — so every capability the engine
 * has is right there where the control is wired. Without a Form above
 * it degrades to a plain labelled field.
 */
export interface FormFieldProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
  form?: AnyFormApi;
  name: string;
  label?: string;
  hint?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children?: JSX.Element | ((field: any) => JSX.Element);
}

export function FormField(props: FormFieldProps) {
  const injected = useContext(FormContext);
  const [own, rest] = splitProps(props, [
    "form",
    "name",
    "label",
    "hint",
    "required",
    "invalid",
    "disabled",
    "children",
  ]);
  const form = () => own.form ?? injected;

  // The engine hands Solid an accessor; every read below stays reactive
  // so the error text swaps as the engine validates.
  const assemble = (field: any) => {
    // Untouched fields only speak on a submit attempt — the schema's
    // complaints about fields the reader never visited stay quiet.
    const errors = () => {
      if (!field) return [];
      const meta = field().state.meta;
      const surfaced = meta.isTouched
        ? (meta.errors ?? [])
        : [meta.errorMap?.onSubmit].flat().filter(Boolean);
      return surfaced.map(errorText).filter(Boolean);
    };
    return (
      <div {...rest} data-form-field={own.name}>
        <ArkField.Root
          invalid={own.invalid || errors().length > 0}
          required={own.required}
          disabled={own.disabled}
        >
          {own.label ? <ArkField.Label>{own.label}</ArkField.Label> : null}
          {typeof own.children === "function" ? own.children(field) : own.children}
          {own.hint && errors().length === 0 ? (
            <ArkField.HelperText>{own.hint}</ArkField.HelperText>
          ) : null}
          {errors().length > 0 ? <ArkField.ErrorText>{errors()[0]}</ArkField.ErrorText> : null}
        </ArkField.Root>
      </div>
    );
  };

  return (
    <Show when={form()} keyed fallback={assemble(undefined)}>
      {(engine) => (
        <engine.Field {...rest} name={own.name}>
          {(field: any) => assemble(field)}
        </engine.Field>
      )}
    </Show>
  );
}

// The fields inside are the field family's own recipe — the form
// stylesheet only lays the grid and routes the errors.
injectComponentStyle("form");
injectComponentStyle("field");
