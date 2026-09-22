<script setup lang="ts">
import { Avatar, Button, Comment, Input } from "@bysages/vue";
import { ref } from "vue";

import type { PostComment } from "./data";

defineProps<{ comments: PostComment[] }>();

// Reply ids come from a module counter — deterministic across SSR and
// client, no clock reads in render paths.
let replyCounter = 0;

const draft = ref("");

const replies = ref<PostComment[]>([]);

function submitReply() {
  const body = draft.value.trim();
  if (!body) return;
  replyCounter += 1;
  replies.value.push({
    id: `reply-${replyCounter}`,
    author: "You",
    initials: "YO",
    datetime: "Just now",
    body,
  });
  draft.value = "";
}
</script>

<template>
  <section class="thread" aria-label="Comments">
    <h2 class="thread-title">Comments</h2>

    <div class="thread-tree">
      <div v-for="comment in comments" :key="comment.id" class="thread-branch">
        <Comment :author="comment.author" :datetime="comment.datetime">
          <template #avatar>
            <Avatar.Root>
              <Avatar.Fallback>{{ comment.initials }}</Avatar.Fallback>
            </Avatar.Root>
          </template>
          {{ comment.body }}
        </Comment>
        <div v-for="reply in comment.replies ?? []" :key="reply.id" class="thread-nested">
          <Comment :author="reply.author" :datetime="reply.datetime">
            <template #avatar>
              <Avatar.Root>
                <Avatar.Fallback>{{ reply.initials }}</Avatar.Fallback>
              </Avatar.Root>
            </template>
            {{ reply.body }}
          </Comment>
        </div>
      </div>

      <div v-for="reply in replies" :key="reply.id" class="thread-branch">
        <Comment :author="reply.author" :datetime="reply.datetime">
          <template #avatar>
            <Avatar.Root>
              <Avatar.Fallback>{{ reply.initials }}</Avatar.Fallback>
            </Avatar.Root>
          </template>
          {{ reply.body }}
        </Comment>
      </div>
    </div>

    <form class="thread-composer" @submit.prevent="submitReply">
      <Input v-model="draft" placeholder="Add a comment…" aria-label="Add a comment" />
      <Button type="submit">Post</Button>
    </form>
  </section>
</template>

<style scoped>
.thread {
  margin-block-start: var(--bs-space-9);
}

.thread-title {
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-xl);
  margin: 0 0 var(--bs-space-5);
}

.thread-tree {
  display: grid;
  gap: var(--bs-space-5);
}

.thread-nested {
  padding-inline-start: var(--bs-space-8);
  margin-block-start: var(--bs-space-3);
}

.thread-composer {
  display: flex;
  gap: var(--bs-space-3);
  margin-block-start: var(--bs-space-6);
}

.thread-composer :first-child {
  flex: 1;
}
</style>
