import { Menu as ArkMenu } from "@ark-ui/vue/menu";
import { injectComponentStyle } from "@bysages/core/styling";
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  type Component,
  type ComputedRef,
  type InjectionKey,
  type PropType,
  type SetupContext,
} from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";

/** The row rung rides the context because Ark's Root renders no DOM of
 * its own — the vessel (Content) is the element the rung can land on,
 * and the popup breaks CSS ancestry between the two. */
const MenuSizeKey: InjectionKey<ComputedRef<string>> = Symbol("menu-size");

const MenuRoot = defineComponent({
  name: "SMenuRoot",
  inheritAttrs: false,
  props: {
    /** One rung of the control-height ladder for the vessel's rows. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("menu");

    const id = useElementId("menu", attrs);

    // The ref rides the context so a bound size retunes an open vessel.
    provide(
      MenuSizeKey,
      computed(() => props.size),
    );
    return () =>
      h(withPresenceRoot(ArkMenu.Root), withPresenceEnter({ ...attrs, id: id.value }), slots);
  },
});

const MenuContent = defineComponent({
  name: "SMenuContent",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const size = inject(
      MenuSizeKey,
      computed(() => "md"),
    );
    return () => h(ArkMenu.Content, { ...attrs, "data-size": size.value }, slots);
  },
});

/** One plain row in the callable menu; richer checkboxes, radios, and
 * nested menus stay on the anatomy. */
export interface MenuItemOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type MenuPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

/** The common path: a named trigger and a flat list of actions. */
const MenuFacade = defineComponent({
  name: "SMenu",
  inheritAttrs: false,
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: undefined },
    trigger: { type: String, required: true },
    items: { type: Array as PropType<MenuItemOption[]>, required: true },
    disabled: { type: Boolean, default: false },
    placement: { type: String as PropType<MenuPlacement>, default: "bottom-start" },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["select", "update:open"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("menu");

    return () =>
      h(
        MenuRoot,
        {
          ...ctx.attrs,
          size: props.size,
          ...(props.open === undefined ? {} : { open: props.open }),
          ...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen }),
          positioning: { placement: props.placement },
          onSelect: (details: { value: string }) => ctx.emit("select", details.value),
          "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
        },
        () => [
          h(ArkMenu.Trigger, { disabled: props.disabled }, () => [
            props.trigger,
            h(ArkMenu.Indicator, () => iconNode("chevron-down", { width: 14, height: 14 })),
          ]),
          h(ArkMenu.Positioner, () =>
            h(MenuContent, () =>
              props.items.map((item) =>
                h(
                  ArkMenu.Item,
                  { key: item.value, value: item.value, disabled: item.disabled },
                  () => item.label,
                ),
              ),
            ),
          ),
        ],
      );
  },
});

/** Menu, dressed in the paper-and-ink system: a quiet paper vessel on
 * elevation, hover as light on the row, checked items as the flat ink fill.
 * The parts — Root, Trigger, ContextTrigger, Indicator, Positioner,
 * Content, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel,
 * TriggerItem, Separator, Arrow, ArrowTip. */
export const Menu = defineFamily(MenuFacade, {
  ...ArkMenu,
  Root: MenuRoot,
  Content: MenuContent,
} as unknown as {
  Root: Component;
} & Record<string, Component>) as typeof MenuFacade &
  Omit<typeof ArkMenu, "Root" | "Content"> & {
    Root: typeof MenuRoot;
    Content: typeof MenuContent;
  };
