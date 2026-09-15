<script lang="ts">
import type { SeparatorProps } from "./props";

let { orientation = "horizontal", decorative = false, ...rest }: SeparatorProps = $props();
</script>

<div
  {...rest}
  role={decorative ? "none" : "separator"}
  data-scope="separator"
  data-part="root"
  data-orientation={orientation}
  aria-orientation={decorative ? undefined : orientation}
></div>
