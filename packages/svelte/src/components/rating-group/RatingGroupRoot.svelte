<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("rating-group");

import { RatingGroup as ArkRatingGroup } from "@ark-ui/svelte/rating-group";
import type { RatingGroupRootProps } from "./props";

let { size = "md", children, ...rest }: RatingGroupRootProps = $props();
</script>

<ArkRatingGroup.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkRatingGroup.Root>
