<script setup lang="ts">
import { Field, Mentions } from "@bysages/vue";
import { ref } from "vue";

const text = ref("");

const teammates = [
  { label: "Lin Hua", value: "lin" },
  { label: "Mei Chen", value: "mei" },
  { label: "Hong Wei", value: "hong" },
  { label: "Yan Wu", value: "yan" },
  { label: "Zhou Lan", value: "zhou" },
];
</script>

<template>
  <!-- Inside a Field.Root the field picks up the label wiring and the
       invalid state on its own. -->
  <Field.Root invalid style="inline-size: 100%">
    <Field.Label>Describe the task</Field.Label>
    <Mentions
      v-model="text"
      :items="teammates"
      placeholder="Describe the task and @who should read it…"
    />
    <Field.ErrorText>Every task needs a body before it files.</Field.ErrorText>
  </Field.Root>
</template>
