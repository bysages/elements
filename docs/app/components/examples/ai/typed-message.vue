<script setup lang="ts">
import { Ai } from "@bysages/vue";
import type { UIMessage } from "ai";
import { ref } from "vue";

type DemoMessage = UIMessage<
  unknown,
  { status: { label: string } },
  { searchWeb: { input: { query: string }; output: { hits: number } } }
>;

const message: DemoMessage = {
  id: "sdk-message",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Here is the sampled ink. The search waits for your approval before it runs.",
    },
    {
      type: "file",
      mediaType: "image/svg+xml",
      filename: "ink-sample.svg",
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 72' width='240' height='144'%3E%3Crect width='120' height='72' fill='%23f8f4ec'/%3E%3Cpath d='M18 52C36 22 82 20 102 34' stroke='%23221f1a' stroke-width='3' fill='none'/%3E%3C/svg%3E",
    },
    {
      type: "tool-searchWeb",
      toolCallId: "call-sample",
      state: "approval-requested",
      input: { query: "paper and ink release" },
      approval: { id: "approval-sample" },
    },
  ],
};

const decision = ref("");
const decide = (value: "approved" | "denied") => {
  decision.value = value;
};
</script>

<template>
  <div class="grid w-full max-w-[46rem] gap-3">
    <Ai.Message :message="message">
      <Ai.Parts :message="message" @approve="decide('approved')" @deny="decide('denied')" />
    </Ai.Message>
    <p class="m-0 text-sm text-tertiary" role="status">
      {{ decision ? `Approval ${decision}.` : "The typed tool part asks for approval." }}
    </p>
  </div>
</template>
