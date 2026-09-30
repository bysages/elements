<script setup lang="ts">
import { NativeSelect } from "@bysages/vue";
import { ref } from "vue";

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

const value = ref("");
</script>

<template>
  <div class="flex w-72 flex-col gap-4">
    <NativeSelect v-model="value" :options="frameworks" placeholder="Choose a framework" />
    <NativeSelect :options="frameworks" model-value="vue" />
  </div>
</template>
