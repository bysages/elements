<script setup lang="ts">
import { Avatar, Badge } from "@bysages/vue";

const toast = inject("phone-toast") as (title: string) => void;

const chats = [
  { name: "编辑部", initials: "编", desc: "周四的排期表已发出", time: "09:41", unread: 2 },
  { name: "航运通知", initials: "航", desc: "您的订单已到驿站", time: "08:15", unread: 5 },
  { name: "山间书房", initials: "山", desc: "本周读书会改到周六", time: "昨天", unread: 0 },
];
</script>

<template>
  <div class="pb-4">
    <div class="divide-y divide-border bg-surface-2">
      <button
        v-for="chat in chats"
        :key="chat.name"
        class="flex w-full cursor-pointer items-center gap-3 bg-transparent px-4 py-3 text-left"
        type="button"
        @click="toast(`打开了「${chat.name}」`)"
      >
        <Avatar.Root size="md">
          <Avatar.Fallback>{{ chat.initials }}</Avatar.Fallback>
        </Avatar.Root>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-[17px] text-foreground">{{ chat.name }}</span>
          <span class="block truncate text-xs text-tertiary">{{ chat.desc }}</span>
        </span>
        <span class="flex flex-col items-end gap-1">
          <span class="text-xs text-tertiary">{{ chat.time }}</span>
          <Badge
            v-if="chat.unread"
            tone="danger"
            class="min-w-4 rounded-full px-1.5 text-center text-xs"
          >
            {{ chat.unread }}
          </Badge>
        </span>
      </button>
    </div>
    <div class="mt-4 divide-y divide-border bg-surface-2">
      <button
        v-for="label in ['收藏', '相册', '卡包', '表情']"
        :key="label"
        class="flex w-full cursor-pointer items-center justify-between bg-transparent px-4 py-3 text-left text-sm text-foreground"
        type="button"
        @click="toast(`打开了「${label}」`)"
      >
        {{ label }}
        <Icon name="i-lucide-chevron-right" class="size-5 text-tertiary" />
      </button>
    </div>
  </div>
</template>
