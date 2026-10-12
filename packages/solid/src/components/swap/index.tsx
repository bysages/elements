import { Swap as ArkSwap } from "@ark-ui/solid/swap";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps, type JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
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

export interface SwapFacadeProps {
  swap?: boolean;
  on?: JSX.Element;
  off?: JSX.Element;
}

/** The one-tag path for the default check/cross impression; custom
 * transitions and indicators stay on the anatomy with `on`/`off` props. */
function SwapFacade(props: SwapFacadeProps) {
  return (
    <SwapRoot swap={props.swap ?? false}>
      <ArkSwap.Indicator type="on">
        {props.on ?? iconNode("check", { width: "14", height: "14" })}
      </ArkSwap.Indicator>
      <ArkSwap.Indicator type="off">
        {props.off ?? iconNode("x", { width: "14", height: "14" })}
      </ArkSwap.Indicator>
    </SwapRoot>
  );
}

export const Swap: typeof SwapFacade & Omit<typeof ArkSwap, "Root"> & { Root: typeof SwapRoot } =
  defineFamily(SwapFacade, {
    ...ArkSwap,
    Root: SwapRoot,
  });
injectComponentStyle("swap");
