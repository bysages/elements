<script setup lang="ts">
import { Avatar, Comment } from "@bysages/vue";
</script>

<template>
  <Comment author="Archive keeper" datetime="2026-09-15" class="w-full">
    <template #avatar>
      <Avatar.Root>
        <Avatar.Fallback>AK</Avatar.Fallback>
      </Avatar.Root>
    </template>
    Filed. Shelved in the eastern cabinet, fourth row.
  </Comment>
</template>
