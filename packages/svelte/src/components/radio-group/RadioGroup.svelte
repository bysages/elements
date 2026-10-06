<script lang="ts">
import { RadioGroup as ArkRadioGroup } from "@ark-ui/svelte/radio-group";

import RadioGroupRoot from "./RadioGroupRoot.svelte";

export type RadioGroupItem = { value: string; label: string; disabled?: boolean };

let {
  value = $bindable(),
  defaultValue,
  items,
  label,
  disabled = false,
  invalid = false,
  required = false,
  readOnly = false,
  orientation = "vertical",
  children,
  ...rest
}: {
  value?: string;
  defaultValue?: string;
  items: RadioGroupItem[];
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  orientation?: "horizontal" | "vertical";
  children?: import("svelte").Snippet;
} & import("./props").RadioGroupRootProps = $props();
</script>

<RadioGroupRoot bind:value {defaultValue} {disabled} {invalid} {required} readOnly={readOnly} {orientation} {...rest}>
  {#if label}<ArkRadioGroup.Label>{label}</ArkRadioGroup.Label>{/if}
  {#each items as item (item.value)}
    <ArkRadioGroup.Item value={item.value} disabled={item.disabled}>
      <ArkRadioGroup.ItemControl />
      <ArkRadioGroup.ItemText>{item.label}</ArkRadioGroup.ItemText>
      <ArkRadioGroup.ItemHiddenInput />
    </ArkRadioGroup.Item>
  {/each}
  {@render children?.()}
</RadioGroupRoot>
