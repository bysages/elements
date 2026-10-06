<script setup lang="ts">
import { Collapsible } from "@bysages/vue";
</script>

<template>
  <Collapsible label="What is a design token?" class="w-full">
    <p>
      A named visual decision — a color, a spacing step, a radius — compiled into a CSS custom
      property. Components resolve their every value from tokens, so themes change without
      restyling.
    </p>
  </Collapsible>
</template>
