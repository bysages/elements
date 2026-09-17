import { useListCollection } from "@ark-ui/react/collection";
import { Combobox as ArkCombobox } from "@ark-ui/react/combobox";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/**
 * Free text with suggestions: the reader types anything, the list
 * narrows to help, and both a pick and a custom value end up in the
 * same `value`. A preset of the combobox machinery — same parts, same
 * styling, one job. `items` seeds the suggestion list once; matching is
 * a case-insensitive substring unless `filter` says otherwise.
 */
export interface AutoCompleteProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onSelect"
> {
  value?: string;
  items?: string[];
  placeholder?: string;
  /** Field text to match against; defaults to the item itself. */
  filter?: (item: string, input: string) => boolean;
  onValueChange?: (value: string) => void;
}

export function AutoComplete({
  value = "",
  items = [],
  placeholder,
  filter,
  onValueChange,
  ...rest
}: AutoCompleteProps) {
  const { collection, filter: filterItems } = useListCollection({
    initialItems: items,
    filter: (item: string, input: string) =>
      filter ? filter(item, input) : item.toLowerCase().includes(input.toLowerCase()),
  });

  return (
    <ArkCombobox.Root
      {...rest}
      collection={collection}
      inputValue={value}
      allowCustomValue
      onValueChange={(details) => {
        const [first] = details.value;
        if (first != null) onValueChange?.(first);
      }}
      onInputValueChange={(details) => {
        filterItems(details.inputValue);
        onValueChange?.(details.inputValue);
      }}
      positioning={{ sameWidth: true }}
    >
      <ArkCombobox.Control>
        <ArkCombobox.Input placeholder={placeholder} />
      </ArkCombobox.Control>
      <Portal>
        <ArkCombobox.Positioner>
          <ArkCombobox.Content>
            <ArkCombobox.Empty>No matches</ArkCombobox.Empty>
            {collection.items.map((item: string) => (
              <ArkCombobox.Item key={item} item={item}>
                <ArkCombobox.ItemText>{item}</ArkCombobox.ItemText>
              </ArkCombobox.Item>
            ))}
          </ArkCombobox.Content>
        </ArkCombobox.Positioner>
      </Portal>
    </ArkCombobox.Root>
  );
}

injectComponentStyle("combobox");
