<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";

import { useComponentMessages } from "../config-provider/messages";
import type { AiJumpToLatestProps } from "./props";

injectComponentStyle("ai");

let { threshold = 96, onjump, children, ...rest }: AiJumpToLatestProps = $props();

const messages = useComponentMessages();

let buttonEl = $state<HTMLElement | null>(null);
let visible = $state(false);

$effect(() => {
  const button = buttonEl;
  if (!button) return;
  const conversation = button.closest<HTMLElement>(
    '[data-scope="ai"][data-part="conversation"]',
  );
  const measure = () => {
    if (!conversation) return;
    visible =
      conversation.scrollHeight - conversation.scrollTop - conversation.clientHeight > threshold;
  };

  measure();
  conversation?.addEventListener("scroll", measure, { passive: true });
  return () => conversation?.removeEventListener("scroll", measure);
});

const jump = () => {
  const conversation = buttonEl?.closest<HTMLElement>(
    '[data-scope="ai"][data-part="conversation"]',
  );
  if (conversation) conversation.scrollTop = conversation.scrollHeight;
  onjump?.();
};
</script>

<button
  bind:this={buttonEl}
  {...rest}
  type="button"
  data-scope="ai"
  data-part="jump-to-latest"
  data-visible={visible ? "" : undefined}
  tabindex={visible ? 0 : -1}
  aria-label={messages().ai.jumpToLatest}
  onclick={jump}
>
  {#if children}
    {@render children()}
  {:else}
    {messages().ai.jumpToLatest}
  {/if}
</button>
