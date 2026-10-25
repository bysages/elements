import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";
import type { TabsRootProps as ArkTabsRootProps } from "@ark-ui/solid/tabs";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps, type JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";
import {
  formatComponentMessage,
  useComponentMessages,
} from "../config-provider/use-component-messages";
import { Icon } from "../icon";

type TabsOwnProps = {
  size?: "sm" | "md" | "lg";
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
  disabled?: boolean;
  closable?: boolean;
  icon?: string;
};

export interface TabsFacadeProps {
  value?: string;
  defaultValue?: string;
  items: TabsItem[];
  variant?: "line" | "card";
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  scrollable?: boolean;
  contentless?: boolean;
  closable?: boolean;
  onValueChange?: (value: string) => void;
  onClose?: (item: TabsItem) => void;
}

function TabsFacade(props: TabsFacadeProps) {
  injectComponentStyle("tabs");
  const messages = useComponentMessages();

  return (
    <TabsRoot
      size={props.size ?? "md"}
      variant={props.variant ?? "line"}
      orientation={props.orientation ?? "horizontal"}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: string }) => props.onValueChange?.(details.value)}
    >
      <ArkTabs.List data-scrollable={props.scrollable ? "" : undefined}>
        <For each={props.items}>
          {(item) => {
            const closable = item.closable ?? props.closable;
            const trigger = (
              <ArkTabs.Trigger
                value={item.value}
                disabled={item.disabled}
                data-closable={closable ? "" : undefined}
              >
                {item.icon ? <Icon name={item.icon} /> : null}
                <span>{item.label}</span>
              </ArkTabs.Trigger>
            );

            if (!closable) return trigger;

            return (
              <span data-scope="tabs" data-part="item">
                {trigger}
                <button
                  type="button"
                  data-scope="tabs"
                  data-part="close"
                  aria-label={formatComponentMessage(messages().tabs.closeTab, {
                    name: item.label,
                  })}
                  disabled={item.disabled}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    props.onClose?.(item);
                  }}
                >
                  <Icon name="x" />
                </button>
              </span>
            );
          }}
        </For>
        <ArkTabs.Indicator />
      </ArkTabs.List>
      <Show when={!props.contentless}>
        <For each={props.items}>
          {(item) => <ArkTabs.Content value={item.value}>{item.content}</ArkTabs.Content>}
        </For>
      </Show>
    </TabsRoot>
  );
}

export const Tabs: typeof TabsFacade & Omit<typeof ArkTabs, "Root"> & { Root: typeof TabsRoot } =
  defineFamily(TabsFacade, {
    ...ArkTabs,
    Root: TabsRoot,
  });

injectComponentStyle("tabs");
