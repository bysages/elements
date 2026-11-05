<script lang="ts">
import { Combobox as ArkCombobox, createListCollection } from "@ark-ui/svelte/combobox";
import FloatingPortal from "../../internal/FloatingPortal.svelte";

import ComboboxRoot from "./ComboboxRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

export type ComboboxOption = { label: string; value: string };

let {
  options,
  multiple = false,
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  clearable = true,
  children,
  portal = false,
  ...rest
}: {
  options: ComboboxOption[];
  multiple?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Show the clear-value control when the machine allows it. */
  clearable?: boolean;
  children?: import("svelte").Snippet;
  /** After hydration, portal the floating vessel to body (`true`) or a CSS selector. */
  portal?: import("../../internal/floating").FloatingPortalTarget;
} & import("./props").ComboboxRootProps = $props();

const collection = $derived(createListCollection({ items: options }));
</script>

<ComboboxRoot {collection} {multiple} {disabled} {invalid} {required} {placeholder} lazyMount unmountOnExit {...rest}>
  {#if label}<ArkCombobox.Label>{label}</ArkCombobox.Label>{/if}
  <ArkCombobox.Control>
    <ArkCombobox.Input placeholder={placeholder} aria-label={label ? undefined : placeholder} />
    {#if clearable}<ArkCombobox.ClearTrigger><InternalIcon name="x" /></ArkCombobox.ClearTrigger>{/if}
    <ArkCombobox.Trigger><InternalIcon name="chevron-down" /></ArkCombobox.Trigger>
  </ArkCombobox.Control>
  <FloatingPortal {portal}>
    <ArkCombobox.Positioner>
      <ArkCombobox.Content>
        <ArkCombobox.Empty>No results found</ArkCombobox.Empty>
        <ArkCombobox.List>
          {#each options as option (option.value)}
            <ArkCombobox.Item item={option}>
              <ArkCombobox.ItemText>{option.label}</ArkCombobox.ItemText>
              <ArkCombobox.ItemIndicator><InternalIcon name="check" /></ArkCombobox.ItemIndicator>
            </ArkCombobox.Item>
          {/each}
        </ArkCombobox.List>
      </ArkCombobox.Content>
    </ArkCombobox.Positioner>
  </FloatingPortal>
  {@render children?.()}
</ComboboxRoot>
