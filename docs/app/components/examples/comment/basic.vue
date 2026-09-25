<script setup lang="ts">
import { Avatar, Button, Comment } from "@bysages/vue";
</script>

<template>
  <Comment author="Sage Wei" datetime="Today, 09:12" class="w-full">
    <template #avatar>
      <Avatar.Root>
        <Avatar.Fallback>SW</Avatar.Fallback>
      </Avatar.Root>
    </template>
    The registry reads cleaner since the hairlines went in — the eye knows where one entry ends.
    <template #actions>
      <Button variant="ghost" size="sm">Reply</Button>
      <Button variant="ghost" size="sm">Cite</Button>
    </template>
  </Comment>
</template>
