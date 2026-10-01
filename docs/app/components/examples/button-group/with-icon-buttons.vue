<script setup lang="ts">
import { chevron_down, chevron_up } from "@bysages/icons";
import { Button, ButtonGroup, Icon } from "@bysages/vue";
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">Layers</Button>
    <Button variant="outline" square aria-label="Move up">
      <Icon :glyph="chevron_up" />
    </Button>
    <Button variant="outline" square aria-label="Move down">
      <Icon :glyph="chevron_down" />
    </Button>
  </ButtonGroup>
</template>
