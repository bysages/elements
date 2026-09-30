<script setup lang="ts">
import { Button } from "@bysages/vue";

const toast = inject("phone-toast") as (title: string) => void;
</script>

<template>
  <div class="space-y-3 p-4">
    <Button class="w-full" variant="outline" @click="toast('已保存')">成功提示</Button>
    <Button class="w-full" variant="outline" @click="toast('这是纯文字提示，两秒后自动消失')">
      文字提示
    </Button>
    <Button class="w-full" variant="outline" @click="toast('已开始加载')"> 加载提示 </Button>
  </div>
</template>
