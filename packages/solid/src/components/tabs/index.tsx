import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";
import type { TabsRootProps as ArkTabsRootProps } from "@ark-ui/solid/tabs";
import { injectComponentStyle } from "@bysages/core";
import { For, splitProps, type JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/**
 * Tabs — tabbed navigation.
 *
 * Parts: Root, List, Trigger, Content, Indicator (machine-positioned ink
 * bar on the list rule).
 */

type TabsOwnProps = {
  /** One rung of the control-height ladder for the tab rows. */
  size?: "sm" | "md" | "lg";
  /** The register: a ruled line (default), or each tab its own card. */
  variant?: "line" | "card";
};

function TabsRoot(props: ArkTabsRootProps & TabsOwnProps) {
  const [own, rest] = splitProps(props, ["size", "variant"]);
  const id = useElementId("tabs", () => rest.id);
  return (
    <ArkTabs.Root
      {...rest}
      id={id()}
      data-size={own.size ?? "md"}
      data-variant={own.variant ?? "line"}
    />
  );
}

export type TabsItem = {
  value: string;
  label: string;
  content?: JSX.Element;
};

export interface TabsFacadeProps {
  value?: string;
  defaultValue?: string;
  items: TabsItem[];
  /** The register: a ruled line (default), or each tab its own card. */
  variant?: "line" | "card";
  orientation?: "horizontal" | "vertical";
  /** One rung of the control-height ladder for the tab rows. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
}

function TabsFacade(props: TabsFacadeProps) {
  injectComponentStyle("tabs");

  return (
    <TabsRoot
      size={props.size ?? "md"}
      variant={props.variant ?? "line"}
      orientation={props.orientation ?? "horizontal"}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: string }) => props.onValueChange?.(details.value)}
    >
      <ArkTabs.List>
        <For each={props.items}>
          {(item) => <ArkTabs.Trigger value={item.value}>{item.label}</ArkTabs.Trigger>}
        </For>
        <ArkTabs.Indicator />
      </ArkTabs.List>
      <For each={props.items}>
        {(item) => <ArkTabs.Content value={item.value}>{item.content}</ArkTabs.Content>}
      </For>
    </TabsRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the sized wrapper. */
export const Tabs: typeof TabsFacade & Omit<typeof ArkTabs, "Root"> & { Root: typeof TabsRoot } =
  defineFamily(TabsFacade, {
    ...ArkTabs,
    Root: TabsRoot,
  });

injectComponentStyle("tabs");
