import { useListCollection } from "@ark-ui/react/collection";
import { Combobox as ArkCombobox } from "@ark-ui/react/combobox";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "react";
import { useEffect, useRef } from "react";

import { useElementId } from "../../internal/id";
import { useComponentMessages } from "../../internal/messages";
import { Combobox } from "../combobox";

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
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
}

function AutoCompleteImpl({
  value = "",
  items = [],
  placeholder,
  filter,
  size = "md",
  onValueChange,
  ...rest
}: AutoCompleteProps) {
  injectComponentStyle("combobox");
  const messages = useComponentMessages();
  const hostId = useElementId("autocomplete", rest);
  const fieldText = useRef("");
  const {
    collection,
    set,
    filter: filterItems,
  } = useListCollection({
    initialItems: items,
    filter: (item: string, input: string) =>
      filter ? filter(item, input) : item.toLowerCase().includes(input.toLowerCase()),
  });

  // A caller's list is live: sync it without remounting, then restore the
  // active query because `set` clears the collection's own filter.
  useEffect(() => {
    set(items);
    filterItems(fieldText.current);
    // The field text is read at sync time, not a dependency; keystrokes
    // filter immediately below and must not make this effect re-run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <ArkCombobox.Root
      {...rest}
      id={`${hostId}:combobox`}
      collection={collection}
      inputValue={value}
      allowCustomValue
      data-size={size}
      onValueChange={(details) => {
        const [first] = details.value;
        if (first != null) onValueChange?.(first);
      }}
      onInputValueChange={(details) => {
        fieldText.current = details.inputValue;
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
            <ArkCombobox.Empty>{messages.command.noMatches}</ArkCombobox.Empty>
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

export const AutoComplete = Object.assign(AutoCompleteImpl, Combobox) as typeof AutoCompleteImpl &
  typeof Combobox;
