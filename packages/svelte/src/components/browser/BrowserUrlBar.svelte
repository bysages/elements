<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("browser");

type Props = HTMLAttributes<HTMLDivElement>;

let { children, ...rest }: Props = $props();
</script>

<!-- The address well: centered, quiet, single line. -->
<div {...rest} data-scope="browser" data-part="urlbar">
  {@render children?.()}
</div>

