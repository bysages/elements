<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("ai");

import { useComponentMessages } from "../config-provider/messages";
import type { AiPartProps } from "./props";

let { "aria-label": label, children, ...rest }: AiPartProps = $props();
const messages = useComponentMessages();
</script>

<div {...rest} role="log" aria-label={label ?? messages().ai.conversation} data-scope="ai" data-part="conversation">
  {@render children?.()}
</div>
