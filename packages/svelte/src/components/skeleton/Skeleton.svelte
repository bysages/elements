<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("skeleton");

import type { SkeletonProps } from "./props";

let { ...rest }: SkeletonProps = $props();
</script>

<div {...rest} data-scope="skeleton" data-part="root"></div>

