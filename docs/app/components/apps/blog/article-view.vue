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
  <article class="grid gap-5">
    <Button variant="ghost" size="sm" class="justify-self-start" @click="emit('back')">
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

    <div class="grid grid-cols-[1fr_minmax(0,44rem)_1fr] items-start gap-8">
      <div class="col-start-2 min-w-0">
        <Typography.Display class="mb-3">{{ post.title }}</Typography.Display>

        <p class="m-0 mb-7 flex items-center gap-2 text-sm text-tertiary">
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
          <Typography.Heading
            v-if="block.type === 'h2'"
            :id="block.id"
            class="mb-3 mt-7 scroll-mt-20"
          >
            {{ block.text }}
          </Typography.Heading>
          <Typography.Body v-else-if="block.type === 'p'" class="m-0 mb-4">
            {{ block.text }}
          </Typography.Body>
          <blockquote
            v-else-if="block.type === 'quote'"
            class="mx-0 my-5 border-s-2 border-s-border-strong ps-4 font-serif text-lg text-secondary"
          >
            {{ block.text }}
          </blockquote>
          <pre
            v-else
            class="my-5 overflow-x-auto rounded-lg border border-border bg-surface-2 p-4 text-sm leading-relaxed"
          ><code>{{ block.text }}</code></pre>
        </template>

        <CommentThread :comments="post.comments" />
      </div>

      <aside class="col-start-3 sticky top-24 w-52 @max-[60rem]:hidden">
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
    </div>
  </article>
</template>
