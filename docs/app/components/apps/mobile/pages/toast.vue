<script setup lang="ts">
import { Button } from "@bysages/vue";

const { locale } = useI18n();
const toast = inject("phone-toast") as (title: string) => void;

const copy = {
  en: {
    saved: "Saved",
    success: "Success toast",
    message: "This plain-text toast disappears automatically in two seconds.",
    plain: "Text toast",
    loading: "Loading started",
    loadingToast: "Loading toast",
  },
  zh: {
    saved: "已保存",
    success: "成功提示",
    message: "这是纯文字提示，两秒后自动消失",
    plain: "文字提示",
    loading: "已开始加载",
    loadingToast: "加载提示",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);
</script>

<template>
  <div class="space-y-3 p-4">
    <Button class="w-full" variant="outline" @click="toast(text.saved)">{{ text.success }}</Button>
    <Button class="w-full" variant="outline" @click="toast(text.message)">
      {{ text.plain }}
    </Button>
    <Button class="w-full" variant="outline" @click="toast(text.loading)">
      {{ text.loadingToast }}
    </Button>
  </div>
</template>
