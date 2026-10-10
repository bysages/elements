import { Swap as ArkSwap } from "@ark-ui/solid/swap";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Swap, dressed in the paper-and-ink system: two impressions
 * occupying one seal, the arriving one growing into place on the spring
 * while the departing one shrinks away. The API is Ark's own — Root,
 * Indicator (type="on" | "off"), RootProvider. */
function SwapRoot(props: ComponentProps<typeof ArkSwap.Root>) {
  const id = useElementId("swap", () => props.id);

  return createComponent(
    ArkSwap.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const Swap: typeof SwapRoot & Omit<typeof ArkSwap, "Root"> & { Root: typeof SwapRoot } =
  defineFamily(SwapRoot, {
    ...ArkSwap,
    Root: SwapRoot,
  });
injectComponentStyle("swap");
