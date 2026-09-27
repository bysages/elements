import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

import type { AnyFormApi } from "./context";

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  form: AnyFormApi;
  children?: Snippet;
}

export interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  form?: AnyFormApi;
  name: string;
  label?: string;
  hint?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children?: Snippet<[any]>;
}
