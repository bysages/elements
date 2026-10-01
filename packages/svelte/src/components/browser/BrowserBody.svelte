<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("browser");

type Props = HTMLAttributes<HTMLDivElement>;

let { children, ...rest }: Props = $props();
</script>

<!-- Whatever the site hangs in the window. -->
<div {...rest} data-scope="browser" data-part="body">
  {@render children?.()}
</div>
