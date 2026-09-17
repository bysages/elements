import { injectComponentStyle } from "@bysages/core";

import FormComponent from "./Form.svelte";
import FormFieldComponent from "./FormField.svelte";

/** The validation scheduler and the named slot in its grid — the
 * schema is any Standard Schema, errors reach their field by name. */
export const Form = FormComponent;
export const FormField = FormFieldComponent;

export type { FormError, FormFieldProps, FormInputEvent, FormProps, StandardSchema } from "./props";

// The fields inside are the field family's own recipe — the form
// stylesheet only lays the grid and routes the errors.
injectComponentStyle("form");
injectComponentStyle("field");
