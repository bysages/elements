import { createListCollection } from "@ark-ui/vue/collection";
import { Combobox as ArkCombobox } from "@ark-ui/vue/combobox";
import { injectComponentStyle } from "@bysages/core";
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

/** Combobox, dressed in the paper-and-ink system: the field carries
 * the control recipe and its matches dissolve open as a paper vessel, the
 * checked row taking the flat ink fill. The parts — Root, Label,
 * Control, Input, Trigger, ClearTrigger, Positioner, Content, List, Empty,
 * Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */
const ComboboxRoot = defineComponent({
  name: "SComboboxRoot",
  props: {
    /** One rung of the control-height ladder for the field row. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("combobox", attrs);
    injectComponentStyle("combobox");

    return () => h(ArkCombobox.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

type ComboboxOption = { label: string; value: string };
type ComboboxFacadeValue = string | string[];

function toComboboxValue(value: ComboboxFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

function fromComboboxValue(value: string[], multiple: boolean) {
  return multiple ? value : value.at(0);
}

/** The complete combobox behind one model value: options become the vessel's
 * rows while typing, clearing, and selection stay on the common field path. */
const ComboboxFacade = defineComponent({
  name: "SCombobox",
  props: {
    modelValue: {
      type: [String, Array] as PropType<ComboboxFacadeValue>,
      default: undefined,
    },
    defaultValue: {
      type: [String, Array] as PropType<ComboboxFacadeValue>,
      default: undefined,
    },
    options: { type: Array as PropType<ComboboxOption[]>, required: true },
    multiple: { type: Boolean, default: false },
    /** Show the clear-value control when the machine allows it. */
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    const collection = computed(() => createListCollection({ items: props.options }));

    return () => {
      const collectionValue = collection.value;
      const modelValue = toComboboxValue(props.modelValue);
      return h(
        ComboboxRoot,
        {
          ...attrs,
          collection: collectionValue,
          defaultValue: toComboboxValue(props.defaultValue),
          disabled: props.disabled,
          invalid: props.invalid,
          multiple: props.multiple,
          placeholder: props.placeholder,
          required: props.required,
          lazyMount: true,
          unmountOnExit: true,
          ...(modelValue === undefined ? {} : { modelValue }),
          "onUpdate:modelValue": (value: string[]) =>
            emit("update:modelValue", fromComboboxValue(value, props.multiple)),
        } as never,
        () => [
          ...(props.label ? [h(ArkCombobox.Label, () => props.label)] : []),
          h(ArkCombobox.Control, () => [
            h(
              ArkCombobox.Input as never,
              props.label
                ? { placeholder: props.placeholder }
                : {
                    "aria-label": props.placeholder,
                    placeholder: props.placeholder,
                  },
            ),
            ...(props.clearable
              ? [h(ArkCombobox.ClearTrigger, () => iconNode("x", { width: 14, height: 14 }))]
              : []),
            h(ArkCombobox.Trigger, () => iconNode("chevron-down", { width: 16, height: 16 })),
          ]),
          h(ArkCombobox.Positioner, () =>
            h(ArkCombobox.Content, () =>
              h(ArkCombobox.List, () => [
                h(ArkCombobox.Empty, () => "No results found"),
                ...collectionValue.items.map((item: { label: string; value: string }) =>
                  h(ArkCombobox.Item, { key: item.value, item }, () => [
                    h(ArkCombobox.ItemText, () => item.label),
                    h(ArkCombobox.ItemIndicator, () =>
                      iconNode("check", { width: 14, height: 14 }),
                    ),
                  ]),
                ),
              ]),
            ),
          ),
        ],
      );
    };
  },
});

export const Combobox = defineFamily(ComboboxFacade, {
  ...ArkCombobox,
  Root: ComboboxRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof ComboboxFacade &
  Omit<typeof ArkCombobox, "Root"> & { Root: typeof ComboboxRoot };
