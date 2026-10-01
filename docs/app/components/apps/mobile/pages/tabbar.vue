<script setup lang="ts">
import { Badge } from "@bysages/vue";
import { ref } from "vue";

const { locale } = useI18n();
const active = ref("chats");
const tabs = [
  {
    id: "chats",
    icon: "i-lucide-message-circle",
    label: { en: "Chats", zh: "对话" },
    badge: 3,
  },
  {
    id: "papers",
    icon: "i-lucide-file-text",
    label: { en: "Drafts", zh: "稿件" },
    badge: 0,
  },
  {
    id: "me",
    icon: "i-lucide-user",
    label: { en: "Me", zh: "我的" },
    badge: 0,
  },
];

const copy = {
  en: { currentTab: "Current tab: " },
  zh: { currentTab: "当前标签：" },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);
const activeTab = computed(() => tabs.find((tab) => tab.id === active.value));
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex flex-1 items-center justify-center bg-surface-0 text-sm text-tertiary">
      {{ text.currentTab }}{{ activeTab?.label[locale] }}
    </div>
    <nav class="flex shrink-0 border-t border-border bg-surface-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="relative flex flex-1 cursor-pointer flex-col items-center bg-transparent py-(--bs-padding-sm) text-xs transition-colors duration-(--bs-duration-fast) ease-(--bs-ease-out) active:bg-surface-inset"
        :class="active === tab.id ? 'text-primary' : 'text-tertiary'"
        type="button"
        @click="active = tab.id"
      >
        <span class="relative flex">
          <Icon :name="tab.icon" class="size-7" />
          <Badge
            v-if="tab.badge"
            tone="danger"
            class="absolute -top-0.5 -right-2.5 min-w-4 rounded-full px-(--bs-padding-xs) text-center text-xs"
          >
            {{ tab.badge }}
          </Badge>
        </span>
        <span class="mt-0.5" :class="active === tab.id ? '' : 'text-foreground'">{{
          tab.label[locale]
        }}</span>
      </button>
    </nav>
  </div>
</template>
