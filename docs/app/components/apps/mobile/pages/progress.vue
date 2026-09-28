<script setup lang="ts">
import { Button, Progress, Spinner } from "@bysages/vue";
import { ref } from "vue";

const value = ref(30);
</script>

<template>
  <div class="space-y-6 p-4">
    <div class="space-y-4 bg-surface-2 p-4">
      <Progress.Root v-model="value">
        <Progress.Label class="pb-1.5 text-sm text-foreground">正在上传稿件</Progress.Label>
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
      <Button variant="outline" size="sm" @click="value = Math.max(0, value - 10)">减少</Button>
      <Button variant="outline" size="sm" @click="value = Math.min(100, value + 10)">增加</Button>
    </div>
  </div>
</template>
