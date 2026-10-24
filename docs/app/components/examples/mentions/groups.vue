<script setup lang="ts">
import { Mentions } from "@bysages/vue";
import { ref } from "vue";

const text = ref("");

const entries = [
  {
    label: "Lin Hua",
    value: "lin",
    group: "People",
    description: "Design systems",
    icon: "pencil",
  },
  {
    label: "Mei Chen",
    value: "mei",
    group: "People",
    description: "Editorial",
    icon: "pencil",
  },
  {
    label: "Search web",
    value: "search-web",
    group: "Commands",
    description: "Find current sources",
    icon: "file",
    insertText: "/search-web ",
  },
];
</script>

<template>
  <div class="w-full">
    <Mentions
      v-model="text"
      :items="entries"
      :triggers="['@', '/']"
      placeholder="Mention @Lin or run /Search…"
    />
    <p role="status" class="mt-4 text-sm text-tertiary">
      {{ text ? `Field holds: ${text}` : "Type @ or / to see groups." }}
    </p>
  </div>
</template>
