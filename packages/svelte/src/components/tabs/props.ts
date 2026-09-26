import type { TabsRootProps as ArkTabsRootProps } from "@ark-ui/svelte/tabs";

export type TabsRootProps = ArkTabsRootProps & {
  /** One rung of the control-height ladder for the tab rows. */
  size?: "sm" | "md" | "lg";
};
