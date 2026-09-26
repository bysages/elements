<script lang="ts">
import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardRootProps } from "./props";

let { size = "md", children, ...rest }: ClipboardRootProps = $props();
</script>

<ArkClipboard.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkClipboard.Root>
