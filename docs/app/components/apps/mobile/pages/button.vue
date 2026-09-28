<script setup lang="ts">
import { Button, Spinner } from "@bysages/vue";

const toast = inject("phone-toast") as (title: string) => void;
const loading = ref(false);

function submit() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    toast("已完成");
  }, 1500);
}
</script>

<template>
  <div class="space-y-5 p-4">
    <div class="space-y-3">
      <Button class="w-full" size="lg" @click="toast('主要操作')">主要操作</Button>
      <Button class="w-full" size="lg" variant="outline" @click="toast('次要操作')"
        >次要操作</Button
      >
      <Button class="w-full" size="lg" variant="ghost" @click="toast('辅助操作')">辅助操作</Button>
      <Button class="w-full" size="lg" tone="danger" @click="toast('警示操作')">警示操作</Button>
    </div>
    <div class="flex gap-3">
      <Button class="flex-1" size="sm" variant="outline" @click="toast('小按钮')">小按钮</Button>
      <Button class="flex-1" size="sm" variant="outline" disabled>禁用</Button>
      <Button class="flex-1" size="sm" :disabled="loading" @click="submit">
        <Spinner v-if="loading" size="sm" class="size-4" />
        提交
      </Button>
    </div>
  </div>
</template>
