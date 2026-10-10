<script setup lang="ts">
import { Checkbox } from "@bysages/vue";

const tasks = [
  { label: "Ship the register", checked: true, disabled: false },
  { label: "Outline the story", checked: false, disabled: false },
  { label: "Archived", checked: false, disabled: true },
];
</script>

<template>
  <div class="grid gap-(--bs-gap-md) w-full">
    <Checkbox
      v-for="task in tasks"
      :key="task.label"
      :label="task.label"
      :default-value="task.checked"
      :disabled="task.disabled"
    />
  </div>
</template>
