<script setup lang="ts">
import { RatingGroup } from "@bysages/vue";
</script>

<template>
  <RatingGroup label="Rate this entry" :count="5" :default-value="3" />
</template>
