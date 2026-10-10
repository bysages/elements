import type { CollectionItem } from "@ark-ui/react/collection";
import type { ComboboxRootComponentProps } from "@ark-ui/react/combobox";
import { Combobox as ArkCombobox } from "@ark-ui/react/combobox";
import { createListCollection } from "@ark-ui/react/combobox";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties } from "react";

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

function ComboboxRoot<T extends CollectionItem>(
  props: ComboboxRootComponentProps<T, ComboboxOwnProps>,
) {
  injectComponentStyle("combobox");
  const id = useElementId("combobox", props);
  const { size = "md", ...rest } = props;
  return <ArkCombobox.Root {...rest} id={id} data-size={size} />;
}

type ComboboxOption = { label: string; value: string };
type ComboboxFacadeValue = string | string[];

type ComboboxFacadeProps = {
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
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  onValueChange?: (value?: ComboboxFacadeValue) => void;
};

function toComboboxValue(value: ComboboxFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

function fromComboboxValue(value: string[], multiple: boolean | undefined) {
  return multiple ? value : value.at(0);
}

/** The complete combobox behind one model value: options become the vessel's
 * rows while typing, clearing, and selection stay on the common field path. */
function ComboboxFacade(props: ComboboxFacadeProps) {
  const {
    value,
    defaultValue,
    options,
    multiple,
    clearable = true,
    disabled,
    invalid,
    required,
    label,
    placeholder,
    size = "md",
    className,
    style,
    onValueChange,
  } = props;
  const collection = createListCollection({ items: options });

  return (
    <ComboboxRoot
      size={size}
      collection={collection}
      defaultValue={toComboboxValue(defaultValue)}
      value={toComboboxValue(value)}
      disabled={disabled}
      invalid={invalid}
      multiple={multiple}
      placeholder={placeholder}
      required={required}
      lazyMount
      unmountOnExit
      className={className}
      style={style}
      onValueChange={(event: { value: string[] }) =>
        onValueChange?.(fromComboboxValue(event.value, multiple))
      }
    >
      {label ? <ArkCombobox.Label>{label}</ArkCombobox.Label> : null}
      <ArkCombobox.Control>
        <ArkCombobox.Input placeholder={placeholder} aria-label={label ? undefined : placeholder} />
        {clearable ? (
          <ArkCombobox.ClearTrigger>
            {iconNode("x", { width: 14, height: 14 })}
          </ArkCombobox.ClearTrigger>
        ) : null}
        <ArkCombobox.Trigger>
          {iconNode("chevron-down", { width: 16, height: 16 })}
        </ArkCombobox.Trigger>
      </ArkCombobox.Control>
      <ArkCombobox.Positioner>
        <ArkCombobox.Content>
          <ArkCombobox.Empty>No results found</ArkCombobox.Empty>
          <ArkCombobox.List>
            {collection.items.map((item) => (
              <ArkCombobox.Item key={item.value} item={item}>
                <ArkCombobox.ItemText>{item.label}</ArkCombobox.ItemText>
                <ArkCombobox.ItemIndicator>
                  {iconNode("check", { width: 14, height: 14 })}
                </ArkCombobox.ItemIndicator>
              </ArkCombobox.Item>
            ))}
          </ArkCombobox.List>
        </ArkCombobox.Content>
      </ArkCombobox.Positioner>
    </ComboboxRoot>
  );
}

export const Combobox: typeof ComboboxFacade &
  Omit<typeof ArkCombobox, "Root"> & { Root: typeof ComboboxRoot } = Object.assign(ComboboxFacade, {
  ...ArkCombobox,
  Root: ComboboxRoot,
}) as typeof ComboboxFacade & Omit<typeof ArkCombobox, "Root"> & { Root: typeof ComboboxRoot };
