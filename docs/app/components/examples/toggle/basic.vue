<script setup lang="ts">
import { Toggle } from "@bysages/vue";
</script>

<template>
  <div class="flex items-center gap-3">
    <Toggle label="Toggle bold">B</Toggle>
    <Toggle label="Toggle italic" :default-pressed="true">I</Toggle>
  </div>
</template>
