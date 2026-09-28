<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("float-button");

import { Button } from "../button";
import { useFloatButton } from "./context";
import type { FloatButtonTriggerProps } from "./props";

let { label, children }: FloatButtonTriggerProps = $props();

const context = useFloatButton();
</script>

<Button
  variant="solid"
  square
  size={context?.size ?? "lg"}
  onclick={() => context?.toggle()}
  aria-label={label || "Actions"}
  aria-expanded={context?.open ?? false}
>
  {@render children?.()}
</Button>
