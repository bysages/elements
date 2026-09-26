import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";
import type { TabsRootProps as ArkTabsRootProps } from "@ark-ui/solid/tabs";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/**
 * Tabs — tabbed navigation.
 *
 * Parts: Root, List, Trigger, Content, Indicator (machine-positioned ink
 * bar on the list rule).
 */

type TabsOwnProps = {
  /** One rung of the control-height ladder for the tab rows. */
  size?: "sm" | "md" | "lg";
};

function TabsRoot(props: ArkTabsRootProps & TabsOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkTabs.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Tabs: Omit<typeof ArkTabs, "Root"> & { Root: typeof TabsRoot } = {
  ...ArkTabs,
  Root: TabsRoot,
};

injectComponentStyle("tabs");
