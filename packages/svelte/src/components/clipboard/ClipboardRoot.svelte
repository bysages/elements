<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("clipboard");

import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
import { useElementId } from "../../internal/id";
import type { ClipboardRootProps } from "./props";

let { size = "md", children, ...rest }: ClipboardRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("clipboard", generatedId, rest.id));
</script>

<ArkClipboard.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkClipboard.Root>

