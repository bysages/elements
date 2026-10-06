<script setup lang="ts">
import { FileUpload } from "@bysages/vue";
</script>

<template>
  <FileUpload label="Attachments" placeholder="Drag files here or choose" :max-files="5" />
</template>
