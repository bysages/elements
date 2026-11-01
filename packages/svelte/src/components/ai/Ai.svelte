<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

import { createConversationFollower } from "@bysages/core";
import { useComponentMessages } from "../config-provider/messages";
import type { AiConversationProps } from "./props";

let {
  "aria-label": label,
  autoScroll = true,
  children,
  ...rest
}: AiConversationProps = $props();
const messages = useComponentMessages();

let rootEl = $state<HTMLElement | null>(null);

$effect(() => {
  const node = rootEl;
  if (!node || !autoScroll) return;

  return createConversationFollower(node);
});
</script>

<div
  bind:this={rootEl}
  {...rest}
  role="log"
  aria-label={label ?? messages().ai.conversation}
  data-scope="ai"
  data-part="conversation"
>
  {@render children?.()}
</div>

