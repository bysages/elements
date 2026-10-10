<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("file-upload");

import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";
import { useElementId } from "../../internal/id";
import type { FileUploadRootProps } from "./props";

let { size = "md", children, ...rest }: FileUploadRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("file-upload", generatedId, rest.id));
</script>

<ArkFileUpload.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkFileUpload.Root>

