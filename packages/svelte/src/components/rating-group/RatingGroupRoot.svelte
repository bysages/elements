<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("rating-group");

import { RatingGroup as ArkRatingGroup } from "@ark-ui/svelte/rating-group";
import { useElementId } from "../../internal/id";
import type { RatingGroupRootProps } from "./props";

let { size = "md", children, ...rest }: RatingGroupRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("rating-group", generatedId, rest.id));
</script>

<ArkRatingGroup.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkRatingGroup.Root>

