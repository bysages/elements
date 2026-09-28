<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("form");

  import { Field as ArkField } from "@ark-ui/svelte/field";

  import type { FormFieldProps } from "./props";
  import { useForm } from "./context";

  let {
    form: formProp,
    name,
    label,
    hint,
    required = false,
    invalid = false,
    disabled = false,
    children,
    ...rest
  }: FormFieldProps = $props();

  const engine = formProp ?? useForm();

  /** A validator's complaint is a string or a Standard Schema issue;
   * both reduce to the sentence the field shows. */
  function errorText(error: unknown): string {
    if (error == null) return "";
    if (typeof error === "string") return error;
    if (typeof error === "object" && "message" in error)
      return String((error as { message: unknown }).message);
    return String(error);
  }
</script>

{#snippet assemble(field: any)}
  <!-- Untouched fields only speak on a submit attempt — the schema's
  complaints about fields the reader never visited stay quiet. -->
  {@const meta = field?.state.meta}
  {@const surfaced = !meta
    ? []
    : meta.isTouched
      ? (meta.errors ?? [])
      : [meta.errorMap?.onSubmit].flat().filter(Boolean)}
  {@const errors = surfaced.map(errorText).filter(Boolean)}
  <div {...rest} data-form-field={name}>
    <ArkField.Root invalid={invalid || errors.length > 0} {required} {disabled}>
      {#if label}
        <ArkField.Label>{label}</ArkField.Label>
      {/if}
      {@render children?.(field)}
      {#if hint && errors.length === 0}
        <ArkField.HelperText>{hint}</ArkField.HelperText>
      {/if}
      {#if errors.length > 0}
        <ArkField.ErrorText>{errors[0]}</ArkField.ErrorText>
      {/if}
    </ArkField.Root>
  </div>
{/snippet}

{#if engine}
  <!-- The engine hands the snippet the live FieldApi — its `state`
  getter tracks the store, so the errors swap as it validates. -->
  <engine.Field {...rest} {name}>
    {#snippet children(field)}
      {@render assemble(field)}
    {/snippet}
  </engine.Field>
{:else}
  {@render assemble(undefined)}
{/if}
