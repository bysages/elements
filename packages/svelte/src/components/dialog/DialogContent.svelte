<script lang="ts">
import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import { injectComponentStyle } from "@bysages/core/styling";

import type { DialogContentProps } from "./props";

let { size, children, ...rest }: DialogContentProps = $props();
</script>

<ArkDialog.Content {...rest} data-size={size}>
  {@render children?.()}
</ArkDialog.Content>
