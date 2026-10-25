<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

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

  // The follow decision reads the pre-growth position: a scroll event
  // can only come from the reader (or our own follow), so the flag is
  // always settled before the next stream stroke lands.
  let pinned = true;
  const handleScroll = () => {
    pinned = node.scrollHeight - node.scrollTop - node.clientHeight < 96;
  };
  const observer = new MutationObserver(() => {
    if (pinned) node.scrollTop = node.scrollHeight;
  });

  node.addEventListener("scroll", handleScroll, { passive: true });
  observer.observe(node, { childList: true, subtree: true, characterData: true });
  return () => {
    node.removeEventListener("scroll", handleScroll);
    observer.disconnect();
  };
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

