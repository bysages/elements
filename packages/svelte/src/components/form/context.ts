import { getContext, setContext } from "svelte";

/** The form's half of the seam: the live error map and the form-level
 * disabled switch, shared with every FormField below. `errors` reads as
 * a function so the whole map can be swapped on each validation run. */
export interface FormContext {
  errors: () => Map<string, string>;
  disabled: boolean;
}

export const FORM_KEY: unique symbol = Symbol("bysages-form");

export function provideForm(context: FormContext): FormContext {
  setContext(FORM_KEY, context);
  return context;
}

export function useForm(): FormContext | null {
  return getContext<FormContext | null>(FORM_KEY) ?? null;
}
