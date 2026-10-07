<script setup lang="ts">
import { Avatar, Button, Comment, Input } from "@bysages/vue";
import { computed, ref } from "vue";

const { locale } = useI18n();

const copy = {
  en: {
    section: "Comments",
    comments: "Comments",
    placeholder: "Add a comment…",
    addLabel: "Add a comment",
    post: "Post",
    you: "You",
    justNow: "Just now",
  },
  zh: {
    section: "评论",
    comments: "评论",
    placeholder: "写一条评论…",
    addLabel: "写评论",
    post: "发布",
    you: "我",
    justNow: "刚刚",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

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
    author: text.value.you,
    initials: "YO",
    datetime: text.value.justNow,
    body,
  });
  draft.value = "";
}
</script>

<template>
  <section class="mt-9" :aria-label="text.section">
    <h2 class="m-0 mb-(--bs-margin-lg) font-serif text-xl">
      {{ text.comments }}
    </h2>

    <div class="grid gap-(--bs-gap-lg)">
      <div v-for="comment in comments" :key="comment.id">
        <Comment :author="comment.author" :datetime="comment.datetime[locale]">
          <template #avatar>
            <Avatar>
              <Avatar.Fallback>{{ comment.initials }}</Avatar.Fallback>
            </Avatar>
          </template>
          {{ comment.body }}
        </Comment>
        <div
          v-for="reply in comment.replies ?? []"
          :key="reply.id"
          class="mt-(--bs-margin-md) ps-(--bs-padding-2xl)"
        >
          <Comment :author="reply.author" :datetime="reply.datetime[locale]">
            <template #avatar>
              <Avatar>
                <Avatar.Fallback>{{ reply.initials }}</Avatar.Fallback>
              </Avatar>
            </template>
            {{ reply.body }}
          </Comment>
        </div>
      </div>

      <div v-for="reply in replies" :key="reply.id">
        <Comment :author="reply.author" :datetime="reply.datetime[locale]">
          <template #avatar>
            <Avatar>
              <Avatar.Fallback>{{ reply.initials }}</Avatar.Fallback>
            </Avatar>
          </template>
          {{ reply.body }}
        </Comment>
      </div>
    </div>

    <form class="mt-(--bs-margin-xl) flex gap-(--bs-gap-md)" @submit.prevent="submitReply">
      <Input
        v-model="draft"
        class="flex-1"
        :placeholder="text.placeholder"
        :aria-label="text.addLabel"
      />
      <Button type="submit">{{ text.post }}</Button>
    </form>
  </section>
</template>
