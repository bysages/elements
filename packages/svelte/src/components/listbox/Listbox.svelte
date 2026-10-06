<script lang="ts">
import { Listbox as ArkListbox, createListCollection } from "@ark-ui/svelte/listbox";

import ListboxRoot from "./ListboxRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

export type ListboxOption = { label: string; value: string };

let {
  options,
  multiple = false,
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  children,
  ...rest
}: {
  options: ListboxOption[];
  multiple?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/listbox").ListboxRootProps = $props();

const collection = $derived(createListCollection({ items: options }));
</script>

<ListboxRoot {collection} {multiple} {disabled} {invalid} {required} {placeholder} {...rest}>
  {#if label}<ArkListbox.Label>{label}</ArkListbox.Label>{/if}
  <ArkListbox.Input placeholder={placeholder} aria-label={label ? undefined : placeholder} />
  <ArkListbox.Content>
    <ArkListbox.Empty>No results found</ArkListbox.Empty>
    {#each options as option (option.value)}
      <ArkListbox.Item item={option}>
        <ArkListbox.ItemText>{option.label}</ArkListbox.ItemText>
        <ArkListbox.ItemIndicator><InternalIcon name="check" /></ArkListbox.ItemIndicator>
      </ArkListbox.Item>
    {/each}
  </ArkListbox.Content>
  {@render children?.()}
</ListboxRoot>
