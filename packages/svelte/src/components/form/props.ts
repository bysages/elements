import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

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

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  state: Record<string, unknown>;
  schema?: StandardSchema;
  validate?: (state: Record<string, unknown>) => FormError[] | Promise<FormError[]>;
  validateOn?: FormInputEvent[];
  disabled?: boolean;
  onSubmit?: (state: Record<string, unknown>) => void;
  onError?: (errors: FormError[]) => void;
  children?: Snippet;
}

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  label?: string;
  hint?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children?: Snippet;
}
