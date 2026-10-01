<script setup lang="ts">
import { Avatar, Badge, Button } from "@bysages/vue";

const { locale } = useI18n();

const copy = {
  en: {
    seal: "Seal",
    messages: "Messages",
    variants: {
      default: "Default",
      outline: "Outline",
      success: "Success",
      warning: "Warning",
      danger: "Danger",
    },
  },
  zh: {
    seal: "印",
    messages: "消息",
    variants: {
      default: "默认",
      outline: "描边",
      success: "成功",
      warning: "警示",
      danger: "警示红",
    },
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);
</script>

<template>
  <div class="space-y-5 p-4">
    <div class="flex items-center justify-around bg-surface-2 px-4 py-6">
      <span class="relative">
        <Avatar.Root size="lg">
          <Avatar.Fallback>{{ text.seal }}</Avatar.Fallback>
        </Avatar.Root>
        <Badge
          tone="danger"
          class="absolute -top-1 -right-1.5 min-w-4 rounded-full px-1 text-center text-xs"
          >6</Badge
        >
      </span>
      <span class="relative text-tertiary">
        <Icon name="i-lucide-bell" class="size-7" />
        <span class="absolute top-0.5 right-0.5 size-2 rounded-full bg-danger" />
      </span>
      <Button variant="outline">
        {{ text.messages }}
        <Badge tone="danger" class="ml-1 rounded-full px-1.5 text-xs">8</Badge>
      </Button>
    </div>
    <div class="flex items-center justify-around bg-surface-2 px-4 py-6">
      <Badge>{{ text.variants.default }}</Badge>
      <Badge variant="outline">{{ text.variants.outline }}</Badge>
      <Badge tone="success" variant="subtle">{{ text.variants.success }}</Badge>
      <Badge tone="warning" variant="subtle">{{ text.variants.warning }}</Badge>
      <Badge tone="danger" variant="subtle">{{ text.variants.danger }}</Badge>
    </div>
  </div>
</template>
