<script setup lang="ts">
import { User } from "@bysages/vue";

const people = [
  { name: "Shen Wenzheng", description: "Keeper of seals", size: "lg" as const },
  { name: "Lin Wan", description: "Letter room registrar", size: "md" as const },
  { name: "Zhou Ping", size: "sm" as const },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <User
      v-for="person in people"
      :key="person.name"
      :name="person.name"
      :description="person.description"
      :size="person.size"
    />
  </div>
</template>
