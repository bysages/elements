<script setup lang="ts">
import { Link } from "@bysages/vue";
import { computed, ref } from "vue";

import ArticleView from "../../components/apps/blog/article-view.vue";
import type { Post } from "../../components/apps/blog/data";
import { allTags, posts } from "../../components/apps/blog/data";
import PostList from "../../components/apps/blog/post-list.vue";

definePageMeta({ layout: "default", examples: true });

useSeoMeta({
  title: "Blog example",
  description:
    "A complete editorial site — filterable post grid, article view with a tracked table of contents, and a comment thread — built from Elements components.",
});

const config = useAppConfig() as {
  github?: { url?: string; branch?: string; rootDir?: string };
};

const sourceUrl = [
  config.github?.url,
  "tree",
  config.github?.branch,
  config.github?.rootDir,
  "app/components/apps/blog",
]
  .filter(Boolean)
  .join("/");

// The page owns the list state so a round trip to an article and back
// keeps the tag filter and page the reader left.
const activePostId = ref<string | null>(null);
const activeTag = ref<string | null>(null);
const page = ref(1);

const activePost = computed(() => posts.find((post) => post.id === activePostId.value) ?? null);

// The document scrolls with a global smooth behavior — resets override
// it so switching views lands at the top without an animated glide.
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

function openPost(post: Post) {
  activePostId.value = post.id;
  scrollToTop();
}

function backToList() {
  activePostId.value = null;
  scrollToTop();
}
</script>

<template>
  <div class="example-page">
    <header class="example-head">
      <p class="example-kicker">Example</p>
      <h1 class="example-title">Blog</h1>
      <p class="example-lede">
        An editorial site in the paper-and-ink register: a filterable post grid, an article view
        whose table of contents tracks the window, and a living comment thread.
      </p>
      <Link :href="sourceUrl" target="_blank" rel="noopener" class="example-source"
        >View source</Link
      >
    </header>

    <div class="blog-canvas">
      <ArticleView v-if="activePost" :post="activePost" @back="backToList" />
      <PostList
        v-else
        :posts="posts"
        :tags="allTags"
        :active-tag="activeTag"
        :page="page"
        @open="openPost"
        @update:active-tag="activeTag = $event"
        @update:page="page = $event"
      />
    </div>
  </div>
</template>

<style scoped>
.example-page {
  inline-size: 100%;
  max-inline-size: 90rem;
  margin-inline: auto;
  padding: var(--bs-space-8) var(--bs-space-6) var(--bs-space-12);
}

.example-head {
  max-inline-size: 44rem;
  margin-block-end: var(--bs-space-7);
}

.example-kicker {
  margin: 0 0 var(--bs-space-2);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  text-transform: uppercase;
}

.example-title {
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-4xl);
  line-height: var(--bs-line-height-tight);
  margin: 0 0 var(--bs-space-3);
}

.example-lede {
  color: var(--bs-color-text-secondary);
  margin: 0 0 var(--bs-space-3);
}

.example-source {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  text-decoration: none;
}

.example-source:hover {
  color: var(--bs-color-text-secondary);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.blog-canvas {
  container-type: inline-size;
}
</style>
