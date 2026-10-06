<script lang="ts">
import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";

import CollapsibleRoot from "./CollapsibleRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  open = $bindable(),
  label,
  disabled = false,
  children,
  ...rest
}: {
  open?: boolean;
  label?: string;
  disabled?: boolean;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/collapsible").CollapsibleRootProps = $props();
</script>

<CollapsibleRoot bind:open {disabled} {...rest}>
  <ArkCollapsible.Trigger>
    {label}
    <ArkCollapsible.Indicator><InternalIcon name="chevron-down" /></ArkCollapsible.Indicator>
  </ArkCollapsible.Trigger>
  <ArkCollapsible.Content>{@render children?.()}</ArkCollapsible.Content>
</CollapsibleRoot>
