import type { CollectionItem } from "@ark-ui/solid/collection";
import { createListCollection, Combobox as ArkCombobox } from "@ark-ui/solid/combobox";
import type { ComboboxRootProps as ArkComboboxRootProps } from "@ark-ui/solid/combobox";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Combobox, dressed in the paper-and-ink system: the field carries
 * the control recipe and its matches dissolve open as a paper vessel, the
 * checked row taking the flat ink fill. The API is Ark's own — Root, Label,
 * Control, Input, Trigger, ClearTrigger, Positioner, Content, List, Empty,
 * Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */

type ComboboxOwnProps = {
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
};

function ComboboxRoot<T extends CollectionItem>(props: ArkComboboxRootProps<T> & ComboboxOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("combobox", () => rest.id);
  return <ArkCombobox.Root<T> {...rest} id={id()} data-size={own.size ?? "md"} />;
}

type ComboboxOption = { label: string; value: string };
type ComboboxFacadeValue = string | string[];
type ComboboxParts = Omit<typeof ArkCombobox, "Root"> & { Root: typeof ComboboxRoot };

function toComboboxValue(value: ComboboxFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

function fromComboboxValue(value: string[], multiple: boolean | undefined) {
  return multiple ? value : value.at(0);
}

export interface ComboboxFacadeProps {
  value?: ComboboxFacadeValue;
  defaultValue?: ComboboxFacadeValue;
  options: ComboboxOption[];
  multiple?: boolean;
  /** Show the clear-value control when the machine allows it. */
  clearable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value?: ComboboxFacadeValue) => void;
}

function ComboboxFacade(props: ComboboxFacadeProps) {
  injectComponentStyle("combobox");
  const collection = createListCollection({ items: props.options });

  return (
    <ComboboxRoot
      size={props.size ?? "md"}
      collection={collection}
      defaultValue={toComboboxValue(props.defaultValue)}
      disabled={props.disabled}
      invalid={props.invalid}
      multiple={props.multiple}
      placeholder={props.placeholder}
      required={props.required}
      lazyMount
      unmountOnExit
      {...(props.value === undefined ? {} : { value: toComboboxValue(props.value) })}
      onValueChange={(event: { value: string[] }) =>
        props.onValueChange?.(fromComboboxValue(event.value, props.multiple))
      }
    >
      <Show when={props.label}>
        <ArkCombobox.Label>{props.label}</ArkCombobox.Label>
      </Show>
      <ArkCombobox.Control>
        <ArkCombobox.Input
          aria-label={props.label ? undefined : props.placeholder}
          placeholder={props.placeholder}
        />
        <Show when={props.clearable !== false}>
          <ArkCombobox.ClearTrigger>
            {iconNode("x", { width: "14", height: "14" })}
          </ArkCombobox.ClearTrigger>
        </Show>
        <ArkCombobox.Trigger>
          {iconNode("chevron-down", { width: "16", height: "16" })}
        </ArkCombobox.Trigger>
      </ArkCombobox.Control>
      <ArkCombobox.Positioner>
        <ArkCombobox.Content>
          <ArkCombobox.Empty>No results found</ArkCombobox.Empty>
          <ArkCombobox.List>
            <For each={collection.items}>
              {(item) => (
                <ArkCombobox.Item item={item}>
                  <ArkCombobox.ItemText>{item.label}</ArkCombobox.ItemText>
                  <ArkCombobox.ItemIndicator>
                    {iconNode("check", { width: "14", height: "14" })}
                  </ArkCombobox.ItemIndicator>
                </ArkCombobox.Item>
              )}
            </For>
          </ArkCombobox.List>
        </ArkCombobox.Content>
      </ArkCombobox.Positioner>
    </ComboboxRoot>
  );
}

export const Combobox: typeof ComboboxFacade & ComboboxParts = defineFamily(ComboboxFacade, {
  ...ArkCombobox,
  Root: ComboboxRoot,
});

injectComponentStyle("combobox");
