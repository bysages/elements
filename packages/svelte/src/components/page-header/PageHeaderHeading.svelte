<script lang="ts">
import type {PageHeaderPartProps} from "./props";

let { children, ...rest }: PageHeaderPartProps = $props();
</script>

<div {...rest} data-scope="page-header" data-part="heading">
  {@render children?.()}
</div>
