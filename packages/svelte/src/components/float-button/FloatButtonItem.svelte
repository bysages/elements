<script lang="ts">
import { Button } from "../button";
import { useFloatButton } from "./context";
import type { FloatButtonItemProps } from "./props";

let { label, disabled = false, onclick, children }: FloatButtonItemProps = $props();

const context = useFloatButton();
</script>

<div data-scope="float-button" data-part="item">
  <Button
    variant="outline"
    square
    size="md"
    {disabled}
    aria-label={label}
    onclick={() => {
      onclick?.();
      // The dial folds once the action is chosen.
      context?.close();
    }}
  >
    {@render children?.()}
  </Button>
  <!-- The accessible name rides the button; the annotation is for the
  eyes only. -->
  <span data-scope="float-button" data-part="item-label" aria-hidden="true">
    {label}
  </span>
</div>
