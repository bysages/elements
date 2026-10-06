<script setup lang="ts">
import { Steps } from "@bysages/vue";

const items = [{ title: "Account" }, { title: "Profile" }, { title: "Confirm" }];
</script>

<template>
  <Steps :items="items" :default-step="0" />
</template>
