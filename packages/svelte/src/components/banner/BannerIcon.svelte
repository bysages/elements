<script lang="ts">
import type {BannerPartProps} from "./props";

let { children, ...rest }: BannerPartProps = $props();
</script>

<span {...rest} data-scope="banner" data-part="icon">
  {@render children?.()}
</span>
