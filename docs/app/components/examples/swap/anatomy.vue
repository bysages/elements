<script setup lang="ts">
import { check, x } from "@bysages/icons";
import { Button, Icon, Swap } from "@bysages/vue";
import { ref } from "vue";

const swapped = ref(false);
</script>

<template>
  <Button
    variant="outline"
    size="lg"
    square
    aria-label="Toggle check"
    :aria-pressed="swapped"
    @click="swapped = !swapped"
  >
    <Swap.Root :swap="swapped">
      <Swap.Indicator type="on">
        <Icon :glyph="check" />
      </Swap.Indicator>
      <Swap.Indicator type="off">
        <Icon :glyph="x" />
      </Swap.Indicator>
    </Swap.Root>
  </Button>
</template>
