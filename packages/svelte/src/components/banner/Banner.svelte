<script lang="ts">
import type { BannerProps } from "./props";

let { status = "ink", children, ...rest }: BannerProps = $props();
</script>

<!-- A page-level notice, spoken across the full measure: a wash of the
status pigment, one heavier hairline on the leading edge. Ink is the
neutral register; the four semantic pigments are fixed. -->
<div
  {...rest}
  role={status === "ink" ? undefined : "status"}
  data-scope="banner"
  data-part="root"
  data-status={status}
>
  {@render children?.()}
</div>
