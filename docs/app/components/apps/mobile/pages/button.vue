<script setup lang="ts">
import { Button, Spinner } from "@bysages/vue";

const { locale } = useI18n();
const toast = inject("phone-toast") as (title: string) => void;
const loading = ref(false);

const copy = {
  en: {
    primary: "Primary action",
    secondary: "Secondary action",
    tertiary: "Tertiary action",
    danger: "Danger action",
    small: "Small button",
    disabled: "Disabled",
    submit: "Submit",
    done: "Done",
  },
  zh: {
    primary: "主要操作",
    secondary: "次要操作",
    tertiary: "辅助操作",
    danger: "警示操作",
    small: "小按钮",
    disabled: "禁用",
    submit: "提交",
    done: "已完成",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

function submit() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    toast(text.value.done);
  }, 1500);
}
</script>

<template>
  <div class="space-y-(--bs-margin-lg) p-(--bs-padding-lg)">
    <div class="space-y-(--bs-margin-md)">
      <Button class="w-full" size="lg" @click="toast(text.primary)">{{ text.primary }}</Button>
      <Button class="w-full" size="lg" variant="outline" @click="toast(text.secondary)">{{
        text.secondary
      }}</Button>
      <Button class="w-full" size="lg" variant="ghost" @click="toast(text.tertiary)">{{
        text.tertiary
      }}</Button>
      <Button class="w-full" size="lg" tone="danger" @click="toast(text.danger)">{{
        text.danger
      }}</Button>
    </div>
    <div class="flex gap-(--bs-gap-md)">
      <Button class="flex-1" size="sm" variant="outline" @click="toast(text.small)">{{
        text.small
      }}</Button>
      <Button class="flex-1" size="sm" variant="outline" disabled>{{ text.disabled }}</Button>
      <Button class="flex-1" size="sm" :disabled="loading" @click="submit">
        <Spinner v-if="loading" size="sm" class="size-4" />
        {{ text.submit }}
      </Button>
    </div>
  </div>
</template>
