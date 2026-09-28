<script setup lang="ts">
import { Button } from "@bysages/vue";

const nav = inject("phone-nav") as { go(name: string): void };
const toast = inject("phone-toast") as (title: string) => void;
</script>

<template>
  <div class="flex h-full flex-col items-center px-8 pt-16 text-center">
    <span class="grid size-16 place-items-center rounded-full bg-primary text-primary-text">
      <Icon name="i-lucide-check" class="size-9" />
    </span>
    <p class="pt-5 text-lg font-medium text-foreground">提交成功</p>
    <p class="pt-2 text-sm text-tertiary">内容已通过审核,预计一个工作日内发布。</p>
    <div class="w-full space-y-3 pt-8">
      <Button class="w-full" size="lg" @click="nav.go('home')">返回首页</Button>
      <Button class="w-full" size="lg" variant="ghost" @click="toast('已查看详情')"
        >查看详情</Button
      >
    </div>
  </div>
</template>
