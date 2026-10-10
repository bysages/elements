import { createListCollection } from "@ark-ui/vue/collection";
import { Listbox as ArkListbox } from "@ark-ui/vue/listbox";
import { injectComponentStyle } from "@bysages/core/styling";
import {
  computed,
  defineComponent,
  h,
  type Component,
  type PropType,
  type SetupContext,
} from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Listbox, dressed in the paper-and-ink system: quiet rows of ink
 * where the checked row alone takes the flat primary fill. The parts — Root, Label, Input, Content, Empty, Item, ItemText,
 * ItemIndicator, ItemGroup, ItemGroupLabel, ValueText; the collections
 * live in the shared collection module. */

const ListboxRoot = defineComponent({
  name: "SListboxRoot",
  props: {
    /** One rung of the ladder for the row register and the filter field. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("listbox", attrs);
    injectComponentStyle("listbox");

    // `as never` sidesteps the h() overload the collection prop's generic
    // cannot unroll — see the select preset for the same turn.
    return () =>
      h(ArkListbox.Root as never, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

type ListboxOption = { label: string; value: string };
type ListboxFacadeValue = string | string[];

function toListboxValue(value: ListboxFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

/** The complete listbox behind one model value: options become rows and the
 * label names the quiet register. */
const ListboxFacade = defineComponent({
  name: "SListbox",
  props: {
    modelValue: {
      type: [String, Array] as PropType<ListboxFacadeValue>,
      default: undefined,
    },
    defaultValue: {
      type: [String, Array] as PropType<ListboxFacadeValue>,
      default: undefined,
    },
    options: { type: Array as PropType<ListboxOption[]>, required: true },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: {
    "update:modelValue": (_value: ListboxFacadeValue | undefined) => true,
  },
  setup(props, { attrs, emit }: SetupContext) {
    const collection = computed(() => createListCollection({ items: props.options }));

    return () => {
      const collectionValue = collection.value;
      const modelValue = toListboxValue(props.modelValue);
      return h(
        ListboxRoot,
        {
          ...attrs,
          collection: collectionValue,
          defaultValue: toListboxValue(props.defaultValue),
          disabled: props.disabled,
          label: props.label,
          selectionMode: props.multiple ? "multiple" : "single",
          ...(modelValue === undefined ? {} : { modelValue }),
          "onUpdate:modelValue": (value: string[]) =>
            emit("update:modelValue", props.multiple ? value : value.at(0)),
        } as never,
        () =>
          h(ArkListbox.Content, () =>
            collectionValue.items.map((item: { label: string; value: string }) =>
              h(ArkListbox.Item, { key: item.value, item }, () => [
                h(ArkListbox.ItemText, () => item.label),
                h(ArkListbox.ItemIndicator, () => iconNode("check", { width: 14, height: 14 })),
              ]),
            ),
          ),
      );
    };
  },
});

export const Listbox = defineFamily(ListboxFacade, {
  ...ArkListbox,
  Root: ListboxRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof ListboxFacade &
  Omit<typeof ArkListbox, "Root"> & { Root: typeof ListboxRoot };
