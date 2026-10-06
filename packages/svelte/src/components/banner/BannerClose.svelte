<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("banner");

import InternalIcon from "../../internal/InternalIcon.svelte";
import { useComponentMessages } from "../config-provider/messages";
import type { BannerCloseProps } from "./props";

let { type = "button", "aria-label": label, ...rest }: BannerCloseProps = $props();
const messages = useComponentMessages();
</script>

<!-- The quiet close: a plain square-cut button; dismissal stays the
consumer's state. -->
<button
  {...rest}
  {type}
  aria-label={label ?? messages().banner.dismiss}
  data-scope="banner"
  data-part="close"
>
  <InternalIcon name="x" />
</button>
