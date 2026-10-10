<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

import type { AttachmentsProps } from "./props";

let { children, ...rest }: AttachmentsProps = $props();
</script>

<!-- The row the files ride in — a wrapping line of chips. -->
<span {...rest} data-scope="ai" data-part="attachments">
  {@render children?.()}
</span>

