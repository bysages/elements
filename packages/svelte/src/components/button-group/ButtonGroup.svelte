<script lang="ts">
import type { ButtonGroupProps } from "./props";

let { orientation = "horizontal", size, radius, children, ...rest }: ButtonGroupProps = $props();
</script>

<!-- Buttons fused into one control: the group owns only the joinery, so
members keep every variant they were given — a solid action can sit
beside an outline one and the seam still reads. Selection belongs to
the toggle group; this is layout alone. -->
<div
  {...rest}
  role="group"
  data-scope="button-group"
  data-part="root"
  data-orientation={orientation}
  data-size={size}
  data-radius={radius}
>
  {@render children?.()}
</div>
