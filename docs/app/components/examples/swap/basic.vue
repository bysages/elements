<script setup lang="ts">
import { Button, Swap } from "@bysages/vue";
import { ref } from "vue";

const on = ref(false);
</script>

<template>
  <div class="flex items-center gap-3">
    <Button square size="lg" :aria-pressed="on" @click="on = !on">
      <Swap :swap="on" />
    </Button>
    <span>{{ on ? "On" : "Off" }}</span>
  </div>
</template>
