<script lang="ts">
import type { AlertPartProps } from "./props";

let { children, ...rest }: AlertPartProps = $props();
</script>

<p {...rest} data-scope="alert" data-part="title">
  {@render children?.()}
</p>
