/**
 * Tabs — tabbed navigation.
 *
 * Parts: Root, List, Trigger, Content, Indicator (machine-positioned ink
 * bar on the list rule).
 */
import { Tabs as ArkTabs } from "@ark-ui/svelte/tabs";

import { defineFamily } from "../../internal/family";
import TabsFacade from "./Tabs.svelte";
import TabsRoot from "./TabsRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Tabs: typeof TabsFacade &
  Omit<typeof ArkTabs, "Root"> & {
    Root: typeof TabsRoot;
  } = defineFamily(TabsFacade, {
  ...ArkTabs,
  Root: TabsRoot,
});
