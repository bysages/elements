<script setup lang="ts">
import { file } from "@bysages/icons";
import { FileUpload, Icon } from "@bysages/vue";
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
            <Icon :glyph="file" />
          </FileUpload.ItemPreview>
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>
