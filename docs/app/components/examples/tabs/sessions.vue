<script setup lang="ts">
import { Tabs } from "@bysages/vue";
import { ref } from "vue";

const sessions = ref([
  { value: "inbox", label: "Inbox", closable: true },
  { value: "draft", label: "Draft", closable: true },
  { value: "sent", label: "Sent", closable: true },
]);
const active = ref("inbox");

const close = (item: { value: string }) => {
  const index = sessions.value.findIndex((session) => session.value === item.value);
  if (index !== -1) sessions.value.splice(index, 1);
};
</script>

<template>
  <div class="w-full">
    <Tabs
      v-model="active"
      :items="sessions"
      contentless
      scrollable
      closable
      class="w-full!"
      @close="close"
    />
    <p class="m-0 mt-2 text-sm text-tertiary" role="status">
      {{ sessions.length ? `Active session: ${active}` : "All sessions are closed." }}
    </p>
  </div>
</template>
