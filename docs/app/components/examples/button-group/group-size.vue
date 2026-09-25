<script setup lang="ts">
import { Button, ButtonGroup } from "@bysages/vue";
</script>

<template>
  <div class="flex gap-6 items-center flex-wrap">
    <ButtonGroup size="sm">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
    <ButtonGroup size="lg">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  </div>
</template>
