<script setup lang="ts">
import { Marquee } from "@bysages/vue";

const entries = ["Qinghua", "Celadon", "Zhusha", "Ultramarine", "Gamboge", "Indigo"];
</script>

<template>
  <Marquee :items="entries" spacing="1.5rem" label="Pigments" />
</template>
