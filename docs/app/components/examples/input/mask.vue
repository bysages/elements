<script setup lang="ts">
import { Input } from "@bysages/vue";
import { ref } from "vue";

const phone = ref("");
const date = ref("");
</script>

<template>
  <div class="flex w-72 flex-col gap-4">
    <Input v-model="phone" mask="(999) 999-9999" placeholder="(000) 000-0000" />
    <Input v-model="date" mask="9999-99-99" placeholder="0000-00-00" />
  </div>
</template>
