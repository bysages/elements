<script setup lang="ts">
import { AiSource, AiSources } from "@bysages/vue";
</script>

<template>
  <!-- The reading list under a response: where this ink came from. -->
  <div style="inline-size: 100%; max-inline-size: 46rem">
    <AiSources>
      <AiSource href="https://example.com/ink">Ink release notes</AiSource>
      <AiSource href="https://example.com/paper">The paper-and-ink system</AiSource>
    </AiSources>
  </div>
</template>
