import { Field as ArkField } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core";
import { createContext, useContext, useImperativeHandle, useRef, useState } from "react";
import type { FormEvent, HTMLAttributes, ReactNode, Ref, SyntheticEvent } from "react";

/** The one error a field can carry: where it lives in the form state
 * (dot notation for nested objects, indexes for arrays) and what went
 * wrong. */
export interface FormError {
  name: string;
  message: string;
}

/** The Standard Schema surface this package understands — the slice
 * valibot, zod, arktype and friends all expose. Declared structurally
 * so no spec package becomes a dependency. */
export interface StandardSchema<Input = unknown> {
  readonly "~standard": {
    readonly validate: (value: Input) => Promise<ValidateResult> | ValidateResult;
  };
}

interface ValidateResult {
  readonly value?: unknown;
  readonly issues?: ReadonlyArray<{
    readonly message: string;
    readonly path?: ReadonlyArray<PropertyKey | { readonly key: PropertyKey }>;
  }>;
}

export type FormInputEvent = "input" | "change" | "blur";

interface FormContextValue {
  errors: Map<string, string>;
  disabled: boolean;
}

const FormContext = createContext<FormContextValue | null>(null);

/** Walk a Standard Schema issue's path back to the dotted name the
 * matching FormField declared. */
function issueName(issue: NonNullable<ValidateResult["issues"]>[number]): string {
  return (issue.path ?? [])
    .map((segment) => (typeof segment === "object" ? segment.key : segment))
    .join(".");
}

/** The imperative handle a caller holds through `ref`: the scheduled
 * validation, the error surgery, and the live error map itself. */
export interface FormHandle {
  validate: () => Promise<Map<string, string>>;
  clear: (name?: string | RegExp) => void;
  setErrors: (errors: FormError[]) => void;
  getErrors: (name?: string | RegExp) => FormError[];
  errors: Map<string, string>;
}

export interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit" | "onError"> {
  state: Record<string, unknown>;
  schema?: StandardSchema;
  validate?: (state: Record<string, unknown>) => FormError[] | Promise<FormError[]>;
  validateOn?: FormInputEvent[];
  disabled?: boolean;
  onSubmit?: (state: Record<string, unknown>) => void;
  onError?: (errors: FormError[]) => void;
  ref?: Ref<FormHandle>;
}

/**
 * The validation scheduler: one error map, a submit that validates
 * before it fires, live re-validation on the events the `validateOn`
 * prop names, and the imperative handle. The schema is any Standard
 * Schema (valibot, zod, arktype, …) — none are bundled; a `validate`
 * function composes with it for the cases schemas can't express. Errors
 * reach their field by name, through FormField.
 */
export function Form({
  state,
  schema,
  validate,
  validateOn = ["input", "change", "blur"],
  disabled = false,
  onSubmit,
  onError,
  ref,
  children,
  ...rest
}: FormProps) {
  const [errors, setErrors] = useState(() => new Map<string, string>());
  const run = useRef(0);

  async function runValidate(): Promise<Map<string, string>> {
    const seq = ++run.current;
    const next = new Map<string, string>();
    if (validate) {
      for (const error of await validate(state)) next.set(error.name, error.message);
    }
    if (schema) {
      const result = await schema["~standard"].validate(state);
      for (const issue of result.issues ?? []) {
        const name = issueName(issue);
        if (!next.has(name)) next.set(name, issue.message);
      }
    }
    if (seq === run.current) setErrors(next);
    return next;
  }

  function clear(name?: string | RegExp) {
    if (!name) {
      setErrors(new Map());
      return;
    }
    setErrors((prev) => {
      const next = new Map(prev);
      for (const key of next.keys()) {
        const hit = typeof name === "string" ? key === name : name.test(key);
        if (hit) next.delete(key);
      }
      return next;
    });
  }

  function setErrorsFrom(list: FormError[]) {
    setErrors(new Map(list.map((error) => [error.name, error.message])));
  }

  function getErrors(name?: string | RegExp): FormError[] {
    const all = [...errors].map(([entry, message]) => ({ name: entry, message }));
    if (!name) return all;
    return all.filter((error) =>
      typeof name === "string" ? error.name === name : name.test(error.name),
    );
  }

  useImperativeHandle(ref, () => ({
    validate: runValidate,
    clear,
    setErrors: setErrorsFrom,
    getErrors,
    errors,
  }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runValidate().then((map) => {
      if (map.size === 0) {
        onSubmit?.(state);
        return;
      }
      onError?.([...map].map(([name, message]) => ({ name, message })));
    });
  }

  // Live validation rides event delegation off the form element — blur
  // does not bubble, so it arrives through the capture phase. Input
  // events debounce: validating each keystroke is waste. React's change
  // event is the input event, so it keeps the same debounce window.
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  function onDelegated(kind: FormInputEvent, event: SyntheticEvent) {
    if (!validateOn.includes(kind)) return;
    const target = event.target as HTMLElement | null;
    if (!target || !("value" in target)) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => void runValidate(), kind === "blur" ? 0 : 300);
  }

  return (
    <FormContext.Provider value={{ errors, disabled }}>
      <form
        {...rest}
        data-scope="form"
        data-part="root"
        noValidate
        onSubmit={handleSubmit}
        onInput={(event) => onDelegated("input", event)}
        onChange={(event) => onDelegated("change", event)}
        onBlurCapture={(event) => onDelegated("blur", event)}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

/**
 * The named slot in the grid: label, control, hint — and the error the
 * Form routed to this name, shown through the same parts the standalone
 * Field family styles. The Ark field context runs underneath, so our
 * Input and Textarea pick up the label wiring and the invalid state
 * without knowing the Form exists. Without a Form above it degrades to
 * a plain labelled field.
 */
export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  label?: string;
  hint?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export function FormField({
  name,
  label,
  hint,
  required = false,
  invalid = false,
  disabled = false,
  children,
  ...rest
}: FormFieldProps) {
  const form = useContext(FormContext);
  const formError = name ? form?.errors.get(name) : undefined;
  const isInvalid = invalid || formError != null;
  const isDisabled = disabled || (form?.disabled ?? false);

  return (
    <div {...rest} data-form-field={name}>
      <ArkField.Root invalid={isInvalid} required={required} disabled={isDisabled}>
        {label ? <ArkField.Label>{label}</ArkField.Label> : null}
        {children}
        {hint && formError == null ? <ArkField.HelperText>{hint}</ArkField.HelperText> : null}
        {formError != null ? <ArkField.ErrorText>{formError}</ArkField.ErrorText> : null}
      </ArkField.Root>
    </div>
  );
}

// The fields inside are the field family's own recipe — the form
// stylesheet only lays the grid and routes the errors.
injectComponentStyle("form");
injectComponentStyle("field");
