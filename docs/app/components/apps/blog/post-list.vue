<script setup lang="ts">
import { Badge, Button, Empty, Pagination } from "@bysages/vue";
import { computed } from "vue";

import type { Post } from "./data";
import PostCard from "./post-card.vue";

const props = defineProps<{
  posts: Post[];
  tags: string[];
  activeTag: string | null;
  page: number;
}>();

const emit = defineEmits<{
  open: [post: Post];
  "update:activeTag": [tag: string | null];
  "update:page": [page: number];
}>();

const PAGE_SIZE = 6;

const filtered = computed(() =>
  props.activeTag
    ? props.posts.filter((post) => post.tags.includes(props.activeTag!))
    : props.posts,
);

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)));

const visible = computed(() =>
  filtered.value.slice((props.page - 1) * PAGE_SIZE, props.page * PAGE_SIZE),
);

function toggleTag(tag: string) {
  emit("update:activeTag", props.activeTag === tag ? null : tag);
  emit("update:page", 1);
}
</script>

<template>
  <div class="post-list">
    <div class="post-list-tags" role="group" aria-label="Filter by tag">
      <Button
        :variant="!activeTag ? 'solid' : 'ghost'"
        size="sm"
        :aria-pressed="!activeTag"
        @click="emit('update:activeTag', null)"
      >
        All
      </Button>
      <Button
        v-for="tag in tags"
        :key="tag"
        :variant="activeTag === tag ? 'solid' : 'ghost'"
        size="sm"
        :aria-pressed="activeTag === tag"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </Button>
    </div>

    <div v-if="visible.length" class="post-list-grid">
      <PostCard v-for="post in visible" :key="post.id" :post="post" @open="emit('open', post)" />
    </div>

    <Empty.Root v-else class="post-list-empty">
      <Empty.Title>Nothing under this tag yet.</Empty.Title>
      <Empty.Description>The shelf fills as the ink dries.</Empty.Description>
      <Empty.Actions>
        <Button variant="outline" size="sm" @click="emit('update:activeTag', null)">
          Clear the filter
        </Button>
      </Empty.Actions>
    </Empty.Root>

    <div v-if="pageCount > 1" class="post-list-pages">
      <Pagination.Root
        :count="filtered.length"
        :page-size="PAGE_SIZE"
        :page="page"
        @update:page="emit('update:page', $event)"
      >
        <Pagination.PrevTrigger aria-label="Previous page">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Pagination.PrevTrigger>
        <Pagination.Context v-slot="{ pages }">
          <template v-for="(page, index) in pages" :key="index">
            <Pagination.Ellipsis v-if="page.type === 'ellipsis'" :index="index"
              >…</Pagination.Ellipsis
            >
            <Pagination.Item v-else :value="page.value">{{ page.value }}</Pagination.Item>
          </template>
        </Pagination.Context>
        <Pagination.NextTrigger aria-label="Next page">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Pagination.NextTrigger>
      </Pagination.Root>
    </div>
  </div>
</template>

<style scoped>
.post-list {
  display: grid;
  gap: var(--bs-space-6);
}

.post-list-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bs-space-2);
}

.post-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: var(--bs-space-5);
}

.post-list-empty {
  padding-block: var(--bs-space-10);
}

.post-list-pages {
  display: flex;
  justify-content: center;
}
</style>
