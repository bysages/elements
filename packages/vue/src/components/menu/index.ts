import { Menu as ArkMenu } from "@ark-ui/vue/menu";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, inject, provide, type InjectionKey, type PropType } from "vue";

/** The row rung rides the context because Ark's Root renders no DOM of
 * its own — the vessel (Content) is the element the rung can land on,
 * and the Teleport breaks CSS ancestry between the two. */
const MenuSizeKey: InjectionKey<string> = Symbol("menu-size");

const MenuRoot = defineComponent({
  name: "SMenuRoot",
  props: {
    /** One rung of the control-height ladder for the vessel's rows. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { slots }) {
    provide(MenuSizeKey, props.size);
    return () => h(ArkMenu.Root, null, slots);
  },
});

const MenuContent = defineComponent({
  name: "SMenuContent",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const size = inject(MenuSizeKey, "md");
    return () => h(ArkMenu.Content, { ...attrs, "data-size": size }, slots);
  },
});

/** Menu, dressed in the paper-and-ink system: a quiet paper vessel on
 * elevation, hover as light on the row, checked items as the flat ink fill.
 * The parts — Root, Trigger, ContextTrigger, Indicator, Positioner,
 * Content, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel,
 * TriggerItem, Separator, Arrow, ArrowTip. Ark's namespace is frozen —
 * spread copies the members as data properties so Root can be the sized
 * wrapper and Content carries the rung while the rest stay Ark's own
 * parts. */
export const Menu: Omit<typeof ArkMenu, "Root" | "Content"> & {
  Root: typeof MenuRoot;
  Content: typeof MenuContent;
} = {
  ...ArkMenu,
  Root: MenuRoot,
  Content: MenuContent,
};

injectComponentStyle("menu");
