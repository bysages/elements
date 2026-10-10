import type { CollectionItem } from "@ark-ui/react/collection";
import type { SelectRootComponentProps } from "@ark-ui/react/select";
import { createListCollection, Select as ArkSelect } from "@ark-ui/react/select";
import { injectComponentStyle } from "@bysages/core/styling";
import { useMemo } from "react";

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

function SelectRoot<T extends CollectionItem>(props: SelectRootComponentProps<T, SelectOwnProps>) {
  const id = useElementId("select", props);
  const { size = "md", ...rest } = props;
  return <ArkSelect.Root {...rest} id={id} data-size={size} />;
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

function SelectFacade({
  value,
  defaultValue,
  options,
  multiple = false,
  deselectable = false,
  clearable = true,
  disabled = false,
  invalid = false,
  required = false,
  readOnly = false,
  label,
  groupLabel,
  placeholder,
  name,
  form,
  autoComplete,
  size = "md",
  onValueChange,
}: SelectFacadeProps) {
  const collection = useMemo(() => createListCollection({ items: options }), [options]);

  return (
    <SelectRoot
      size={size}
      autoComplete={autoComplete}
      collection={collection}
      deselectable={deselectable}
      disabled={disabled}
      form={form}
      invalid={invalid}
      lazyMount
      multiple={multiple}
      unmountOnExit
      name={name}
      readOnly={readOnly}
      required={required}
      defaultValue={toArkValue(value ?? defaultValue)}
      {...(value === undefined ? {} : { value: toArkValue(value) })}
      onValueChange={(details: { value: string[] }) =>
        onValueChange?.(multiple ? details.value : (details.value.at(0) ?? ""))
      }
    >
      {label ? <ArkSelect.Label>{label}</ArkSelect.Label> : null}
      <ArkSelect.Control>
        <ArkSelect.Trigger aria-label={label ? undefined : placeholder}>
          <ArkSelect.ValueText placeholder={placeholder} />
        </ArkSelect.Trigger>
        {clearable ? (
          <ArkSelect.ClearTrigger>
            {iconNode("x", { width: 14, height: 14 })}
          </ArkSelect.ClearTrigger>
        ) : null}
        <ArkSelect.Indicator>
          {iconNode("chevrons-up-down", { width: 14, height: 14 })}
        </ArkSelect.Indicator>
      </ArkSelect.Control>
      <ArkSelect.Positioner>
        <ArkSelect.Content>
          {groupLabel ? (
            <ArkSelect.ItemGroup>
              <ArkSelect.ItemGroupLabel>{groupLabel}</ArkSelect.ItemGroupLabel>
              {collection.items.map((item) => (
                <ArkSelect.Item key={item.value} item={item}>
                  <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                  <ArkSelect.ItemIndicator>
                    {iconNode("check", { width: 14, height: 14 })}
                  </ArkSelect.ItemIndicator>
                </ArkSelect.Item>
              ))}
            </ArkSelect.ItemGroup>
          ) : (
            <ArkSelect.List>
              {collection.items.map((item) => (
                <ArkSelect.Item key={item.value} item={item}>
                  <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                  <ArkSelect.ItemIndicator>
                    {iconNode("check", { width: 14, height: 14 })}
                  </ArkSelect.ItemIndicator>
                </ArkSelect.Item>
              ))}
            </ArkSelect.List>
          )}
        </ArkSelect.Content>
      </ArkSelect.Positioner>
      <ArkSelect.HiddenSelect />
    </SelectRoot>
  );
}

SelectFacade.displayName = "SSelect";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Select = Object.assign(SelectFacade, {
  ...ArkSelect,
  Root: SelectRoot,
}) as typeof SelectFacade & SelectParts;

/** The platform's own list wearing the control recipe. */
export { NativeSelect, type NativeSelectOption, type NativeSelectProps } from "./native";

injectComponentStyle("select");
