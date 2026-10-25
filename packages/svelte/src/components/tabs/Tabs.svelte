<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("tabs");

import { Tabs as ArkTabs } from "@ark-ui/svelte/tabs";
import { formatMessage, useComponentMessages } from "../config-provider/messages";
import { Icon } from "../icon";

import TabsRoot from "./TabsRoot.svelte";

export type TabsItem = {
  value: string;
  label: string;
  content?: import("svelte").Snippet;
  disabled?: boolean;
  /** Show a close control for this item; `closable` on the facade sets
   * the default for every item. */
  closable?: boolean;
  /** A curated core icon name beside the label. */
  icon?: string;
};

let {
  value = $bindable(),
  defaultValue,
  items,
  variant = "line",
  orientation = "horizontal",
  size = "md",
  scrollable = false,
  contentless = false,
  closable = false,
  onClose,
  children,
  ...rest
}: {
  value?: string;
  defaultValue?: string;
  items: TabsItem[];
  variant?: "line" | "card";
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  /** Make the strip scroll sideways instead of wrapping or overflowing. */
  scrollable?: boolean;
  /** Trigger-only tabs: session labels with no mounted panel. */
  contentless?: boolean;
  /** The default close affordance for items that do not override it. */
  closable?: boolean;
  /** The request to remove a tab. */
  onClose?: (item: TabsItem) => void;
  children?: import("svelte").Snippet;
} & import("./props").TabsRootProps = $props();

const messages = useComponentMessages();
const close = (item: TabsItem) => onClose?.(item);
</script>

<!-- The complete text tabs; nested components and custom triggers stay
on the anatomy. `contentless` renders only the strip for session tabs,
while `closable` adds an accessible sibling close control — never a
button nested inside a button. -->
<TabsRoot bind:value {defaultValue} {size} data-variant={variant} {orientation} {...rest}>
  <ArkTabs.List data-scrollable={scrollable ? "" : undefined}>
    {#each items as item (item.value)}
      {@const itemClosable = item.closable ?? closable}
      {#if !itemClosable}
        <ArkTabs.Trigger value={item.value} disabled={item.disabled}>
          {#if item.icon}<Icon name={item.icon} />{/if}
          <span>{item.label}</span>
        </ArkTabs.Trigger>
      {:else}
        <span data-scope="tabs" data-part="item">
          <ArkTabs.Trigger
            value={item.value}
            disabled={item.disabled}
            data-closable=""
          >
            {#if item.icon}<Icon name={item.icon} />{/if}
            <span>{item.label}</span>
          </ArkTabs.Trigger>
          <button
            type="button"
            data-scope="tabs"
            data-part="close"
            aria-label={formatMessage(messages().tabs.closeTab, { name: item.label })}
            disabled={item.disabled}
            onclick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              close(item);
            }}
          >
            <Icon name="x" />
          </button>
        </span>
      {/if}
    {/each}
    <ArkTabs.Indicator />
  </ArkTabs.List>
  {#if !contentless}
    {#each items as item (item.value)}
      <ArkTabs.Content value={item.value}>{@render item.content?.()}</ArkTabs.Content>
    {/each}
  {/if}
  {@render children?.()}
</TabsRoot>
