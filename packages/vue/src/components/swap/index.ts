import { Swap as ArkSwap } from "@ark-ui/vue/swap";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Swap, dressed in the paper-and-ink system: two impressions
 * occupying one seal, the arriving one growing into place on the spring
 * while the departing one shrinks away. The parts — Root,
 * Indicator (type="on" | "off"), RootProvider. */
const SwapRoot = defineComponent({
  name: "SSwapRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("swap", attrs);

    return () => h(ArkSwap.Root, { ...attrs, id: id.value }, slots);
  },
}) as unknown as typeof ArkSwap.Root;

/** The one-tag path for the default check/cross impression; custom
 * transitions and indicators stay on the anatomy with `on`/`off` slots. */
const SwapFacade = defineComponent({
  name: "SSwap",
  props: { swap: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    const on = slots.on ?? (() => iconNode("check", { width: 14, height: 14 }));
    const off = slots.off ?? (() => iconNode("x", { width: 14, height: 14 }));
    return () =>
      h(SwapRoot, { ...attrs, swap: props.swap }, () => [
        h(ArkSwap.Indicator, { type: "on" }, on),
        h(ArkSwap.Indicator, { type: "off" }, off),
      ]);
  },
});

export const Swap = defineFamily(SwapFacade, {
  ...ArkSwap,
  Root: SwapRoot,
}) as unknown as typeof SwapFacade & typeof ArkSwap;

injectComponentStyle("swap");
