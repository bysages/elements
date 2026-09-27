<script setup lang="ts">
import { FloatButton, Icon } from "@bysages/vue";
import { ref } from "vue";

const status = ref("Nothing chosen yet.");
</script>

<template>
  <div>
    <FloatButton>
      <FloatButton.Trigger label="Actions">
        <Icon name="plus" />
      </FloatButton.Trigger>
      <FloatButton.Item label="Compose" @click="status = 'Compose'">
        <Icon name="pen-line" />
      </FloatButton.Item>
      <FloatButton.Item label="Delete" @click="status = 'Delete'">
        <Icon name="trash-2" />
      </FloatButton.Item>
    </FloatButton>
    <p role="status" class="mt-4 text-sm text-tertiary">
      {{ status }}
    </p>
  </div>
</template>
