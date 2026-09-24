<script setup lang="ts">
import { Avatar, Button, Toc, Typography } from "@bysages/vue";
import { computed } from "vue";

import CommentThread from "./comment-thread.vue";
import type { Post } from "./data";

const props = defineProps<{ post: Post }>();

const emit = defineEmits<{ back: [] }>();

// The TOC anchors to the headings' explicit ids — the window is the
// scroll container, exactly like the docs theme's own rail, so no
// scroll-el is needed.
const tocItems = computed(() =>
  props.post.blocks
    .filter((block) => block.type === "h2" && block.id)
    .map((block) => ({ value: block.id!, depth: 2, label: block.text })),
);
</script>

<template>
  <article class="article">
    <div class="article-body">
      <Button variant="ghost" size="sm" class="article-back" @click="emit('back')">
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
        All posts
      </Button>

      <Typography.Display class="article-title">{{ post.title }}</Typography.Display>

      <p class="article-meta">
        <Avatar.Root>
          <Avatar.Fallback>{{ post.initials }}</Avatar.Fallback>
        </Avatar.Root>
        <span>{{ post.author }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ post.date }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ post.readingTime }} read</span>
      </p>

      <template v-for="(block, index) in post.blocks" :key="index">
        <Typography.Heading v-if="block.type === 'h2'" :id="block.id" class="article-heading">
          {{ block.text }}
        </Typography.Heading>
        <Typography.Body v-else-if="block.type === 'p'" class="article-paragraph">
          {{ block.text }}
        </Typography.Body>
        <blockquote v-else-if="block.type === 'quote'" class="article-quote">
          {{ block.text }}
        </blockquote>
        <pre v-else class="article-code"><code>{{ block.text }}</code></pre>
      </template>

      <CommentThread :comments="post.comments" />
    </div>

    <aside class="article-rail">
      <Toc.Root :items="tocItems">
        <Toc.Nav>
          <Toc.Title>On this page</Toc.Title>
          <Toc.List>
            <Toc.Item v-for="item in tocItems" :key="item.value" :item="item">
              <Toc.Link :href="`#${item.value}`">{{ item.label }}</Toc.Link>
            </Toc.Item>
          </Toc.List>
        </Toc.Nav>
      </Toc.Root>
    </aside>
  </article>
</template>

<style scoped>
.article {
  display: grid;
  grid-template-columns: 1fr minmax(0, 44rem) 1fr;
  gap: var(--bs-space-8);
  align-items: start;
}

.article-body {
  grid-column: 2;
  min-inline-size: 0;
}

.article-back {
  margin-block-end: var(--bs-space-4);
}

.article-title {
  margin: 0 0 var(--bs-space-3);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  margin: 0 0 var(--bs-space-7);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
}

.article-heading {
  margin-block: var(--bs-space-7) var(--bs-space-3);
  scroll-margin-block-start: 5rem;
}

.article-paragraph {
  margin: 0 0 var(--bs-space-4);
}

.article-quote {
  margin: var(--bs-space-5) 0;
  padding-inline-start: var(--bs-space-4);
  border-inline-start: 2px solid var(--bs-color-border-strong);
  color: var(--bs-color-text-secondary);
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
}

.article-code {
  margin: var(--bs-space-5) 0;
  padding: var(--bs-space-4);
  background: var(--bs-color-surface-2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  overflow-x: auto;
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

.article-rail {
  grid-column: 3;
  position: sticky;
  inset-block-start: 6rem;
  inline-size: 13rem;
}

@container (max-width: 60rem) {
  .article-rail {
    display: none;
  }
}
</style>
