<script setup lang="ts">
import { Collapsible } from "@bysages/vue";
</script>

<template>
  <Collapsible.Root style="inline-size: 100%; max-inline-size: 46rem">
    <Collapsible.Trigger>
      What is a design token?
      <Collapsible.Indicator>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>
      <p>
        A named visual decision — a color, a spacing step, a radius — compiled into a CSS custom
        property. Components resolve their every value from tokens, so themes change without
        restyling.
      </p>
    </Collapsible.Content>
  </Collapsible.Root>
</template>
