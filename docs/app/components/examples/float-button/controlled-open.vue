<script setup lang="ts">
import { Button, FloatButton } from "@bysages/vue";
import { ref } from "vue";

const open = ref(false);
const status = ref("Nothing chosen yet.");

const compose = () => {
  status.value = "Compose";
  open.value = false;
};
</script>

<template>
  <div>
    <Button variant="outline" @click="open = !open">
      {{ open ? "Fold the group" : "Unfold the group" }}
    </Button>
    <p role="status" class="my-4 text-sm text-tertiary">
      {{ status }}
    </p>
    <FloatButton v-model:open="open" placement="bottom-start">
      <FloatButton.Trigger label="Actions">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14m-7-7h14" />
        </svg>
      </FloatButton.Trigger>
      <FloatButton.Item label="Compose" @click="compose">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 20h9m-1.5-12.5a2.1 2.1 0 0 0-3-3L4 17v3h3Z" />
        </svg>
      </FloatButton.Item>
    </FloatButton>
  </div>
</template>
