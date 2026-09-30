<script setup lang="ts">
import { BlockUI, Button } from "@bysages/vue";
import { ref } from "vue";

const blocked = ref(true);
</script>

<template>
  <div class="flex w-96 flex-col gap-4">
    <Button size="sm" variant="outline" @click="blocked = !blocked">
      {{ blocked ? "Lift the curtain" : "Draw the curtain" }}
    </Button>
    <BlockUI :blocked="blocked">
      <div class="rounded-md border border-border p-6 text-sm text-secondary">
        Invoices settle every quarter. The ledger holds its shape while the curtain is drawn.
      </div>
    </BlockUI>
  </div>
</template>
