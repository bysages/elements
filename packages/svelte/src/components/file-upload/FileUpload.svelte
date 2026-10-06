<script lang="ts">
import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";

import FileUploadRoot from "./FileUploadRoot.svelte";
import FileUploadTrigger from "./FileUploadTrigger.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  maxFiles,
  children,
  ...rest
}: {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  maxFiles?: number;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/file-upload").FileUploadRootProps = $props();
</script>

<FileUploadRoot {disabled} {invalid} {required} {maxFiles} {...rest}>
  {#if label}<ArkFileUpload.Label>{label}</ArkFileUpload.Label>{/if}
  <ArkFileUpload.Dropzone>
    <FileUploadTrigger>{placeholder ?? "Choose files"}</FileUploadTrigger>
  </ArkFileUpload.Dropzone>
  <ArkFileUpload.ItemGroup>
    <ArkFileUpload.Context>
      {#snippet render(api)}
        {#each api().acceptedFiles as file (file.name)}
          <ArkFileUpload.Item file={file}>
            <ArkFileUpload.ItemPreview>
              <InternalIcon name="file" />
            </ArkFileUpload.ItemPreview>
            <ArkFileUpload.ItemName />
            <ArkFileUpload.ItemSizeText />
            <ArkFileUpload.ItemDeleteTrigger aria-label="Remove"><InternalIcon name="x" /></ArkFileUpload.ItemDeleteTrigger>
          </ArkFileUpload.Item>
        {/each}
      {/snippet}
    </ArkFileUpload.Context>
  </ArkFileUpload.ItemGroup>
  <ArkFileUpload.HiddenInput />
  {@render children?.()}
</FileUploadRoot>
