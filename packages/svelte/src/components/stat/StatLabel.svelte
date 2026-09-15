<script lang="ts">
import type {StatPartProps} from "./props";

let { children, ...rest }: StatPartProps = $props();
</script>

<p {...rest} data-scope="stat" data-part="label">
  {@render children?.()}
</p>
