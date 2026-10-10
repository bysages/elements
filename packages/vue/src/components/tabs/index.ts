import { Tabs as ArkTabs } from "@ark-ui/vue/tabs";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";

/**
 * Tabs — tabbed navigation.
 *
 * Parts: Root, List, Trigger, Content, Indicator (machine-positioned ink
 * bar on the list rule).
 */
const TabsRoot = defineComponent({
  name: "STabsRoot",
  props: {
    /** One rung of the control-height ladder for the tab rows. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    /** The register: a ruled strip, or each selection lifted into a card. */
    variant: { type: String as PropType<"line" | "card">, default: "line" },
    /** Which rail the rule rides: a strip across, or a rail down. */
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("tabs");

    return () =>
      h(
        ArkTabs.Root,
        {
          ...attrs,
          "data-size": props.size,
          "data-variant": props.variant,
          orientation: props.orientation,
        },
        slots,
      );
  },
});

export type TabsItem = {
  value: string;
  label: string;
  content?: string;
};

/** The complete text tabs; nested components and custom triggers stay on
 * the anatomy. */
const TabsFacade = defineComponent({
  name: "STabs",
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    items: { type: Array as PropType<TabsItem[]>, required: true },
    /** The register: a ruled strip, or each selection lifted into a card. */
    variant: { type: String as PropType<"line" | "card">, default: "line" },
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
    /** One rung of the control-height ladder for the tab rows. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit, slots }: SetupContext) {
    injectComponentStyle("tabs");

    return () =>
      h(
        TabsRoot,
        {
          ...attrs,
          variant: props.variant,
          orientation: props.orientation,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined ? {} : { modelValue: props.modelValue }),
          "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
        },
        () => [
          h(ArkTabs.List, () => [
            ...props.items.map((item) =>
              h(ArkTabs.Trigger, { key: item.value, value: item.value }, () => item.label),
            ),
            h(ArkTabs.Indicator),
          ]),
          ...props.items.map((item) =>
            h(
              ArkTabs.Content,
              { key: item.value, value: item.value },
              slots.default
                ? () => slots.default?.({ value: item.value, item })
                : () => item.content,
            ),
          ),
        ],
      );
  },
});

type TabsParts = Omit<typeof ArkTabs, "Root"> & { Root: typeof TabsRoot };

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Tabs = defineFamily(TabsFacade, {
  ...ArkTabs,
  Root: TabsRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof TabsFacade & TabsParts;
