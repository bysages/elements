<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("bento");

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Columns this tile claims. */
  span?: number;
  /** Rows this tile claims. */
  rowSpan?: number;
};

let { span = 1, rowSpan = 1, children, ...rest }: Props = $props();
</script>

<!-- One tile: span claims columns, rowSpan claims rows — the rest of
     the plate stays in measure. -->
<div
  {...rest}
  style:--bs-bento-span-x={String(span)}
  style:--bs-bento-span-y={String(rowSpan)}
  data-scope="bento"
  data-part="cell"
>
  {@render children?.()}
</div>
