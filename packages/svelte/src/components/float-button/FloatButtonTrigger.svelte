<script lang="ts">
import { Button } from "../button";
import { useFloatButton } from "./context";
import type { FloatButtonTriggerProps } from "./props";

let { label, children }: FloatButtonTriggerProps = $props();

const context = useFloatButton();
</script>

<Button
  variant="solid"
  square
  size="lg"
  onclick={() => context?.toggle()}
  aria-label={label || "Actions"}
  aria-expanded={context?.open ?? false}
>
  {@render children?.()}
</Button>
