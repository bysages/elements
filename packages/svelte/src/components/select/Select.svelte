<script lang="ts">
import { Select as ArkSelect, createListCollection } from "@ark-ui/svelte/select";

import SelectRoot from "./SelectRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";
import type { SelectFacadeProps, SelectValue } from "./props";

export type SelectOption = { label: string; value: string };

let {
  options,
  multiple = false,
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  clearable = true,
  closeOnSelect = true,
  value = $bindable(),
  defaultValue,
  onValueChange,
  children,
  ...rest
}: SelectFacadeProps = $props();

const collection = $derived(createListCollection({ items: options }));

function toArkValue(value: SelectValue | undefined) {
  if (value === undefined || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function toFacadeValue(value: string[]) {
  return multiple ? value : (value.at(0) ?? "");
}

function handleValueChange(details: { value: string[] }) {
  const next = toFacadeValue(details.value);
  value = next;
  onValueChange?.(next);
}
</script>

<SelectRoot
  {collection}
  {...(value === undefined
    ? { defaultValue: toArkValue(defaultValue) }
    : { value: toArkValue(value) })}
  {multiple}
  {disabled}
  {invalid}
  {required}
  {closeOnSelect}
  lazyMount
  unmountOnExit
  onValueChange={handleValueChange}
  {...rest}
>
  {#if label}<ArkSelect.Label>{label}</ArkSelect.Label>{/if}
  <ArkSelect.Control>
    <ArkSelect.Trigger>
      <ArkSelect.ValueText {placeholder} />
      <ArkSelect.Indicator><InternalIcon name="chevron-down" /></ArkSelect.Indicator>
    </ArkSelect.Trigger>
    {#if clearable}<ArkSelect.ClearTrigger><InternalIcon name="x" /></ArkSelect.ClearTrigger>{/if}
  </ArkSelect.Control>
  <ArkSelect.Positioner>
    <ArkSelect.Content>
      <ArkSelect.Empty>No results found</ArkSelect.Empty>
      {#each options as option (option.value)}
        <ArkSelect.Item item={option}>
          <ArkSelect.ItemText>{option.label}</ArkSelect.ItemText>
          <ArkSelect.ItemIndicator><InternalIcon name="check" /></ArkSelect.ItemIndicator>
        </ArkSelect.Item>
      {/each}
    </ArkSelect.Content>
  </ArkSelect.Positioner>
  <ArkSelect.HiddenSelect />
  {@render children?.()}
</SelectRoot>
