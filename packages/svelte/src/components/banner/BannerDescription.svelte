<script lang="ts">
import type {BannerPartProps} from "./props";

let { children, ...rest }: BannerPartProps = $props();
</script>

<p {...rest} data-scope="banner" data-part="description">
  {@render children?.()}
</p>
