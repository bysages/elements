<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("bento");

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Tracks across the lattice. */
  columns?: number;
};

let { columns = 3, children, ...rest }: Props = $props();
</script>

<!-- The bento lattice: a grid of unequal tiles that reads as one
     plate; each cell claims its own span. -->
<div {...rest} style:--bs-bento-columns={String(columns)} data-scope="bento" data-part="root">
  {@render children?.()}
</div>
