import type { CollectionItem } from "@ark-ui/react/collection";
import type { ListboxRootComponentProps } from "@ark-ui/react/listbox";
import { Listbox as ArkListbox } from "@ark-ui/react/listbox";
import { createListCollection } from "@ark-ui/react/listbox";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Listbox, dressed in the paper-and-ink system: quiet rows of ink
 * where the checked row alone takes the flat primary fill. The API is
 * Ark's own — Root, Label, Input, Content, Empty, Item, ItemText,
 * ItemIndicator, ItemGroup, ItemGroupLabel, ValueText, plus
 * createListCollection. */

type ListboxOwnProps = {
  /** One rung of the ladder for the row register and the filter field. */
  size?: "sm" | "md" | "lg";
};

function ListboxRoot<T extends CollectionItem>(
  props: ListboxRootComponentProps<T, ListboxOwnProps>,
) {
  injectComponentStyle("listbox");
  const id = useElementId("listbox", props);
  const { size = "md", ...rest } = props;
  return <ArkListbox.Root {...rest} id={id} data-size={size} />;
}

type ListboxOption = { label: string; value: string };
type ListboxFacadeValue = string | string[];

type ListboxFacadeProps = {
  value?: ListboxFacadeValue;
  defaultValue?: ListboxFacadeValue;
  options: ListboxOption[];
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  onValueChange?: (value?: ListboxFacadeValue) => void;
};

function toListboxValue(value: ListboxFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

/** The complete listbox behind one model value: options become rows and the
 * label names the quiet register. */
function ListboxFacade(props: ListboxFacadeProps) {
  const {
    value,
    defaultValue,
    options,
    multiple,
    disabled,
    label,
    size = "md",
    className,
    style,
    onValueChange,
  } = props;
  const collection = createListCollection({ items: options });

  return (
    <ListboxRoot
      size={size}
      collection={collection}
      defaultValue={toListboxValue(defaultValue)}
      value={toListboxValue(value)}
      disabled={disabled}
      selectionMode={multiple ? "multiple" : "single"}
      className={className}
      style={style}
      onValueChange={(event: { value: string[] }) =>
        onValueChange?.(multiple ? event.value : event.value.at(0))
      }
    >
      {label ? <ArkListbox.Label>{label}</ArkListbox.Label> : null}
      <ArkListbox.Content>
        {collection.items.map((item) => (
          <ArkListbox.Item key={item.value} item={item}>
            <ArkListbox.ItemText>{item.label}</ArkListbox.ItemText>
            <ArkListbox.ItemIndicator>
              {iconNode("check", { width: 14, height: 14 })}
            </ArkListbox.ItemIndicator>
          </ArkListbox.Item>
        ))}
      </ArkListbox.Content>
    </ListboxRoot>
  );
}

export const Listbox: typeof ListboxFacade &
  Omit<typeof ArkListbox, "Root"> & { Root: typeof ListboxRoot } = Object.assign(ListboxFacade, {
  ...ArkListbox,
  Root: ListboxRoot,
}) as typeof ListboxFacade & Omit<typeof ArkListbox, "Root"> & { Root: typeof ListboxRoot };

export { createListCollection };
