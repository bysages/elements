<script setup lang="ts">
import { Avatar, Badge } from "@bysages/vue";

const { locale } = useI18n();
const toast = inject("phone-toast") as (title: string) => void;

const chats = [
  {
    id: "editorial",
    name: { en: "Editorial", zh: "编辑部" },
    initials: { en: "ED", zh: "编" },
    desc: { en: "Thursday's schedule has been sent", zh: "周四的排期表已发出" },
    time: { en: "09:41", zh: "09:41" },
    unread: 2,
  },
  {
    id: "shipping",
    name: { en: "Shipping notices", zh: "航运通知" },
    initials: { en: "SN", zh: "航" },
    desc: {
      en: "Your order has arrived at the pickup point",
      zh: "您的订单已到驿站",
    },
    time: { en: "08:15", zh: "08:15" },
    unread: 5,
  },
  {
    id: "library",
    name: { en: "Hillside Library", zh: "山间书房" },
    initials: { en: "HL", zh: "山" },
    desc: {
      en: "This week's book club has moved to Saturday",
      zh: "本周读书会改到周六",
    },
    time: { en: "Yesterday", zh: "昨天" },
    unread: 0,
  },
];

const rows = [
  { id: "favorites", label: { en: "Favorites", zh: "收藏" } },
  { id: "albums", label: { en: "Albums", zh: "相册" } },
  { id: "cards", label: { en: "Cards", zh: "卡包" } },
  { id: "stickers", label: { en: "Stickers", zh: "表情" } },
];

const copy = {
  en: { opened: (name: string) => `Opened “${name}”` },
  zh: { opened: (name: string) => `打开了「${name}」` },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

function open(name: string) {
  toast(text.value.opened(name));
}
</script>

<template>
  <div class="pb-(--bs-padding-lg)">
    <div class="divide-y divide-border bg-surface-2">
      <button
        v-for="chat in chats"
        :key="chat.id"
        class="flex w-full cursor-pointer items-center gap-(--bs-gap-md) bg-transparent px-(--bs-padding-lg) py-(--bs-padding-md) text-left"
        type="button"
        @click="open(chat.name[locale])"
      >
        <Avatar.Root size="md">
          <Avatar.Fallback>{{ chat.initials[locale] }}</Avatar.Fallback>
        </Avatar.Root>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-md text-foreground">{{ chat.name[locale] }}</span>
          <span class="block truncate text-xs text-tertiary">{{ chat.desc[locale] }}</span>
        </span>
        <span class="flex flex-col items-end gap-(--bs-gap-xs)">
          <span class="text-xs text-tertiary">{{ chat.time[locale] }}</span>
          <Badge
            v-if="chat.unread"
            tone="danger"
            class="min-w-4 rounded-full px-(--bs-padding-xs) text-center text-xs"
          >
            {{ chat.unread }}
          </Badge>
        </span>
      </button>
    </div>
    <div class="mt-(--bs-margin-lg) divide-y divide-border bg-surface-2">
      <button
        v-for="row in rows"
        :key="row.id"
        class="flex w-full cursor-pointer items-center justify-between bg-transparent px-(--bs-padding-lg) py-(--bs-padding-md) text-left text-sm text-foreground"
        type="button"
        @click="open(row.label[locale])"
      >
        {{ row.label[locale] }}
        <Icon name="i-lucide-chevron-right" class="size-5 text-tertiary" />
      </button>
    </div>
  </div>
</template>
