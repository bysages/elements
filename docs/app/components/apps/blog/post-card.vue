<script setup lang="ts">
import { Avatar, Badge, Button, Card } from "@bysages/vue";

import type { Post } from "./data";

defineProps<{ post: Post }>();

const emit = defineEmits<{ open: [] }>();
</script>

<template>
  <Card.Root>
    <Card.Header>
      <Card.Title>{{ post.title }}</Card.Title>
      <Card.Description>{{ post.excerpt }}</Card.Description>
    </Card.Header>
    <Card.Content>
      <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
        <li v-for="tag in post.tags" :key="tag">
          <Badge tone="ink" variant="outline">{{ tag }}</Badge>
        </li>
      </ul>
    </Card.Content>
    <!-- Core paints the footer's flex + items-center + gap (unlayered);
         only the space-between is ours, and no core rule competes for it. -->
    <Card.Footer class="justify-between">
      <span class="flex items-center gap-2 text-sm text-tertiary">
        <Avatar.Root size="sm">
          <Avatar.Fallback>{{ post.initials }}</Avatar.Fallback>
        </Avatar.Root>
        <span>{{ post.author }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ post.readingTime }}</span>
      </span>
      <Button variant="ghost" size="sm" @click="emit('open')">Read</Button>
    </Card.Footer>
  </Card.Root>
</template>
