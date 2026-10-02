<script setup lang="ts">
import StudioWorkbench from "../../components/workbenches/studio-workbench.vue";

const { locale } = useI18n();

const copy = {
  en: {
    title: "Studio",
    description: "Compose Elements JSON interfaces by drag and drop.",
  },
  zh: {
    title: "工作台",
    description: "用拖拽组合 Elements 的 JSON 界面。",
  },
} as const;

useSeoMeta({
  title: () => copy[locale.value as "en" | "zh"].title,
  description: () => copy[locale.value as "en" | "zh"].description,
});

definePageMeta({ layout: "default", gallery: true });
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ClientOnly>
      <StudioWorkbench :key="locale" />
      <template #fallback>
        <div class="min-h-[32rem] rounded-lg border border-border bg-surface-0" />
      </template>
    </ClientOnly>
  </div>
</template>
