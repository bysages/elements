<script module lang="ts">
import { useTour as useArkTour, type UseTourProps, type UseTourReturn } from "@ark-ui/svelte/tour";

export function useTour(props: UseTourProps = {}): UseTourReturn {
  return useArkTour(() => ({ ...props }));
}
</script>
