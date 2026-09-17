import { useListCollection } from "@ark-ui/solid/collection";
import { Combobox as ArkCombobox } from "@ark-ui/solid/combobox";
import { injectComponentStyle } from "@bysages/core";
import { For, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

export interface AutoCompleteProps {
  value?: string;
  items?: string[];
  placeholder?: string;
  /** Field text to match against; defaults to the item itself. */
  filter?: (item: string, input: string) => boolean;
  onValueChange?: (value: string) => void;
}

/**
 * Free text with suggestions: the reader types anything, the list
 * narrows to help, and both a pick and a custom value end up in the
 * same `value`. A preset of the combobox machinery — same parts,
 * same styling, one job. `items` seeds the suggestion list once;
 * matching is a case-insensitive substring unless `filter` says
 * otherwise.
 */
export function AutoComplete(props: AutoCompleteProps) {
  const [own, rest] = splitProps(props, [
    "value",
    "items",
    "placeholder",
    "filter",
    "onValueChange",
  ]);
  const { collection, filter } = useListCollection({
    initialItems: own.items ?? [],
    filter: (item, input) =>
      own.filter ? own.filter(item, input) : item.toLowerCase().includes(input.toLowerCase()),
  });

  return (
    <ArkCombobox.Root
      {...rest}
      collection={collection()}
      inputValue={own.value}
      allowCustomValue
      onValueChange={(details) => {
        const [first] = details.value;
        if (first != null) own.onValueChange?.(first);
      }}
      onInputValueChange={(details) => {
        filter(details.inputValue);
        own.onValueChange?.(details.inputValue);
      }}
      positioning={{ sameWidth: true }}
    >
      <ArkCombobox.Control>
        <ArkCombobox.Input placeholder={own.placeholder} />
      </ArkCombobox.Control>
      <Portal>
        <ArkCombobox.Positioner>
          <ArkCombobox.Content>
            <ArkCombobox.Empty>No matches</ArkCombobox.Empty>
            <For each={collection().items}>
              {(item) => (
                <ArkCombobox.Item item={item}>
                  <ArkCombobox.ItemText>{item}</ArkCombobox.ItemText>
                </ArkCombobox.Item>
              )}
            </For>
          </ArkCombobox.Content>
        </ArkCombobox.Positioner>
      </Portal>
    </ArkCombobox.Root>
  );
}

injectComponentStyle("combobox");
