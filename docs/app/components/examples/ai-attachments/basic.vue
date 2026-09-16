<script setup lang="ts">
import { AiAttachment, AiAttachments } from "@bysages/vue";
import { ref } from "vue";

// The files riding the prompt: every chip state, and the quiet way
// back off.
const files = ref([
  { name: "colophon.png", size: 48213, status: "ready" as "ready" | "uploading" | "error" },
  { name: "notes.md", size: 1024, status: "ready" as "ready" | "uploading" | "error" },
  { name: "wireframe.fig", status: "uploading" as "ready" | "uploading" | "error" },
  { name: "denied.exe", size: 65536, status: "error" as "ready" | "uploading" | "error" },
  {
    name: "a-very-long-document-name-that-keeps-going-and-going.pdf",
    size: 2097152,
    status: "ready" as "ready" | "uploading" | "error",
  },
]);

const removed = ref("");

const remove = (name: string) => {
  files.value = files.value.filter((f) => f.name !== name);
  removed.value = name;
};
</script>

<template>
  <div style="display: grid; gap: 1rem; inline-size: 100%">
    <AiAttachments>
      <AiAttachment
        v-for="file in files"
        :key="file.name"
        :name="file.name"
        :size="file.size"
        :status="file.status"
        @remove="remove(file.name)"
      />
    </AiAttachments>
    <p style="margin: 0; color: var(--bs-color-text-tertiary); font-size: var(--bs-font-size-sm)">
      {{ removed ? `Removed: ${removed}` : "Click a chip's × to remove it." }}
    </p>
  </div>
</template>
