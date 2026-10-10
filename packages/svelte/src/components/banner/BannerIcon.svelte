<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("banner");

import type {BannerPartProps} from "./props";

let { children, ...rest }: BannerPartProps = $props();
</script>

<span {...rest} data-scope="banner" data-part="icon">
  {@render children?.()}
</span>

