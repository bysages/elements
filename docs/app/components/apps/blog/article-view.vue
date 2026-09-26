<script setup lang="ts">
import { Avatar, Button, Toc, Typography } from "@bysages/vue";
import { renderHtml } from "@tanstack/markdown/html";
import { computed, ref, watchPostEffect } from "vue";

import CommentThread from "./comment-thread.vue";
import type { Post, PostBlock } from "./data";

const props = defineProps<{ post: Post }>();

const emit = defineEmits<{ back: [] }>();

// The TOC anchors to the headings' explicit ids — the window is the
// scroll container, exactly like the docs theme's own rail, so no
// scroll-el is needed.
const tocItems = computed(() =>
  props.post.blocks
    .filter((block: PostBlock) => block.type === "h2" && block.id)
    .map((block) => ({ value: block.id!, depth: 2, label: block.text })),
);

// The body is one markdown document set through the same prose styles
// the docs pages wear, so every element — lists and tables included —
// arrives already in the house register.
const markdown = computed(() =>
  props.post.blocks
    .map((block) =>
      block.type === "h2"
        ? `## ${block.text}`
        : block.type === "quote"
          ? `> ${block.text}`
          : block.type === "code"
            ? "```\n" + block.text + "\n```"
            : block.text,
    )
    .join("\n\n"),
);

const html = computed(() => renderHtml(markdown.value));

const body = ref<HTMLElement | null>(null);

// The renderer emits bare h2s; the TOC links anchor to the blocks' own
// slugs, so the ids go back on after each patch.
watchPostEffect(() => {
  void html.value;
  if (!body.value) return;
  for (const h2 of body.value.querySelectorAll("h2")) {
    const block = props.post.blocks.find(
      (candidate) => candidate.type === "h2" && candidate.text === h2.textContent,
    );
    if (block?.id) h2.id = block.id;
  }
});
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

    <div class="grid grid-cols-[1fr_minmax(0,46rem)_1fr] items-start gap-8">
      <div class="col-start-2 min-w-0">
        <Typography.Display class="mb-3">{{ post.title }}</Typography.Display>

        <!-- The title's voice owns `margin: 0`, so the gap to its byline
             is written here — utilities under the component's own
             specificity would silently lose. -->
        <p class="m-0 mb-7 mt-3 flex items-center gap-2 text-sm text-tertiary">
          <Avatar.Root>
            <Avatar.Fallback>{{ post.initials }}</Avatar.Fallback>
          </Avatar.Root>
          <span>{{ post.author }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ post.date }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ post.readingTime }} read</span>
        </p>

        <div ref="body" class="bs-docs-prose" v-html="html" />

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
