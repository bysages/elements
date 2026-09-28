<script setup lang="ts">
import { Avatar, Badge, Button } from "@bysages/vue";
</script>

<template>
  <div class="space-y-5 p-4">
    <div class="flex items-center justify-around bg-surface-2 px-4 py-6">
      <span class="relative">
        <Avatar.Root size="lg">
          <Avatar.Fallback>印</Avatar.Fallback>
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
        消息
        <Badge tone="danger" class="ml-1 rounded-full px-1.5 text-xs">8</Badge>
      </Button>
    </div>
    <div class="flex items-center justify-around bg-surface-2 px-4 py-6">
      <Badge>默认</Badge>
      <Badge variant="outline">描边</Badge>
      <Badge tone="success" variant="subtle">成功</Badge>
      <Badge tone="warning" variant="subtle">警示</Badge>
      <Badge tone="danger" variant="subtle">警示红</Badge>
    </div>
  </div>
</template>
