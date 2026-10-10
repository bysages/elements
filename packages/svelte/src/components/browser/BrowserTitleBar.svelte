<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("browser");

type Props = HTMLAttributes<HTMLDivElement>;

let { children, ...rest }: Props = $props();
</script>

<!-- The rail that carries the lamps and the address well. -->
<div {...rest} data-scope="browser" data-part="titlebar">
  {@render children?.()}
</div>

