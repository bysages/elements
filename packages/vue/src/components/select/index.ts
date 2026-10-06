import { createListCollection, Select as ArkSelect } from "@ark-ui/vue/select";
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
import type { NativeSelectOption } from "./native";

/** Select, dressed in the paper-and-ink system: the trigger is the
 * whole control and its list dissolves open as a paper vessel, the checked
 * row taking the flat ink fill. The parts — Root, Label, Control,
 * Trigger, ValueText, Indicator, ClearTrigger, HiddenSelect, Positioner,
 * Content, List, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */

const SelectRoot = defineComponent({
  name: "SSelectRoot",
  props: {
    /** One rung of the control-height ladder for the trigger. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["enterComplete", "exitComplete"],
  setup(props, { attrs, slots }) {
    const id = useElementId("select", attrs);

    injectComponentStyle("select");

    // `as never` sidesteps the h() overload the collection prop's generic
    // cannot unroll — see the autocomplete preset for the same turn.
    return () =>
      h(ArkSelect.Root as never, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

type SelectFacadeValue = string | string[];

type SelectParts = Omit<typeof ArkSelect, "Root"> & { Root: typeof SelectRoot };

function toArkValue(value: SelectFacadeValue | undefined) {
  return value === undefined || value === "" ? [] : Array.isArray(value) ? value : [value];
}

/** The complete select behind one model value: options become the vessel's
 * rows, the label names the field when present, and single values reduce
 * the wrapped single-value list back to a scalar. */
const SelectFacade = defineComponent({
  name: "SSelect",
  props: {
    modelValue: { type: [String, Array] as PropType<SelectFacadeValue>, default: undefined },
    defaultValue: { type: [String, Array] as PropType<SelectFacadeValue>, default: undefined },
    options: { type: Array as PropType<NativeSelectOption[]>, required: true },
    multiple: { type: Boolean, default: false },
    deselectable: { type: Boolean, default: false },
    /** Show the clear-value control when the machine allows it. */
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    /** Heading above the flat option list. */
    groupLabel: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    name: { type: String, default: undefined },
    form: { type: String, default: undefined },
    autoComplete: { type: String, default: undefined },
    /** One rung of the control-height ladder for the trigger. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("select");
    const collection = computed(() => createListCollection({ items: props.options }));

    return () => {
      const collectionValue = collection.value;
      return h(
        SelectRoot,
        {
          ...attrs,
          autoComplete: props.autoComplete,
          collection: collectionValue,
          deselectable: props.deselectable,
          disabled: props.disabled,
          form: props.form,
          invalid: props.invalid,
          lazyMount: true,
          multiple: props.multiple,
          unmountOnExit: true,
          name: props.name,
          readOnly: props.readOnly,
          required: props.required,
          defaultValue: toArkValue(props.modelValue ?? props.defaultValue),
          ...(props.modelValue === undefined ? {} : { modelValue: toArkValue(props.modelValue) }),
          "onUpdate:modelValue": (value: string[]) =>
            emit("update:modelValue", props.multiple ? value : (value.at(0) ?? "")),
        } as never,
        () => [
          ...(props.label ? [h(ArkSelect.Label, () => props.label)] : []),
          h(ArkSelect.Control, () => [
            h(ArkSelect.Trigger, props.label ? {} : { "aria-label": props.placeholder }, () =>
              h(ArkSelect.ValueText, { placeholder: props.placeholder }),
            ),
            ...(props.clearable
              ? [h(ArkSelect.ClearTrigger, () => iconNode("x", { width: 14, height: 14 }))]
              : []),
            h(ArkSelect.Indicator, () => iconNode("chevrons-up-down", { width: 14, height: 14 })),
          ]),
          h(ArkSelect.Positioner, () =>
            h(ArkSelect.Content, () =>
              props.groupLabel
                ? h(ArkSelect.ItemGroup, () => [
                    h(ArkSelect.ItemGroupLabel, () => props.groupLabel),
                    ...collectionValue.items.map((item) =>
                      h(ArkSelect.Item, { key: item.value, item }, () => [
                        h(ArkSelect.ItemText, () => item.label),
                        h(ArkSelect.ItemIndicator, () =>
                          iconNode("check", { width: 14, height: 14 }),
                        ),
                      ]),
                    ),
                  ])
                : h(ArkSelect.List, () =>
                    collectionValue.items.map((item) =>
                      h(ArkSelect.Item, { key: item.value, item }, () => [
                        h(ArkSelect.ItemText, () => item.label),
                        h(ArkSelect.ItemIndicator, () =>
                          iconNode("check", { width: 14, height: 14 }),
                        ),
                      ]),
                    ),
                  ),
            ),
          ),
          h(ArkSelect.HiddenSelect),
        ],
      );
    };
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Select = defineFamily(SelectFacade, {
  ...ArkSelect,
  Root: SelectRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof SelectFacade &
  SelectParts;

export { NativeSelect } from "./native";
export type { NativeSelectOption } from "./native";
