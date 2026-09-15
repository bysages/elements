<script lang="ts">
import type {BannerPartProps} from "./props";

let { children, ...rest }: BannerPartProps = $props();
</script>

<div {...rest} data-scope="banner" data-part="body">
  {@render children?.()}
</div>
