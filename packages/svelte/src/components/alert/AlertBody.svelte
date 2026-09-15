<script lang="ts">
import type { AlertPartProps } from "./props";

let { children, ...rest }: AlertPartProps = $props();
</script>

<div {...rest} data-scope="alert" data-part="body">
  {@render children?.()}
</div>
