<script lang="ts">
  import { injectComponentStyle } from "@bysages/core";
  import type { HTMLAttributes } from "svelte/elements";

  injectComponentStyle("result");

  type Status = "success" | "warning" | "danger" | "info";
  type Props = HTMLAttributes<HTMLDivElement> & {
    /** The verdict the operation returned; the fixed pigments speak it. */
    status?: Status;
  };

  let { status = "info", children, ...rest }: Props = $props();
</script>

<!-- A verdict drawn after the deed: the mark washes in the fixed
     pigment, the title rides the serif, and the extra carries the way
     onward. -->
<div {...rest} data-status={status} data-scope="result" data-part="root">
  {@render children?.()}
</div>