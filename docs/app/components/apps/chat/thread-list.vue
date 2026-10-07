<script setup lang="ts">
import { List } from "@bysages/vue";

interface ThreadSummary {
  id: string;
  title: string;
  preview: string;
}

defineProps<{
  threads: ThreadSummary[];
  activeId: string;
  emptyText: string;
  compact?: boolean;
}>();

const emit = defineEmits<{
  select: [id: string];
}>();
</script>

<template>
  <div class="thread-list" :class="{ 'thread-list-compact': compact }">
    <List.Root hoverable class="w-full!">
      <List.Item
        v-for="thread in threads"
        :key="thread.id"
        role="button"
        tabindex="0"
        :class="{ 'thread-active': thread.id === activeId }"
        :aria-current="thread.id === activeId ? 'page' : undefined"
        @click="emit('select', thread.id)"
        @keydown.enter.prevent="emit('select', thread.id)"
        @keydown.space.prevent="emit('select', thread.id)"
      >
        <List.Content>
          <template #title>
            <span class="block truncate" :class="compact ? 'font-normal' : undefined">{{
              thread.title
            }}</span>
          </template>
          <template v-if="!compact" #description>
            <span class="block truncate">{{ thread.preview }}</span>
          </template>
        </List.Content>
      </List.Item>
    </List.Root>
    <p v-if="threads.length === 0" class="m-0 text-sm text-tertiary">{{ emptyText }}</p>
  </div>
</template>

<style scoped>
.thread-list :deep([data-scope="list"][data-part="item"]) {
  border-radius: var(--bs-radius-sm);
  background: transparent;
}

.thread-list :deep([data-scope="list"][data-part="item"]:hover) {
  background: var(--bs-color-surface-1);
}

.thread-list :deep([data-scope="list"][data-part="item"].thread-active),
.thread-list :deep([data-scope="list"][data-part="item"].thread-active:hover) {
  background: var(--bs-color-surface-inset);
}

.thread-list-compact :deep([data-scope="list"][data-part="item"]) {
  padding: var(--bs-padding-xs) var(--bs-padding-sm);
}
</style>
