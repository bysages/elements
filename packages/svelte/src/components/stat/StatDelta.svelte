<script lang="ts">
import type { StatDeltaProps } from "./props";

let { direction = "flat", children, ...rest }: StatDeltaProps = $props();
</script>

<!-- The delta reads the direction in the fixed semantic pigments; an
explicit `data-direction` attribute on the consumer side still wins. -->
<span {...rest} data-scope="stat" data-part="delta" data-direction={rest["data-direction"] ?? direction}>
  {@render children?.()}
</span>
