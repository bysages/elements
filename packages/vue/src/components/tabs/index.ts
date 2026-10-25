import { Tabs as ArkTabs } from "@ark-ui/vue/tabs";
import { injectComponentStyle } from "@bysages/core/styling";
import {
  defineComponent,
  h,
  type Component,
  type PropType,
  type SetupContext,
  type VNode,
} from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { formatMessage, useComponentMessages } from "../../internal/messages";
import { Icon } from "../icon";

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
    const id = useElementId("tabs", attrs);

    return () =>
      h(
        ArkTabs.Root,
        {
          ...attrs,
          id: id.value,
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
  content?: string | VNode;
  disabled?: boolean;
  /** Show a close control for this item; `closable` on the facade sets
   * the default for every item. */
  closable?: boolean;
  /** A curated core icon name beside the label. */
  icon?: string;
};

/** The complete text tabs; nested components and custom triggers stay on
 * the anatomy. `contentless` renders only the strip for session tabs,
 * while `closable` adds an accessible sibling close control — never a
 * button nested inside a button. */
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
    /** Make the strip scroll sideways instead of wrapping or overflowing. */
    scrollable: { type: Boolean, default: false },
    /** Trigger-only tabs: session labels with no mounted panel. */
    contentless: { type: Boolean, default: false },
    /** The default close affordance for items that do not override it. */
    closable: { type: Boolean, default: false },
  },
  emits: {
    "update:modelValue": (_value: string) => true,
    close: (_item: TabsItem) => true,
  },
  setup(props, { attrs, emit, slots }: SetupContext) {
    injectComponentStyle("tabs");
    const messages = useComponentMessages();

    const close = (item: TabsItem) => {
      emit("close", item);
    };

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
          h(ArkTabs.List, { "data-scrollable": props.scrollable ? "" : undefined }, () =>
            props.items.map((item) => {
              const closable = item.closable ?? props.closable;
              const trigger = h(
                ArkTabs.Trigger,
                {
                  key: item.value,
                  value: item.value,
                  disabled: item.disabled,
                  "data-closable": closable ? "" : undefined,
                },
                () => [item.icon ? h(Icon, { name: item.icon }) : null, h("span", item.label)],
              );

              if (!closable) return trigger;

              return h("span", { key: item.value, "data-scope": "tabs", "data-part": "item" }, [
                trigger,
                h(
                  "button",
                  {
                    type: "button",
                    "data-scope": "tabs",
                    "data-part": "close",
                    "aria-label": formatMessage(messages.value.tabs.closeTab, { name: item.label }),
                    disabled: item.disabled,
                    onClick: (event: MouseEvent) => {
                      event.preventDefault();
                      event.stopPropagation();
                      close(item);
                    },
                  },
                  [h(Icon, { name: "x" })],
                ),
              ]);
            }),
          ),
          h(ArkTabs.Indicator),
          ...(props.contentless
            ? []
            : props.items.map((item) =>
                h(
                  ArkTabs.Content,
                  { key: item.value, value: item.value },
                  slots.default
                    ? () => slots.default?.({ value: item.value, item })
                    : () => item.content,
                ),
              )),
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
