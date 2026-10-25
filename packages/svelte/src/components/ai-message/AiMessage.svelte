<script lang="ts" generics="MESSAGE extends AiSdkMessage">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

import type { AiSdkMessage } from "../ai";
import type { MessageProps } from "./props";

let { message, role = "assistant", children, ...rest }: MessageProps<MESSAGE> = $props();

const activeRole = $derived(message?.role ?? role);
</script>

<article
  {...rest}
  data-scope="ai"
  data-part="message"
  data-message-id={message?.id}
  data-role={activeRole}
>
  {@render children?.()}
</article>

