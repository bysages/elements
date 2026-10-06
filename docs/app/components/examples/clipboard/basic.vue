<script setup lang="ts">
import { Clipboard } from "@bysages/vue";
</script>

<template>
  <Clipboard default-value="pnpm add @bysages/vue" label="Install command" placeholder="Command" />
</template>
