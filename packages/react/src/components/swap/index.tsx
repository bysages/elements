import { Swap as ArkSwap } from "@ark-ui/react/swap";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Swap, dressed in the paper-and-ink system: two impressions
 * occupying one seal, the arriving one growing into place on the spring
 * while the departing one shrinks away. The parts — Root,
 * Indicator (type="on" | "off"), RootProvider. */
function SwapRoot(props: ComponentProps<typeof ArkSwap.Root>) {
  const id = useElementId("swap", props);

  return <ArkSwap.Root {...props} id={id} />;
}

interface SwapFacadeProps {
  swap?: boolean;
  on?: ReactNode;
  off?: ReactNode;
  children?: ReactNode;
}

/** The one-tag path for the default check/cross impression; custom
 * transitions and indicators stay on the anatomy. */
function SwapFacade({ swap = false, on, off }: SwapFacadeProps) {
  return (
    <SwapRoot swap={swap}>
      <ArkSwap.Indicator type="on">{on ?? iconNode("check")}</ArkSwap.Indicator>
      <ArkSwap.Indicator type="off">{off ?? iconNode("x")}</ArkSwap.Indicator>
    </SwapRoot>
  );
}

export const Swap = Object.assign(SwapFacade, {
  ...ArkSwap,
  Root: SwapRoot as unknown as typeof ArkSwap.Root,
}) as typeof SwapFacade & typeof ArkSwap;

injectComponentStyle("swap");
