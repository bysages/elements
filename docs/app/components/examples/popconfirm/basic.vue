<script setup lang="ts">
import { Button, Popconfirm } from "@bysages/vue";
</script>

<template>
  <div style="display: flex; gap: 1rem">
    <Popconfirm message="Discard this draft?">
      <Button variant="outline">Discard</Button>
    </Popconfirm>
    <Popconfirm message="Archive the ledger?" confirm-text="Archive" cancel-text="Keep">
      <Button>Archive</Button>
    </Popconfirm>
  </div>
</template>
