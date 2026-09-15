<script setup lang="ts">
import { useChat } from "@ai-sdk/vue";
import { Ai, Drawer } from "@bysages/vue";
import { DefaultChatTransport, type ToolUIPart } from "ai";

import { highlightFence } from "../../utils/highlight";

const {
  Conversation,
  Message,
  MessageContent,
  Response,
  Reasoning,
  Tool,
  Suggestion,
  PromptInput,
  Loader,
  Action,
} = Ai;
const { Root, Backdrop, Positioner, Content, Title, CloseTrigger } = Drawer;

const { isOpen, close, draft } = useAssistant();

const { t } = useDocsI18n();

const { messages, sendMessage, status, error } = useChat({
  transport: new DefaultChatTransport({ api: "/api/assistant" }),
});

const text = ref("");

// The floating input handed its text over — send it and clear the hand-off.
watch(draft, (value) => {
  if (!value) return;
  draft.value = "";
  void sendMessage({ text: value });
});

const busy = computed(() => status.value !== "ready" && status.value !== "error");

/** Zag-free mapping from a tool part's lifecycle to our status dot. */
const TOOL_STATUS: Record<string, "running" | "completed" | "error"> = {
  "input-streaming": "running",
  "input-available": "running",
  "output-available": "completed",
  "output-error": "error",
};

function format(value: unknown): string {
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

const STARTERS = ["What does this site cover?", "Summarize this page.", "How do I get started?"];
</script>

<template>
  <ClientOnly>
    <Root
      :open="isOpen"
      swipe-direction="end"
      @update:open="(value: boolean) => value || close()"
    >
      <Backdrop />
      <Positioner>
        <Content aria-label="AI assistant" class="bs-docs-assistant">
          <div class="bs-docs-assistant-head">
            <Title>Assistant</Title>
            <CloseTrigger as-child>
              <Action label="Close assistant">✕</Action>
            </CloseTrigger>
          </div>

          <Conversation class="bs-docs-assistant-log">
            <template v-if="messages.length === 0">
              <div class="bs-docs-assistant-empty">
                <p class="bs-docs-assistant-greeting">{{ t("docs.assistantGreeting") }}</p>
                <Suggestion
                  v-for="starter in STARTERS"
                  :key="starter"
                  :prompt="starter"
                  @select="sendMessage({ text: $event })"
                />
              </div>
            </template>

            <template v-for="message in messages" :key="message.id">
              <Message :role="message.role">
                <MessageContent v-if="message.role === 'user'">
                  {{
                    message.parts
                      .flatMap((part) => (part.type === "text" ? [part.text] : []))
                      .join("")
                  }}
                </MessageContent>
                <template v-else>
                  <template v-for="(part, index) in message.parts" :key="index">
                    <Response v-if="part.type === 'text'" :content="part.text" :highlighter="highlightFence" />
                    <Reasoning v-else-if="part.type === 'reasoning'" label="Thinking">
                      {{ part.text }}
                    </Reasoning>
                    <!-- A `tool-` prefix marks a tool invocation, but TS
                         cannot narrow a union by prefix — the assertion
                         carries what the check just proved. -->
                    <Tool
                      v-else-if="part.type.startsWith('tool-')"
                      :name="part.type.slice(5)"
                      :status="TOOL_STATUS[(part as ToolUIPart).state] ?? 'running'"
                    >
                      <template v-if="(part as ToolUIPart).input !== undefined" #input>{{
                        format((part as ToolUIPart).input)
                      }}</template>
                      <template v-if="(part as ToolUIPart).output !== undefined" #output>{{
                        format((part as ToolUIPart).output)
                      }}</template>
                    </Tool>
                  </template>
                </template>
              </Message>
            </template>

            <Loader v-if="status === 'submitted'" />
            <p v-if="error" class="bs-docs-assistant-error" role="alert">
              The ink ran dry — the assistant could not be reached.
            </p>
          </Conversation>

          <PromptInput v-model="text" :disabled="busy" @submit="sendMessage({ text: $event })" />
        </Content>
      </Positioner>
    </Root>
  </ClientOnly>
</template>
