<script setup lang="ts">
import { computed, ref } from "vue";

import ArticleView from "../../components/apps/blog/article-view.vue";
import type { Post } from "../../components/apps/blog/data";
import { allTags, posts } from "../../components/apps/blog/data";
import PostList from "../../components/apps/blog/post-list.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

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
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      kicker="Example"
      title="Blog"
      lede="An editorial site in the paper-and-ink register: a filterable post grid, an article view whose table of contents tracks the window, and a living comment thread."
      :source-url="sourceUrl"
      class="mb-7"
    />

    <ExampleCanvas class="p-6">
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
    </ExampleCanvas>
  </div>
</template>
