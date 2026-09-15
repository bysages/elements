<script lang="ts">
import type {PageHeaderPartProps} from "./props";

let { children, ...rest }: PageHeaderPartProps = $props();
</script>

<header {...rest} data-scope="page-header" data-part="root">
  {@render children?.()}
</header>
