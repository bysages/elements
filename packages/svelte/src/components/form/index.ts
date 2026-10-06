import { injectComponentStyle } from "@bysages/core";

import { withSelfRoot } from "../../internal/family";
import FormComponent from "./Form.svelte";
import FormFieldComponent from "./FormField.svelte";

/** The engine owns the values and the validation; these two are the
 * assembly — one grid, one error routing. */
export const Form = withSelfRoot(FormComponent);
export const FormField = withSelfRoot(FormFieldComponent);

export { createForm, createField } from "@tanstack/svelte-form";
/** The other frameworks' hook names, so a form script crosses the
 * matrix without renaming the engine calls. */
export { createForm as useForm, createField as useField } from "@tanstack/svelte-form";
export type { SvelteFormApi } from "@tanstack/svelte-form";
export type { FormApi, FieldApi } from "@tanstack/form-core";
export type { AnyFormApi } from "./context";
export type { FormProps, FormFieldProps } from "./props";

// The fields inside are the field family's own recipe — the form
// stylesheet only lays the grid and routes the errors.
injectComponentStyle("field");
