<script setup lang="ts">
import { Button, Result } from "@bysages/vue";
</script>

<template>
  <Result.Root status="success" class="w-full">
    <Result.Icon />
    <Result.Title>The archive holds your letter</Result.Title>
    <Result.Description>
      A copy has been sealed and shelved; you will hear back once it is read.
    </Result.Description>
    <Result.Extra>
      <Button variant="solid" tone="ink" size="sm">Back to the shelf</Button>
      <Button variant="ghost" tone="ink" size="sm">Write another</Button>
    </Result.Extra>
  </Result.Root>
</template>
