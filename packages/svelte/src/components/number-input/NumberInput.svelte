<script lang="ts">
import { NumberInput as ArkNumberInput } from "@ark-ui/svelte/number-input";

import NumberInputRoot from "./NumberInputRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  value = $bindable(),
  defaultValue,
  label,
  placeholder,
  min,
  max,
  step,
  disabled = false,
  invalid = false,
  required = false,
  children,
  ...rest
}: {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").NumberInputRootProps = $props();
</script>

<NumberInputRoot bind:value {defaultValue} {placeholder} {min} {max} {step} {disabled} {invalid} {required} {...rest}>
  {#if label}<ArkNumberInput.Label>{label}</ArkNumberInput.Label>{/if}
  <ArkNumberInput.Control>
    <ArkNumberInput.Input {placeholder} />
    <ArkNumberInput.Scrubber><InternalIcon name="pause" /></ArkNumberInput.Scrubber>
    <ArkNumberInput.IncrementTrigger aria-label="Increment"><InternalIcon name="chevron-up" /></ArkNumberInput.IncrementTrigger>
    <ArkNumberInput.DecrementTrigger aria-label="Decrement"><InternalIcon name="chevron-down" /></ArkNumberInput.DecrementTrigger>
  </ArkNumberInput.Control>
  {@render children?.()}
</NumberInputRoot>
