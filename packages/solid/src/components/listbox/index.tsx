import type { CollectionItem } from "@ark-ui/solid/collection";
import { createListCollection, Listbox as ArkListbox } from "@ark-ui/solid/listbox";
import type { ListboxRootProps as ArkListboxRootProps } from "@ark-ui/solid/listbox";
import { injectComponentStyle } from "@bysages/core/styling";
import { createMemo, For, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
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

// The sized root keeps the list's collection generic; its return rides
// as any the way Ark's own RootComponent types do, past the checker's
// host mismatch.
const ArkRoot = ArkListbox.Root as <T extends CollectionItem>(props: ArkListboxRootProps<T>) => any;

function ListboxRoot<T extends CollectionItem>(props: ArkListboxRootProps<T> & ListboxOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("listbox", () => rest.id);
  return <ArkRoot {...rest} id={id()} data-size={own.size ?? "md"} />;
}

type ListboxOption = { label: string; value: string };
type ListboxFacadeValue = string | string[];

function toListboxValue(value: ListboxFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

/** The complete listbox behind one model value: options become rows and the
 * label names the quiet register. */
export interface ListboxFacadeProps {
  value?: ListboxFacadeValue;
  defaultValue?: ListboxFacadeValue;
  options: ListboxOption[];
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  /** One rung of the ladder for the row register and the filter field. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value?: ListboxFacadeValue) => void;
}

function ListboxFacade(props: ListboxFacadeProps) {
  injectComponentStyle("listbox");
  const collection = createMemo(() => createListCollection({ items: props.options }));

  return (
    <ListboxRoot
      size={props.size ?? "md"}
      collection={collection()}
      defaultValue={toListboxValue(props.defaultValue)}
      disabled={props.disabled}
      aria-label={props.label}
      selectionMode={props.multiple ? "multiple" : "single"}
      {...(props.value === undefined ? {} : { value: toListboxValue(props.value) })}
      onValueChange={(details) =>
        props.onValueChange?.(props.multiple ? details.value : details.value.at(0))
      }
    >
      <ArkListbox.Content>
        <For each={collection().items}>
          {(item) => (
            <ArkListbox.Item item={item}>
              <ArkListbox.ItemText>{item.label}</ArkListbox.ItemText>
              <ArkListbox.ItemIndicator>
                {iconNode("check", { width: "14", height: "14" })}
              </ArkListbox.ItemIndicator>
            </ArkListbox.Item>
          )}
        </For>
      </ArkListbox.Content>
    </ListboxRoot>
  );
}

type ListboxParts = Omit<typeof ArkListbox, "Root"> & {
  Root: typeof ListboxRoot;
};

export const Listbox: typeof ListboxFacade & ListboxParts = defineFamily(ListboxFacade, {
  ...ArkListbox,
  Root: ListboxRoot,
});

injectComponentStyle("listbox");
