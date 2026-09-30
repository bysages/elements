<script setup lang="ts">
import { Button, Toolbar } from "@bysages/vue";
</script>

<template>
  <Toolbar label="Document tools" class="w-full">
    <template #start>
      <Button size="sm" variant="outline">Save</Button>
      <Button size="sm" variant="ghost">Preview</Button>
    </template>
    <template #end>
      <Button size="sm" variant="solid">Publish</Button>
    </template>
  </Toolbar>
</template>
