import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";
import { injectComponentStyle } from "@bysages/core";

/**
 * Tabs — tabbed navigation.
 *
 * Parts: Root, List, Trigger, Content, Indicator (machine-positioned ink
 * bar on the list rule).
 */
export const Tabs = ArkTabs;

injectComponentStyle("tabs");
