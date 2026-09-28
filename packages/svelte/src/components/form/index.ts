import { injectComponentStyle } from "@bysages/core";

import FormComponent from "./Form.svelte";
import FormFieldComponent from "./FormField.svelte";

/** The engine owns the values and the validation; these two are the
 * assembly — one grid, one error routing. */
export const Form = FormComponent;
export const FormField = FormFieldComponent;

export { createForm, createField } from "@tanstack/svelte-form";
export type { SvelteFormApi } from "@tanstack/svelte-form";
export type { FormApi, FieldApi } from "@tanstack/form-core";
export type { AnyFormApi } from "./context";
export type { FormProps, FormFieldProps } from "./props";

// The fields inside are the field family's own recipe — the form
// stylesheet only lays the grid and routes the errors.
injectComponentStyle("field");
