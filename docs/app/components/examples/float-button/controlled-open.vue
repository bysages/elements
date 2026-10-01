<script setup lang="ts">
import { pen_line, plus } from "@bysages/icons";
import { Button, FloatButton, Icon } from "@bysages/vue";
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
        <Icon :glyph="plus" />
      </FloatButton.Trigger>
      <FloatButton.Item label="Compose" @click="compose">
        <Icon :glyph="pen_line" />
      </FloatButton.Item>
    </FloatButton>
  </div>
</template>
