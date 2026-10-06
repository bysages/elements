import { ToggleGroup as ArkToggleGroup } from "@ark-ui/vue/toggle-group";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** ToggleGroup, dressed in the paper-and-ink system: a hairline tray
 * of quiet seals where the pressed item takes the flat ink fill. The parts — Root, Item. */
const ToggleGroupRoot = defineComponent({
  name: "SToggleGroupRoot",
  props: {
    /** One rung of the control-height ladder for the items. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("toggle-group", attrs);
    injectComponentStyle("toggle-group");

    return () => h(ArkToggleGroup.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

export type ToggleGroupItem = {
  value: string;
  label: string;
  /** A built-in core-registry icon; omit it to render the label as text. */
  icon?: string;
  disabled?: boolean;
};

type ToggleValue = string | string[];

function toArkValue(value: ToggleValue | undefined) {
  return value === undefined ? [] : Array.isArray(value) ? value : [value];
}

/** The complete toggle group: labels or curated icons share the same tray. */
const ToggleGroupFacade = defineComponent({
  name: "SToggleGroup",
  props: {
    modelValue: {
      type: [String, Array] as PropType<ToggleValue>,
      default: undefined,
    },
    defaultValue: {
      type: [String, Array] as PropType<ToggleValue>,
      default: undefined,
    },
    items: { type: Array as PropType<ToggleGroupItem[]>, required: true },
    label: { type: String, default: undefined },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    /** One rung of the control-height ladder for the items. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("toggle-group");

    return () =>
      h(
        ToggleGroupRoot,
        {
          ...attrs,
          "aria-label": props.label,
          disabled: props.disabled,
          multiple: props.multiple,
          defaultValue: toArkValue(props.defaultValue),
          ...(props.modelValue === undefined ? {} : { modelValue: toArkValue(props.modelValue) }),
          "onUpdate:modelValue": (value: string[]) =>
            emit("update:modelValue", props.multiple ? value : (value.at(0) ?? "")),
        },
        () =>
          props.items.map((item) =>
            h(
              ArkToggleGroup.Item,
              {
                key: item.value,
                value: item.value,
                disabled: item.disabled,
                "aria-label": item.label,
                "data-variant": item.icon ? "icon" : "text",
              },
              () => (item.icon ? iconNode(item.icon) : item.label),
            ),
          ),
      );
  },
});

type ToggleGroupParts = Omit<typeof ArkToggleGroup, "Root"> & {
  Root: typeof ToggleGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const ToggleGroup = defineFamily(ToggleGroupFacade, {
  ...ArkToggleGroup,
  Root: ToggleGroupRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof ToggleGroupFacade &
  ToggleGroupParts;
