<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("ai");

import { useComponentMessages } from "../config-provider/messages";
import type { AiPartProps } from "./props";

let { "aria-label": label, children, ...rest }: AiPartProps = $props();
const messages = useComponentMessages();
</script>

<span {...rest} role="status" aria-label={label ?? messages().ai.loading} data-scope="ai" data-part="loader">
  {@render children?.()}
</span>
