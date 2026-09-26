import { Tabs as ArkTabs } from "@ark-ui/react/tabs";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type TabsRootProps = ComponentProps<typeof ArkTabs.Root> & {
  /** One rung of the control-height ladder for the tab rows. */
  size?: "sm" | "md" | "lg";
};

function TabsRoot({ size = "md", ...rest }: TabsRootProps) {
  return <ArkTabs.Root {...rest} data-size={size} />;
}

/**
 * Tabs — tabbed navigation.
 *
 * Parts: Root, List, Trigger, Content, Indicator (machine-positioned ink
 * bar on the list rule).
 */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Tabs: Omit<typeof ArkTabs, "Root"> & { Root: typeof TabsRoot } = {
  ...ArkTabs,
  Root: TabsRoot,
};

injectComponentStyle("tabs");
