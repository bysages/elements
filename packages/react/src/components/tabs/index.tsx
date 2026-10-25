import { Tabs as ArkTabs } from "@ark-ui/react/tabs";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, ReactNode } from "react";

import { useElementId } from "../../internal/id";
import { formatMessage, useComponentMessages } from "../../internal/messages";
import { Icon } from "../icon";

export type TabsItem = {
  value: string;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
  closable?: boolean;
  icon?: string;
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
  className?: string;
  scrollable?: boolean;
  contentless?: boolean;
  closable?: boolean;
  onValueChange?: (value: string) => void;
  onClose?: (item: TabsItem) => void;
}

function TabsFacade({
  value,
  defaultValue,
  items,
  variant = "line",
  orientation = "horizontal",
  size = "md",
  className,
  scrollable = false,
  contentless = false,
  closable = false,
  onValueChange,
  onClose,
}: TabsFacadeProps) {
  const messages = useComponentMessages();

  return (
    <TabsRoot
      className={className}
      size={size}
      variant={variant}
      orientation={orientation}
      defaultValue={defaultValue}
      {...(value === undefined ? {} : { value })}
      onValueChange={(details: { value: string }) => onValueChange?.(details.value)}
    >
      <ArkTabs.List data-scrollable={scrollable ? "" : undefined}>
        {items.map((item) => {
          const itemClosable = item.closable ?? closable;
          const trigger = (
            <ArkTabs.Trigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              data-closable={itemClosable ? "" : undefined}
            >
              {item.icon ? <Icon name={item.icon} /> : null}
              <span>{item.label}</span>
            </ArkTabs.Trigger>
          );

          if (!itemClosable) return trigger;

          return (
            <span key={item.value} data-scope="tabs" data-part="item">
              {trigger}
              <button
                type="button"
                data-scope="tabs"
                data-part="close"
                aria-label={formatMessage(messages.tabs.closeTab, { name: item.label })}
                disabled={item.disabled}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onClose?.(item);
                }}
              >
                <Icon name="x" />
              </button>
            </span>
          );
        })}
        <ArkTabs.Indicator />
      </ArkTabs.List>
      {!contentless &&
        items.map((item) => (
          <ArkTabs.Content key={item.value} value={item.value}>
            {item.content}
          </ArkTabs.Content>
        ))}
    </TabsRoot>
  );
}

TabsFacade.displayName = "STabs";

type TabsRootProps = ComponentProps<typeof ArkTabs.Root> & {
  /** One rung of the control-height ladder for the tab rows. */
  size?: "sm" | "md" | "lg";
  /** The register: a ruled line (default), or each tab its own card. */
  variant?: "line" | "card";
};

function TabsRoot({ size = "md", variant = "line", ...rest }: TabsRootProps) {
  const id = useElementId("tabs", rest);
  return <ArkTabs.Root {...rest} id={id} data-size={size} data-variant={variant} />;
}

/**
 * Tabs — tabbed navigation.
 *
 * Parts: Root, List, Trigger, Content, Indicator (machine-positioned ink
 * bar on the list rule).
 */
type TabsParts = Omit<typeof ArkTabs, "Root"> & { Root: typeof TabsRoot };

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Tabs = Object.assign(TabsFacade, {
  ...ArkTabs,
  Root: TabsRoot,
}) as typeof TabsFacade & TabsParts;

injectComponentStyle("tabs");
