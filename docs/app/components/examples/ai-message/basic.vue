<script setup lang="ts">
import { AiContent, AiMessage } from "@bysages/vue";
</script>

<template>
  <!-- Whose stroke this is: the user's words in a recessed bubble, the
       assistant speaking flat on the paper. -->
  <div style="display: grid; gap: 1rem; inline-size: 100%; max-inline-size: 46rem">
    <AiMessage role="user">
      <AiContent>Draft a short note announcing the ink release.</AiContent>
    </AiMessage>
    <AiMessage role="assistant">
      <AiContent>The draft is ready — three sections, one summary.</AiContent>
    </AiMessage>
  </div>
</template>
