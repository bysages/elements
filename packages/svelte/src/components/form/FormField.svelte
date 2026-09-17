<script lang="ts">
import { Field as ArkField } from "@ark-ui/svelte/field";

import type { FormFieldProps } from "./props";
import { useForm } from "./context";

let {
  name,
  label,
  hint,
  required = false,
  invalid = false,
  disabled = false,
  children,
  ...rest
}: FormFieldProps = $props();

const form = useForm();

const formError = $derived(name ? form?.errors().get(name) : undefined);
const fieldInvalid = $derived(invalid || formError != null);
const fieldDisabled = $derived(disabled || (form?.disabled ?? false));
</script>

<!-- The named slot in the grid: label, control, hint — and the error
the Form routed to this name, shown through the same parts the
standalone Field family styles. Without a Form above it degrades to a
plain labelled field. -->
<div {...rest} data-form-field={name}>
  <ArkField.Root invalid={fieldInvalid} {required} disabled={fieldDisabled}>
    {#if label}
      <ArkField.Label>{label}</ArkField.Label>
    {/if}
    {@render children?.()}
    {#if hint && formError == null}
      <ArkField.HelperText>{hint}</ArkField.HelperText>
    {/if}
    {#if formError != null}
      <ArkField.ErrorText>{formError}</ArkField.ErrorText>
    {/if}
  </ArkField.Root>
</div>
