<script setup lang="ts">
import { Badge } from "@bysages/vue";
import { ref } from "vue";

const active = ref("chats");
const tabs = [
  { id: "chats", icon: "i-lucide-message-circle", label: "对话", badge: 3 },
  { id: "papers", icon: "i-lucide-file-text", label: "稿件", badge: 0 },
  { id: "me", icon: "i-lucide-user", label: "我的", badge: 0 },
];
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex flex-1 items-center justify-center bg-surface-0 text-sm text-tertiary">
      当前标签:{{ tabs.find((t) => t.id === active)?.label }}
    </div>
    <nav class="flex shrink-0 border-t border-border bg-surface-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="relative flex flex-1 cursor-pointer flex-col items-center bg-transparent py-2 text-[10px] leading-[1.4]"
        :class="active === tab.id ? 'text-primary' : 'text-tertiary'"
        type="button"
        @click="active = tab.id"
      >
        <span class="relative flex">
          <Icon :name="tab.icon" class="size-7" />
          <Badge
            v-if="tab.badge"
            tone="danger"
            class="absolute -top-0.5 -right-2.5 min-w-4 rounded-full px-1 text-center text-xs"
          >
            {{ tab.badge }}
          </Badge>
        </span>
        <span class="mt-0.5" :class="active === tab.id ? '' : 'text-foreground'">{{
          tab.label
        }}</span>
      </button>
    </nav>
  </div>
</template>
