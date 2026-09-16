<script setup lang="ts">
import { useChat } from "@ai-sdk/vue";
import { Ai, Button, Drawer } from "@bysages/vue";
import { DefaultChatTransport, type ToolUIPart } from "ai";

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

const { t, tm, rt } = useDocsI18n();

const { messages, sendMessage, stop, status, error } = useChat({
  transport: new DefaultChatTransport({ api: "/api/assistant" }),
});

/* The head's tools follow docus: a clear control beside the close one,
   present only while there is something to clear. */
const canClear = computed(() => messages.value.length > 0);

function clearMessages() {
  if (status.value === "streaming") stop();
  messages.value = [];
}

const text = ref("");

// The floating input handed its text over — send it and clear the hand-off.
watch(draft, (value) => {
  if (!value) return;
  draft.value = "";
  void sendMessage({ text: value });
});

const busy = computed(() => status.value !== "ready" && status.value !== "error");

/* The floating input hands its text over on open, so the prompt starts
   disabled while the reply streams — the focus trap has nothing to land
   on and settles on the panel container. When the reply settles and the
   prompt re-enables, hand the caret back, unless the reader already
   moved it somewhere of their own choosing. */
watch(
  busy,
  (isBusy, wasBusy) => {
    if (wasBusy && !isBusy && isOpen.value) {
      const active = document.activeElement as HTMLElement | null;
      if (active?.closest(".bs-docs-assistant")) {
        document.querySelector<HTMLElement>(".bs-docs-assistant textarea")?.focus();
      }
    }
  },
  { flush: "post" },
);

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

/* highlightFence arrives by Nuxt auto-import from the theme's `utils/` —
   a relative import here would break for a site that overrides this
   component. The starter questions live in the locale files, read with
   `tm` since they are an array — and each element is a compiled message
   value, so `rt` resolves it back to the string before it reaches a
   component prop. */
const starters = computed(() => {
  const messages = tm("docs.starters");
  return Array.isArray(messages) ? messages.map((message) => rt(message)) : [];
});
</script>

<template>
  <ClientOnly>
    <Root :open="isOpen" swipe-direction="end" @update:open="(value: boolean) => value || close()">
      <Backdrop />
      <Positioner>
        <Content :aria-label="t('docs.assistantTitle')" class="bs-docs-assistant">
          <div class="bs-docs-assistant-head">
            <Title>{{ t("docs.assistantTitle") }}</Title>
            <!-- data-no-autofocus keeps the trap's first stop off the
                 destructive tools and on the prompt; tabbing still
                 reaches both. -->
            <div class="bs-docs-assistant-tools">
              <Button
                v-if="canClear"
                variant="ghost"
                size="sm"
                square
                data-no-autofocus
                :aria-label="t('docs.assistantClear')"
                :title="t('docs.assistantClear')"
                @click="clearMessages"
              >
                <Icon name="i-lucide-list-x" />
              </Button>
              <CloseTrigger as-child>
                <Action data-no-autofocus :label="t('docs.assistantTitle')">✕</Action>
              </CloseTrigger>
            </div>
          </div>

          <Conversation class="bs-docs-assistant-log">
            <template v-if="messages.length === 0">
              <div class="bs-docs-assistant-empty">
                <p class="bs-docs-assistant-greeting">{{ t("docs.assistantGreeting") }}</p>
                <Suggestion
                  v-for="starter in starters"
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
                    <Response
                      v-if="part.type === 'text'"
                      :content="part.text"
                      :highlighter="highlightFence"
                    />
                    <Reasoning
                      v-else-if="part.type === 'reasoning'"
                      :label="t('docs.assistantThinking')"
                    >
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
              {{ t("docs.assistantError") }}
            </p>
          </Conversation>

          <PromptInput
            v-model="text"
            :placeholder="t('docs.assistant')"
            :disabled="busy"
            @submit="sendMessage({ text: $event })"
          />
        </Content>
      </Positioner>
    </Root>
  </ClientOnly>
</template>
