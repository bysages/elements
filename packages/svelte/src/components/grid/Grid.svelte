<script lang="ts">
import type { GridProps } from "./props";

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

let { columns = 12, gap = "md", minChildWidth, children, ...rest }: GridProps = $props();

const gapValue = $derived(gapVars[gap] ?? gapVars.md);
</script>

<!-- An alignment lattice: tracks of equal measure, sized by column
count — or, with `minChildWidth`, as many tracks as the container
fits. -->
<div
  {...rest}
  style:--bs-grid-columns={String(columns)}
  style:--bs-grid-gap={gapValue}
  style:--bs-grid-min-child-width={minChildWidth}
  data-scope="grid"
  data-part="root"
  data-autofill={minChildWidth != null ? "" : undefined}
>
  {@render children?.()}
</div>
