<script setup lang="ts">
import { AiContent, AiMessage } from "@bysages/vue";
</script>

<template>
  <!-- Whose stroke this is: the user's words in a recessed bubble, the
       assistant speaking flat on the paper. -->
  <div class="grid gap-4 w-full">
    <AiMessage role="user">
      <AiContent>Draft a short note announcing the ink release.</AiContent>
    </AiMessage>
    <AiMessage role="assistant">
      <AiContent>The draft is ready — three sections, one summary.</AiContent>
    </AiMessage>
  </div>
</template>
