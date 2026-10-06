<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("combobox");

import { Combobox as ArkCombobox } from "@ark-ui/svelte/combobox";
import { useListCollection } from "@ark-ui/svelte/collection";
import { Portal } from "@ark-ui/svelte/portal";
import { untrack } from "svelte";

import { useComponentMessages } from "../config-provider/messages";

import type { AutoCompleteProps } from "./props";

let {
  value = $bindable(""),
  items = [],
  placeholder,
  size = "md",
  filter,
  ...rest
}: AutoCompleteProps =
  $props();

const messages = useComponentMessages();
const { collection, filter: filterItems, set } = useListCollection<string>({
  initialItems: untrack(() => items),
  filter: (item, input) =>
    filter ? filter(item, input) : item.toLowerCase().includes(input.toLowerCase()),
});

$effect(() => {
  set(items);
});
</script>

<!-- Free text with suggestions: the reader types anything, the list
narrows to help, and both a pick and a custom value end up in the same
`value`. A preset of the combobox machinery — same parts, same styling,
one job. -->
<ArkCombobox.Root
  collection={collection}
  data-size={size}
  inputValue={value}
  allowCustomValue
  onValueChange={(details) => {
    const [first] = details.value;
    if (first != null) value = first;
  }}
  onInputValueChange={(details) => {
    filterItems(details.inputValue);
    value = details.inputValue;
  }}
  positioning={{ sameWidth: true }}
  {...rest}
>
  <ArkCombobox.Control>
    <ArkCombobox.Input placeholder={placeholder} />
  </ArkCombobox.Control>
  <Portal>
    <ArkCombobox.Positioner>
      <ArkCombobox.Content>
        <ArkCombobox.Empty>{messages().command.noMatches}</ArkCombobox.Empty>
        {#each collection().items as item (item)}
          <ArkCombobox.Item item={item}>
            <ArkCombobox.ItemText>{item}</ArkCombobox.ItemText>
          </ArkCombobox.Item>
        {/each}
      </ArkCombobox.Content>
    </ArkCombobox.Positioner>
  </Portal>
</ArkCombobox.Root>
