<script setup lang="ts">
import { Button, Progress, Spinner } from "@bysages/vue";
import { ref } from "vue";

const { locale } = useI18n();
const value = ref(30);

const copy = {
  en: {
    uploading: "Uploading manuscript",
    decrease: "Decrease",
    increase: "Increase",
  },
  zh: {
    uploading: "正在上传稿件",
    decrease: "减少",
    increase: "增加",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);
</script>

<template>
  <div class="space-y-6 p-4">
    <div class="space-y-4 bg-surface-2 p-4">
      <Progress.Root v-model="value">
        <Progress.Label class="pb-1.5 text-sm text-foreground">{{ text.uploading }}</Progress.Label>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
      <Progress.Root :value="100">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </div>
    <div class="flex items-center justify-around bg-surface-2 p-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
    <div class="flex justify-center gap-3">
      <Button variant="outline" size="sm" @click="value = Math.max(0, value - 10)">{{
        text.decrease
      }}</Button>
      <Button variant="outline" size="sm" @click="value = Math.min(100, value + 10)">{{
        text.increase
      }}</Button>
    </div>
  </div>
</template>
