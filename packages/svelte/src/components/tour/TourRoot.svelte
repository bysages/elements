<script lang="ts">
import { Tour as ArkTour } from "@ark-ui/svelte/tour";

let { tour, children, ...rest }: import("@ark-ui/svelte/tour").TourRootProps = $props();
</script>

<ArkTour.Root {tour} {...rest}>
  {@render children?.()}
</ArkTour.Root>
