<script setup lang="ts">
import { Button, ButtonGroup, Icon } from "@bysages/vue";
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">Layers</Button>
    <Button variant="outline" square aria-label="Move up">
      <Icon name="chevron-up" />
    </Button>
    <Button variant="outline" square aria-label="Move down">
      <Icon name="chevron-down" />
    </Button>
  </ButtonGroup>
</template>
