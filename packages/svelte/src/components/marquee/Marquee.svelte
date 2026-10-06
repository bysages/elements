<script lang="ts">
import { Marquee as ArkMarquee } from "@ark-ui/svelte/marquee";

import MarqueeRoot from "./MarqueeRoot.svelte";

export type MarqueeItem = string | { label: string };

let { items, spacing, speed, label, children, ...rest }: {
  items: MarqueeItem[];
  spacing?: string;
  speed?: number;
  label?: string;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/marquee").MarqueeRootProps = $props();

const labels = $derived(items.map((item) => (typeof item === "string" ? item : item.label)));
</script>

<MarqueeRoot aria-label={label} {spacing} {speed} {...rest}>
  <ArkMarquee.Viewport>
    <ArkMarquee.Content>
      {#each labels as item, index (`${item}-${index}`)}
        <ArkMarquee.Item>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 3 9l9 12 9-12-9-6Z" /></svg>
          <span>{item}</span>
        </ArkMarquee.Item>
      {/each}
    </ArkMarquee.Content>
  </ArkMarquee.Viewport>
  {@render children?.()}
</MarqueeRoot>
