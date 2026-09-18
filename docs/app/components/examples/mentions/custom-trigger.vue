<script setup lang="ts">
import { Mentions } from "@bysages/vue";
import { ref } from "vue";

const text = ref("Review with #");

const reviews = [
  { label: "Design review", value: "design-review" },
  { label: "Editorial review", value: "editorial-review" },
  { label: "Civic review", value: "civic-review" },
];
</script>

<template>
  <!-- A different trigger character, for systems where @ already means
       something else. -->
  <Mentions
    v-model="text"
    :items="reviews"
    trigger="#"
    placeholder="Tag a review…"
    style="inline-size: 100%"
  />
</template>
