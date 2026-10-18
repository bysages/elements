<script lang="ts">
  import { injectComponentStyle } from "@bysages/core/styling";
  injectComponentStyle("breadcrumb");

  import { useComponentMessages } from "../config-provider/messages";
  import BreadcrumbCurrent from "./BreadcrumbCurrent.svelte";
  import BreadcrumbItem from "./BreadcrumbItem.svelte";
  import BreadcrumbLink from "./BreadcrumbLink.svelte";
  import BreadcrumbRoot from "./Breadcrumb.svelte";
  import BreadcrumbSeparator from "./BreadcrumbSeparator.svelte";
  import type { BreadcrumbFacadeProps } from "./props";

  let { items, label, "aria-label": consumerLabel, ...rest }: BreadcrumbFacadeProps =
    $props();

  const lastIndex = $derived(items.length - 1);
  const messages = useComponentMessages();
</script>

<BreadcrumbRoot aria-label={label ?? consumerLabel ?? messages().breadcrumb.label} {...rest}>
  <BreadcrumbList>
    {#each items as item, index}
      {#if index > 0}
        <BreadcrumbSeparator />
      {/if}
      {@const text = typeof item === "string" ? item : item.label}
      {@const href = typeof item === "string" ? undefined : item.href}
      <BreadcrumbItem>
        {#if index === lastIndex}
          <BreadcrumbCurrent>{text}</BreadcrumbCurrent>
        {:else}
          <BreadcrumbLink {href}>{text}</BreadcrumbLink>
        {/if}
      </BreadcrumbItem>
    {/each}
  </BreadcrumbList>
</BreadcrumbRoot>
