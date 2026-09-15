<script setup lang="ts">
import { Ai } from "@bysages/vue";
</script>

<template>
  <!-- One stable measure: the canvas shrink-wraps its children, so an
       expanding fold would breathe the whole conversation wider. -->
  <div class="bs-docs-ai-demo">
    <Ai.Conversation>
      <Ai.Message role="assistant">
        <Ai.Response content="The draft is ready — three sections, one summary." />
        <Ai.Reasoning label="Thought for 2s">
          The user asked for a draft outline. Keep it to three sections and close with a summary
          line.
        </Ai.Reasoning>
      </Ai.Message>
    </Ai.Conversation>
  </div>
</template>

<style scoped>
.bs-docs-ai-demo {
  inline-size: 100%;
  max-inline-size: 46rem;
}
</style>
