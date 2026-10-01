<script setup lang="ts">
import { Badge, Button, Empty, Pagination } from "@bysages/vue";
import { computed } from "vue";

import { tagLabel } from "./data";

const { locale } = useI18n();

const copy = {
  en: {
    all: "All",
    filter: "Filter by tag",
    emptyTitle: "Nothing under this tag yet.",
    emptyBody: "The shelf fills as the ink dries.",
    clear: "Clear the filter",
    prev: "Previous page",
    next: "Next page",
  },
  zh: {
    all: "全部",
    filter: "按标签筛选",
    emptyTitle: "这个标签下还没有文章。",
    emptyBody: "等墨干透，架子自然会满。",
    clear: "清除筛选",
    prev: "上一页",
    next: "下一页",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

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
  <div class="grid gap-(--bs-gap-xl)">
    <div class="flex flex-wrap gap-(--bs-gap-sm)" role="group" :aria-label="text.filter">
      <Button
        :variant="!activeTag ? 'solid' : 'ghost'"
        size="sm"
        :aria-pressed="!activeTag"
        @click="emit('update:activeTag', null)"
        >{{ text.all }}</Button
      >
      <Button
        v-for="tag in tags"
        :key="tag"
        :variant="activeTag === tag ? 'solid' : 'ghost'"
        size="sm"
        :aria-pressed="activeTag === tag"
        @click="toggleTag(tag)"
        >{{ tagLabel(tag)[locale] }}</Button
      >
    </div>

    <div
      v-if="visible.length"
      class="post-shelf grid gap-(--bs-gap-lg) grid-cols-[repeat(auto-fill,minmax(min(22rem,100%),1fr))]"
    >
      <PostCard
        v-for="(post, i) in visible"
        :key="post.id"
        :post="post"
        :style="{ '--bs-i': i }"
        @open="emit('open', post)"
      />
    </div>

    <Empty.Root v-else class="py-16">
      <Empty.Title>{{ text.emptyTitle }}</Empty.Title>
      <Empty.Description>{{ text.emptyBody }}</Empty.Description>
      <Empty.Actions>
        <Button variant="outline" size="sm" @click="emit('update:activeTag', null)">{{
          text.clear
        }}</Button>
      </Empty.Actions>
    </Empty.Root>

    <div v-if="pageCount > 1" class="flex justify-center">
      <Pagination.Root
        :count="filtered.length"
        :page-size="PAGE_SIZE"
        :page="page"
        @update:page="emit('update:page', $event)"
      >
        <Pagination.PrevTrigger :aria-label="text.prev">
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
        <Pagination.NextTrigger :aria-label="text.next">
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

<style>
/* The shelf assembles one card at a time — followers rise on the
   stagger string; reduced motion parks both the lift and the delay. */
.post-shelf > * {
  animation: bs-item-in var(--bs-duration-base) var(--bs-ease-out) both;
  animation-delay: calc(var(--bs-i, 0) * var(--bs-stagger-step));
}
</style>
