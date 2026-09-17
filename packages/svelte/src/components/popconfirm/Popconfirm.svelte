<script lang="ts">
import Portal from "@ark-ui/svelte/portal";
import { Popover as ArkPopover } from "@ark-ui/svelte/popover";

import { Button } from "../button";
import type { PopconfirmProps } from "./props";

let {
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  children,
  ...rest
}: PopconfirmProps = $props();

let open = $state(false);

function settle(confirmed: boolean) {
  open = false;
  (confirmed ? onConfirm : onCancel)?.();
}
</script>

<!-- A question at the point of no return: the trigger opens a small
anchored vessel carrying the message and two answers. Confirmation and
cancellation are the caller's to act on — the panel closes either way. -->
<ArkPopover.Root
  open={open}
  positioning={{ placement: "top" }}
  onOpenChange={(details) => (open = details.open)}
>
  <ArkPopover.Trigger>
    {#snippet asChild(props)}
      <button {...props()} {...rest} type="button">
        {@render children?.()}
      </button>
    {/snippet}
  </ArkPopover.Trigger>
  <Portal>
    <ArkPopover.Positioner>
      <ArkPopover.Content class="bs-popconfirm">
        <p data-part="message">{message}</p>
        <div data-part="actions">
          <Button variant="ghost" size="sm" onclick={() => settle(false)}>
            {cancelText}
          </Button>
          <Button size="sm" onclick={() => settle(true)}>
            {confirmText}
          </Button>
        </div>
      </ArkPopover.Content>
    </ArkPopover.Positioner>
  </Portal>
</ArkPopover.Root>
