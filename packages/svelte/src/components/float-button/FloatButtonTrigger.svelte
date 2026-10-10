<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("float-button");

import { Button } from "../button";
import { useComponentMessages } from "../config-provider/messages";
import { useFloatButton } from "./context";
import type { FloatButtonTriggerProps } from "./props";

let { label, children }: FloatButtonTriggerProps = $props();

const messages = useComponentMessages();

const context = useFloatButton();
</script>

<Button
  variant="solid"
  square
  size={context?.size ?? "lg"}
  onclick={() => context?.toggle()}
  aria-label={label || messages().floatButton.actions}
  aria-expanded={context?.open ?? false}
>
  {@render children?.()}
</Button>

