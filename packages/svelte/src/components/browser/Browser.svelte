<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("browser");

type Props = HTMLAttributes<HTMLDivElement>;

let { children, ...rest }: Props = $props();
</script>

<!-- A browser window as a vessel: title bar, lamps, address well, body. -->
<div {...rest} data-scope="browser" data-part="root">
  {@render children?.()}
</div>
