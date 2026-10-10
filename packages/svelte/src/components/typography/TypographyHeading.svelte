<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("typography");

import type {TypographyPartProps} from "./props";

let { children, ...rest }: TypographyPartProps = $props();
</script>

<p {...rest} data-scope="typography" data-part="heading">
  {@render children?.()}
</p>

