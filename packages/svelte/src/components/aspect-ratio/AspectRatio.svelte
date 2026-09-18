<script lang="ts">
import type { AspectRatioProps } from "./props";

let { ratio = "1 / 1", children, ...rest }: AspectRatioProps = $props();
</script>

<!-- A frame that keeps its shape: the box holds the given ratio
whatever the width it is dealt, and the child fills the frame it is
given. -->
<div {...rest} style:--bs-aspect-ratio={ratio} data-scope="aspect-ratio" data-part="root">
  {@render children?.()}
</div>
