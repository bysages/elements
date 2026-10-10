import type { CollectionItem } from "@ark-ui/solid/collection";
import { createListCollection, Select as ArkSelect } from "@ark-ui/solid/select";
import type { SelectRootProps as ArkSelectRootProps } from "@ark-ui/solid/select";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import type { NativeSelectOption } from "./native";

/** Ark's Select, dressed in the paper-and-ink system: the trigger is the
 * whole control and its list dissolves open as a paper vessel, the checked
 * row taking the flat ink fill. The API is Ark's own — Root, Label, Control,
 * Trigger, ValueText, Indicator, ClearTrigger, HiddenSelect, Positioner,
 * Content, List, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */

type SelectOwnProps = {
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
};

function SelectRoot<T extends CollectionItem>(props: ArkSelectRootProps<T> & SelectOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("select", () => rest.id);
  return <ArkSelect.Root<T> {...rest} id={id()} data-size={own.size ?? "md"} />;
}

type SelectFacadeValue = string | string[];
type SelectParts = Omit<typeof ArkSelect, "Root"> & { Root: typeof SelectRoot };

function toArkValue(value: SelectFacadeValue | undefined) {
  return value === undefined || value === "" ? [] : Array.isArray(value) ? value : [value];
}

export interface SelectFacadeProps {
  value?: SelectFacadeValue;
  defaultValue?: SelectFacadeValue;
  options: NativeSelectOption[];
  multiple?: boolean;
  deselectable?: boolean;
  /** Show the clear-value control when the machine allows it. */
  clearable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  label?: string;
  /** Heading above the flat option list. */
  groupLabel?: string;
  placeholder?: string;
  name?: string;
  form?: string;
  autoComplete?: string;
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string | string[]) => void;
}

function SelectFacade(props: SelectFacadeProps) {
  injectComponentStyle("select");
  const collection = createListCollection({ items: props.options });

  return (
    <SelectRoot
      size={props.size ?? "md"}
      autoComplete={props.autoComplete}
      collection={collection}
      deselectable={props.deselectable}
      disabled={props.disabled}
      form={props.form}
      invalid={props.invalid}
      lazyMount
      multiple={props.multiple}
      unmountOnExit
      name={props.name}
      readOnly={props.readOnly}
      required={props.required}
      defaultValue={toArkValue(props.value ?? props.defaultValue)}
      {...(props.value === undefined ? {} : { value: toArkValue(props.value) })}
      onValueChange={(details: { value: string[] }) =>
        props.onValueChange?.(props.multiple ? details.value : (details.value.at(0) ?? ""))
      }
    >
      <Show when={props.label}>
        <ArkSelect.Label>{props.label}</ArkSelect.Label>
      </Show>
      <ArkSelect.Control>
        <ArkSelect.Trigger aria-label={props.label ? undefined : props.placeholder}>
          <ArkSelect.ValueText placeholder={props.placeholder} />
        </ArkSelect.Trigger>
        <Show when={props.clearable !== false}>
          <ArkSelect.ClearTrigger>
            {iconNode("x", { width: "14", height: "14" })}
          </ArkSelect.ClearTrigger>
        </Show>
        <ArkSelect.Indicator>
          {iconNode("chevrons-up-down", { width: "14", height: "14" })}
        </ArkSelect.Indicator>
      </ArkSelect.Control>
      <ArkSelect.Positioner>
        <ArkSelect.Content>
          <Show
            when={props.groupLabel}
            fallback={
              <ArkSelect.List>
                <For each={collection.items}>
                  {(item) => (
                    <ArkSelect.Item item={item}>
                      <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                      <ArkSelect.ItemIndicator>
                        {iconNode("check", { width: "14", height: "14" })}
                      </ArkSelect.ItemIndicator>
                    </ArkSelect.Item>
                  )}
                </For>
              </ArkSelect.List>
            }
          >
            <ArkSelect.ItemGroup>
              <ArkSelect.ItemGroupLabel>{props.groupLabel}</ArkSelect.ItemGroupLabel>
              <For each={collection.items}>
                {(item) => (
                  <ArkSelect.Item item={item}>
                    <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                    <ArkSelect.ItemIndicator>
                      {iconNode("check", { width: "14", height: "14" })}
                    </ArkSelect.ItemIndicator>
                  </ArkSelect.Item>
                )}
              </For>
            </ArkSelect.ItemGroup>
          </Show>
        </ArkSelect.Content>
      </ArkSelect.Positioner>
      <ArkSelect.HiddenSelect />
    </SelectRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the sized wrapper. */
export const Select: typeof SelectFacade & SelectParts = defineFamily(SelectFacade, {
  ...ArkSelect,
  Root: SelectRoot,
});

/** The platform's own list wearing the control recipe. */
export { NativeSelect, type NativeSelectOption, type NativeSelectProps } from "./native";

injectComponentStyle("select");
