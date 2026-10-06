<script lang="ts">
import { PinInput as ArkPinInput } from "@ark-ui/svelte/pin-input";

import PinInputRoot from "./PinInputRoot.svelte";

let {
  value = $bindable(),
  defaultValue,
  label,
  placeholder = "·",
  disabled = false,
  invalid = false,
  required = false,
  length = 4,
  children,
  ...rest
}: {
  value?: string[];
  defaultValue?: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  length?: number;
  children?: import("svelte").Snippet;
} & import("./props").PinInputRootProps = $props();

const indexes = $derived(Array.from({ length }, (_, index) => index));
</script>

<PinInputRoot bind:value {defaultValue} {placeholder} {disabled} {invalid} {required} {...rest}>
  {#if label}<ArkPinInput.Label>{label}</ArkPinInput.Label>{/if}
  <ArkPinInput.Control>
    {#each indexes as index (index)}
      <ArkPinInput.Input index={index} />
    {/each}
  </ArkPinInput.Control>
  <ArkPinInput.HiddenInput />
  {@render children?.()}
</PinInputRoot>
