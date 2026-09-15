<script setup lang="ts">
import { Ai } from "@bysages/vue";
</script>

<template>
  <Ai.Conversation>
    <Ai.Message role="assistant">
      <Ai.Response content="The draft is ready — three sections, one summary." />
      <Ai.Reasoning label="Thought for 2s">
        The user asked for a draft outline. Keep it to three sections and close with a summary
        line.
      </Ai.Reasoning>
    </Ai.Message>
  </Ai.Conversation>
</template>
