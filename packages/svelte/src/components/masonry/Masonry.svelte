<script lang="ts">
import type { MasonryProps } from "./props";

/** The same named steps of the space ramp the stack uses — one
 * vocabulary of distance across the layout primitives. */
const gapVars = {
  none: "0",
  xs: "var(--bs-gap-xs)",
  sm: "var(--bs-gap-sm)",
  md: "var(--bs-gap-md)",
  lg: "var(--bs-gap-lg)",
  xl: "var(--bs-gap-xl)",
};

let { columns = 3, gap = "md", children, ...rest }: MasonryProps = $props();

const gapValue = $derived(gapVars[gap] ?? gapVars.md);
</script>

<!-- A wall of uneven heights: items flow down each column before
crossing to the next, so the order is column-first. A row-flow wall
would need grid masonry, which browsers do not ship yet. -->
<div
  {...rest}
  style:--bs-masonry-columns={String(columns)}
  style:--bs-masonry-gap={gapValue}
  data-scope="masonry"
  data-part="root"
>
  {@render children?.()}
</div>
