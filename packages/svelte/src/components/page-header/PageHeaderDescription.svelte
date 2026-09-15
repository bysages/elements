<script lang="ts">
import type {PageHeaderPartProps} from "./props";

let { children, ...rest }: PageHeaderPartProps = $props();
</script>

<p {...rest} data-scope="page-header" data-part="description">
  {@render children?.()}
</p>
