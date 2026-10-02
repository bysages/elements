<script lang="ts">
  import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";
  import type { FileUploadTriggerProps } from "@ark-ui/svelte/file-upload";

  let { children, ...rest }: FileUploadTriggerProps = $props();
</script>

<!-- The inner trigger repeats the click binding the dropzone already
     owns, and no flavor of taming a nested button survives the audit —
     assistive tech can still land on it. So the visual cue is a plain
     span wearing the trigger props; the dropzone stays the one real
     control, keyboard included. -->
<ArkFileUpload.Trigger {...rest}>
  {#snippet asChild(triggerProps)}
    <span {...triggerProps()} data-scope="file-upload" data-part="trigger" aria-hidden="true">
      {@render children?.()}
    </span>
  {/snippet}
</ArkFileUpload.Trigger>
