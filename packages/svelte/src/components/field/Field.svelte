<script lang="ts">
import { Field as ArkField } from "@ark-ui/svelte/field";

import FieldRoot from "./FieldRoot.svelte";

let {
  label,
  helperText,
  errorText,
  disabled = false,
  invalid = false,
  required = false,
  children,
  ...rest
}: {
  label?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/field").FieldRootProps = $props();
</script>

<FieldRoot {disabled} {invalid} {required} {...rest}>
  {#if label}<ArkField.Label>{label}</ArkField.Label>{/if}
  {@render children?.()}
  {#if helperText}<ArkField.HelperText>{helperText}</ArkField.HelperText>{/if}
  {#if errorText}<ArkField.ErrorText>{errorText}</ArkField.ErrorText>{/if}
</FieldRoot>
