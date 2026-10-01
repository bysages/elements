<script setup lang="ts">
import { Button } from "@bysages/vue";

const { locale } = useI18n();
const nav = inject("phone-nav") as { go(name: string): void };
const toast = inject("phone-toast") as (title: string) => void;

const copy = {
  en: {
    title: "Submission received",
    description: "Your content has passed review and will be published within one business day.",
    home: "Back home",
    details: "View details",
    viewed: "Details viewed",
  },
  zh: {
    title: "提交成功",
    description: "内容已通过审核，预计一个工作日内发布。",
    home: "返回首页",
    details: "查看详情",
    viewed: "已查看详情",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);
</script>

<template>
  <div class="flex h-full flex-col items-center px-(--bs-padding-2xl) pt-16 text-center">
    <span class="grid size-16 place-items-center rounded-full bg-primary text-primary-text">
      <Icon name="i-lucide-check" class="size-9" />
    </span>
    <p class="pt-(--bs-padding-lg) text-lg font-medium text-foreground">
      {{ text.title }}
    </p>
    <p class="pt-(--bs-padding-sm) text-sm text-tertiary">
      {{ text.description }}
    </p>
    <div class="w-full space-y-(--bs-margin-md) pt-(--bs-padding-2xl)">
      <Button class="w-full" size="lg" @click="nav.go('home')">{{ text.home }}</Button>
      <Button class="w-full" size="lg" variant="ghost" @click="toast(text.viewed)">{{
        text.details
      }}</Button>
    </div>
  </div>
</template>
