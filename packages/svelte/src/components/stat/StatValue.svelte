<script lang="ts">
import type {StatPartProps} from "./props";

let { children, ...rest }: StatPartProps = $props();
</script>

<div {...rest} data-scope="stat" data-part="value">
  {@render children?.()}
</div>
