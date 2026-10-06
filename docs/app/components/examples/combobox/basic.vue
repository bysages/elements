<script setup lang="ts">
import { Combobox } from "@bysages/vue";
import { ref } from "vue";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const value = ref("apple");
</script>

<template>
  <Combobox v-model="value" :options="options" label="Fruit" placeholder="e.g. Apple" />
</template>
