import { Tabs as ArkTabs } from "@ark-ui/vue/tabs";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

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

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Tabs: Omit<typeof ArkTabs, "Root"> & { Root: typeof TabsRoot } = {
  ...ArkTabs,
  Root: TabsRoot,
};
