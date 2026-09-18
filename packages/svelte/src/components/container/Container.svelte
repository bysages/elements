<script lang="ts">
import type { ContainerProps } from "./props";

let { size = "readable", padding = true, children, ...rest }: ContainerProps = $props();
</script>

<!-- The reading frame: content held to a measure and centered on the
page. The sizes name typographic measures, not breakpoints — the page
owns its edges, the container only owns how long a line of ink runs. -->
<div
  {...rest}
  data-scope="container"
  data-part="root"
  data-size={size}
  data-padding={padding ? "" : undefined}
>
  {@render children?.()}
</div>
