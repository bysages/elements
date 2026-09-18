<script lang="ts">
import type { StackProps } from "./props";

/** Whitespace chosen by name: the named steps point at the space ramp
 * so siblings are held apart by one token, never by ad-hoc margins. */
const gapVars = {
  none: "0",
  xs: "var(--bs-gap-xs)",
  sm: "var(--bs-gap-sm)",
  md: "var(--bs-gap-md)",
  lg: "var(--bs-gap-lg)",
  xl: "var(--bs-gap-xl)",
};

let {
  direction = "column",
  gap = "md",
  wrap = false,
  align,
  justify,
  children,
  ...rest
}: StackProps = $props();

const gapValue = $derived(gapVars[gap] ?? gapVars.md);
</script>

<div
  {...rest}
  style:--bs-stack-gap={gapValue}
  style:align-items={align}
  style:justify-content={justify}
  style:flex-wrap={wrap ? "wrap" : undefined}
  data-scope="stack"
  data-part="root"
  data-direction={direction}
>
  {@render children?.()}
</div>
