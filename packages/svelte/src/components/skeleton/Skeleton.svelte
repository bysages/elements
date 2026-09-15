<script lang="ts">
import type { SkeletonProps } from "./props";

let { ...rest }: SkeletonProps = $props();
</script>

<div {...rest} data-scope="skeleton" data-part="root"></div>
