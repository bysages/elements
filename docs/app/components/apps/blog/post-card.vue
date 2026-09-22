<script setup lang="ts">
import { Avatar, Badge, Button, Card } from "@bysages/vue";

import type { Post } from "./data";

defineProps<{ post: Post }>();

const emit = defineEmits<{ open: [] }>();
</script>

<template>
  <Card.Root class="post-card">
    <Card.Header>
      <Card.Title>{{ post.title }}</Card.Title>
      <Card.Description>{{ post.excerpt }}</Card.Description>
    </Card.Header>
    <Card.Content>
      <ul class="post-card-tags">
        <li v-for="tag in post.tags" :key="tag">
          <Badge tone="ink" variant="outline">{{ tag }}</Badge>
        </li>
      </ul>
    </Card.Content>
    <Card.Footer class="post-card-foot">
      <span class="post-card-meta">
        <Avatar.Root>
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

<style scoped>
.post-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bs-space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.post-card-foot {
  align-items: center;
  justify-content: space-between;
}

.post-card-meta {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
}
</style>
