<script setup lang="ts">
import { pen_line, plus, trash_2 } from "@bysages/icons";
import { FloatButton, Icon } from "@bysages/vue";
import { ref } from "vue";

const status = ref("Nothing chosen yet.");
</script>

<template>
  <div>
    <FloatButton>
      <FloatButton.Trigger label="Actions">
        <Icon :glyph="plus" />
      </FloatButton.Trigger>
      <FloatButton.Item label="Compose" @click="status = 'Compose'">
        <Icon :glyph="pen_line" />
      </FloatButton.Item>
      <FloatButton.Item label="Delete" @click="status = 'Delete'">
        <Icon :glyph="trash_2" />
      </FloatButton.Item>
    </FloatButton>
    <p role="status" class="mt-4 text-sm text-tertiary">
      {{ status }}
    </p>
  </div>
</template>
