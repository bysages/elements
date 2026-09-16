<script setup lang="ts">
import { FileUpload } from "@bysages/vue";
</script>

<template>
  <FileUpload.Root :max-files="3" accept="image/*">
    <FileUpload.Label>Upload artwork</FileUpload.Label>
    <FileUpload.Dropzone>
      <FileUpload.Trigger>Choose files</FileUpload.Trigger>
    </FileUpload.Dropzone>
    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :key="file.name" :file="file">
          <FileUpload.ItemPreview>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              aria-hidden="true"
            >
              <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4Zm0 0v4h4" />
            </svg>
          </FileUpload.ItemPreview>
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
  </FileUpload.Root>
</template>
