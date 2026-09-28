<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("file-upload");

import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";
import type { FileUploadRootProps } from "./props";

let { size = "md", children, ...rest }: FileUploadRootProps = $props();
</script>

<ArkFileUpload.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkFileUpload.Root>
