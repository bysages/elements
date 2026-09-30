<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("select");

import { useFieldContext } from "@ark-ui/svelte/field";
import type { NativeSelectProps } from "./native-props";

let {
  value = $bindable(""),
  options,
  size = "md",
  invalid = false,
  placeholder,
  disabled = false,
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
  <svg data-scope="select" data-part="native-icon" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M4 6l4 4 4-4"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</span>
