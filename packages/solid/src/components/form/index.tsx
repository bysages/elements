import { Field as ArkField } from "@ark-ui/solid/field";
import { injectComponentStyle } from "@bysages/core";
import { createContext, onCleanup, onMount, splitProps, useContext } from "solid-js";
import { createSignal } from "solid-js";
import type { JSX } from "solid-js";

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

/** The imperative handle the `ref` callback receives: run the
 * validation, clear errors (all of them or by name), and set or read
 * them directly. */
export interface FormApi {
  validate: () => Promise<Map<string, string>>;
  clear: (name?: string | RegExp) => void;
  setErrors: (errors: FormError[]) => void;
  getErrors: (name?: string | RegExp) => FormError[];
  errors: () => Map<string, string>;
}

interface FormContextValue {
  errors: () => Map<string, string>;
  disabled: boolean;
}

const FormContext = createContext<FormContextValue>();

/** Walk a Standard Schema issue's path back to the dotted name the
 * matching FormField declared. */
function issueName(issue: NonNullable<ValidateResult["issues"]>[number]): string {
  return (issue.path ?? [])
    .map((segment) => (typeof segment === "object" ? segment.key : segment))
    .join(".");
}

export interface FormProps extends Omit<
  JSX.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit" | "onError" | "ref"
> {
  state: Record<string, unknown>;
  schema?: StandardSchema;
  validate?: (state: Record<string, unknown>) => FormError[] | Promise<FormError[]>;
  validateOn?: FormInputEvent[];
  disabled?: boolean;
  onSubmit?: (state: Record<string, unknown>) => void;
  onError?: (errors: FormError[]) => void;
  /** The imperative handle — set/clear/read errors from outside. */
  ref?: (api: FormApi) => void;
}

/**
 * The validation scheduler: one reactive error map, a submit that
 * validates before it emits, live re-validation on the events the
 * `validateOn` prop names, and the imperative handle. The schema is any
 * Standard Schema (valibot, zod, arktype, …) — none are bundled; a
 * `validate` function composes with it for the cases schemas can't
 * express. Errors reach their field by name, through FormField.
 */
export function Form(props: FormProps) {
  const [own, rest] = splitProps(props, [
    "state",
    "schema",
    "validate",
    "validateOn",
    "disabled",
    "onSubmit",
    "onError",
    "ref",
  ]);
  const [errors, setErrorsMap] = createSignal(new Map<string, string>());

  const provide: FormContextValue = { errors, disabled: own.disabled ?? false };

  let run = 0;
  async function runValidate(): Promise<Map<string, string>> {
    const seq = ++run;
    const next = new Map<string, string>();
    if (own.validate) {
      for (const error of await own.validate(own.state)) next.set(error.name, error.message);
    }
    if (own.schema) {
      const result = await own.schema["~standard"].validate(own.state);
      for (const issue of result.issues ?? []) {
        const name = issueName(issue);
        if (!next.has(name)) next.set(name, issue.message);
      }
    }
    if (seq === run) setErrorsMap(next);
    return next;
  }

  function clear(name?: string | RegExp) {
    if (!name) {
      setErrorsMap(new Map());
      return;
    }
    const next = new Map(errors());
    for (const key of next.keys()) {
      const hit = typeof name === "string" ? key === name : name.test(key);
      if (hit) next.delete(key);
    }
    setErrorsMap(next);
  }

  function setErrors(list: FormError[]) {
    setErrorsMap(new Map(list.map((error) => [error.name, error.message])));
  }

  function getErrors(name?: string | RegExp): FormError[] {
    const all = [...errors()].map(([entry, message]) => ({ name: entry, message }));
    if (!name) return all;
    return all.filter((error) =>
      typeof name === "string" ? error.name === name : name.test(error.name),
    );
  }

  const api: FormApi = { validate: runValidate, clear, setErrors, getErrors, errors };

  onMount(() => own.ref?.(api));

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    void runValidate().then((map) => {
      if (map.size === 0) {
        own.onSubmit?.(own.state);
        return;
      }
      own.onError?.([...map].map(([name, message]) => ({ name, message })));
    });
  }

  // Live validation rides event delegation off the form element — blur
  // does not bubble, so it arrives through the capture phase. Input
  // events debounce: validating each keystroke is waste.
  let timer: ReturnType<typeof setTimeout> | undefined;
  function onDelegated(event: Event) {
    if (!(own.validateOn ?? ["input", "change", "blur"]).includes(event.type as FormInputEvent))
      return;
    const target = event.target as HTMLElement | null;
    if (!target || !("value" in target)) return;
    clearTimeout(timer);
    timer = setTimeout(() => void runValidate(), event.type === "input" ? 300 : 0);
  }

  const [formEl, setFormEl] = createSignal<HTMLFormElement | null>(null);
  onMount(() => {
    formEl()?.addEventListener("blur", onDelegated, true);
    onCleanup(() => formEl()?.removeEventListener("blur", onDelegated, true));
  });

  return (
    <FormContext.Provider value={provide}>
      <form
        {...rest}
        ref={setFormEl}
        data-scope="form"
        data-part="root"
        novalidate
        onSubmit={handleSubmit}
        onInput={onDelegated}
        onChange={onDelegated}
      />
    </FormContext.Provider>
  );
}

export interface FormFieldProps extends JSX.HTMLAttributes<HTMLDivElement> {
  name?: string;
  label?: string;
  hint?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
}

/**
 * The named slot in the grid: label, control, hint — and the error the
 * Form routed to this name, shown through the same parts the standalone
 * Field family styles. The Ark field context runs underneath, so our
 * Input and Textarea pick up the label wiring and the invalid state
 * without knowing the Form exists. Without a Form above it degrades to
 * a plain labelled field.
 */
export function FormField(props: FormFieldProps) {
  const [own, rest] = splitProps(props, [
    "name",
    "label",
    "hint",
    "required",
    "invalid",
    "disabled",
    "children",
  ]);
  const form = useContext(FormContext);
  const error = () => (own.name ? form?.errors().get(own.name) : undefined);
  const invalid = () => own.invalid || error() != null;
  const disabled = () => own.disabled || (form?.disabled ?? false);

  return (
    <div {...rest} data-form-field={own.name}>
      <ArkField.Root invalid={invalid()} required={own.required} disabled={disabled()}>
        {own.label ? <ArkField.Label>{own.label}</ArkField.Label> : null}
        {own.children}
        {own.hint && error() == null ? <ArkField.HelperText>{own.hint}</ArkField.HelperText> : null}
        {error() != null ? <ArkField.ErrorText>{error()}</ArkField.ErrorText> : null}
      </ArkField.Root>
    </div>
  );
}

// The fields inside are the field family's own recipe — the form
// stylesheet only lays the grid and routes the errors.
injectComponentStyle("form");
injectComponentStyle("field");
