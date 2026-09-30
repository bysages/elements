<script setup lang="ts">
import { OrderList } from "@bysages/vue";
import { ref } from "vue";

const options = [
  { label: "Prelude", value: "prelude" },
  { label: "Fugue", value: "fugue" },
  { label: "Interlude", value: "interlude" },
  { label: "Coda", value: "coda" },
];

const value = ref(options.map((option) => option.value));
</script>

<template>
  <div class="flex w-80 flex-col gap-3">
    <OrderList v-model="value" :options="options" label="Movements" />
    <output class="text-xs text-tertiary">{{ value.join(" → ") }}</output>
  </div>
</template>
