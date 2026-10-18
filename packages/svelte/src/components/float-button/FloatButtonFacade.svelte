<script lang="ts">
  import { injectComponentStyle } from "@bysages/core/styling";
  injectComponentStyle("float-button");

  import InternalIcon from "../../internal/InternalIcon.svelte";
  import FloatButtonRoot from "./FloatButton.svelte";
  import FloatButtonItem from "./FloatButtonItem.svelte";
  import FloatButtonTrigger from "./FloatButtonTrigger.svelte";
  import type { FloatButtonFacadeProps } from "./props";

  let {
    label,
    actions = [],
    placement = "bottom-end",
    size = "lg",
    defaultOpen = false,
    open = $bindable(defaultOpen),
    children,
    ...rest
  }: FloatButtonFacadeProps = $props();
</script>

<FloatButtonRoot bind:open {placement} {size} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <FloatButtonTrigger {label}>
      <InternalIcon name="plus" />
    </FloatButtonTrigger>
    {#each actions as action}
    <FloatButtonItem
      label={action.label}
      disabled={action.disabled ?? false}
      onclick={action.onclick}
    >
      <InternalIcon name={action.icon ?? "pencil"} />
    </FloatButtonItem>
    {/each}
  {/if}
</FloatButtonRoot>
