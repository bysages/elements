<script setup lang="ts">
import { Tag } from "@bysages/vue";
import { ref } from "vue";

const tags = ref(["Review", "Archive"]);
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Tag
      v-for="tag in tags"
      :key="tag"
      closable
      variant="outline"
      @close="tags = tags.filter((item) => item !== tag)"
    >
      {{ tag }}
    </Tag>
  </div>
</template>
