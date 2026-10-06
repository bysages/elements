<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("select");

import { useFieldContext } from "@ark-ui/svelte/field";
import InternalIcon from "../../internal/InternalIcon.svelte";
import type { NativeSelectProps } from "./native-props";

let {
  value = $bindable(""),
  options,
  size = "md",
  invalid = false,
  placeholder,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...rest
}: NativeSelectProps = $props();

const field = useFieldContext();
const fieldProps = $derived(field?.()?.getInputProps() ?? {});
const isInvalid = $derived(invalid || field?.()?.invalid === true);
const isDisabled = $derived(disabled || field?.()?.disabled === true);
const isEmpty = $derived(value == null || value === "");
</script>

<!-- The native select wearing the field recipe: the platform's own
list behind the same hairline shell the framed select wears. -->
<span
  {...rest}
  data-scope="select"
  data-part="native-root"
  data-size={size}
  data-invalid={isInvalid ? "" : undefined}
  data-disabled={isDisabled ? "" : undefined}
  data-placeholder-shown={isEmpty ? "" : undefined}
>
  <select
    {...fieldProps}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    bind:value
    data-scope="select"
    data-part="native"
    disabled={isDisabled || undefined}
  >
    {#if placeholder}
      <option value="" disabled hidden={isEmpty ? undefined : true}>{placeholder}</option>
    {/if}
    {#each options as option (option.value)}
      <option value={option.value} disabled={option.disabled}>{option.label}</option>
    {/each}
  </select>
  <span data-scope="select" data-part="native-icon">
    <InternalIcon name="chevron-down" />
  </span>
</span>
