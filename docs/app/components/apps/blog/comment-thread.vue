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
  <section class="mt-9" aria-label="Comments">
    <h2 class="m-0 mb-5 font-serif text-xl">Comments</h2>

    <div class="grid gap-5">
      <div v-for="comment in comments" :key="comment.id">
        <Comment :author="comment.author" :datetime="comment.datetime">
          <template #avatar>
            <Avatar.Root>
              <Avatar.Fallback>{{ comment.initials }}</Avatar.Fallback>
            </Avatar.Root>
          </template>
          {{ comment.body }}
        </Comment>
        <div v-for="reply in comment.replies ?? []" :key="reply.id" class="mt-3 ps-8">
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

      <div v-for="reply in replies" :key="reply.id">
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

    <form class="mt-6 flex gap-3" @submit.prevent="submitReply">
      <Input
        v-model="draft"
        class="flex-1"
        placeholder="Add a comment…"
        aria-label="Add a comment"
      />
      <Button type="submit">Post</Button>
    </form>
  </section>
</template>
