<script setup lang="ts">
import { FloatButton } from "@bysages/vue";
import { ref } from "vue";

const status = ref("Nothing chosen yet.");
</script>

<template>
  <div>
    <FloatButton>
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
      <FloatButton.Item label="Compose" @click="status = 'Compose'">
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
      <FloatButton.Item label="Delete" @click="status = 'Delete'">
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
          <path d="M4 7h16m-9-4h2m-6 4 1 13h8l1-13m-7 4v6m4-6v6" />
        </svg>
      </FloatButton.Item>
    </FloatButton>
    <p
      role="status"
      style="
        margin-block-start: var(--bs-space-4);
        font-size: var(--bs-font-size-sm);
        color: var(--bs-color-text-tertiary);
      "
    >
      {{ status }}
    </p>
  </div>
</template>
