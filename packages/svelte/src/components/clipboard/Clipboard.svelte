<script lang="ts">
import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";

import ClipboardRoot from "./ClipboardRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let { value = "", children, ...rest }: { value?: string; children?: import("svelte").Snippet } & import("./props").ClipboardRootProps = $props();
</script>

<ClipboardRoot {value} {...rest}>
  <ArkClipboard.Label />
  <ArkClipboard.Control>
    <ArkClipboard.Input />
    <ArkClipboard.Trigger>
      <ArkClipboard.Indicator>
        {#snippet copied()}<InternalIcon name="check" />{/snippet}
        {#snippet children()}<InternalIcon name="copy" />{/snippet}
      </ArkClipboard.Indicator>
    </ArkClipboard.Trigger>
  </ArkClipboard.Control>
  {@render children?.()}
</ClipboardRoot>

