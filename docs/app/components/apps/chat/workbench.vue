<script setup lang="ts">
import {
  Ai,
  AiContent,
  AiLoader,
  AiPromptInput,
  AiResponse,
  AiSuggestion,
  AiTool,
  Badge,
} from "@bysages/vue";
import { nextTick, onBeforeUnmount, ref, watch } from "vue";

import { FALLBACK_SUGGESTIONS, GREETING, SCRIPTS } from "./data";

interface ChatEntry {
  id: string;
  role: "user" | "assistant";
  content: string;
  reasoning?: string;
  tool?: { name: string; input: string; output: string };
  toolStatus?: "pending" | "running" | "completed";
  streaming?: boolean;
}

// The greeting is a constant: the transcript renders identically during
// prerender, hydration, and any later visit.
const entries = ref<ChatEntry[]>([{ id: "m0", role: "assistant", content: GREETING }]);

const prompt = ref("");
const busy = ref(false);
const suggestions = ref<string[]>(FALLBACK_SUGGESTIONS);

const logEl = ref<HTMLElement | null>(null);

// Timer state lives outside reactivity — ids and counters never render.
let timer: ReturnType<typeof setInterval> | null = null;
let toolTimer: ReturnType<typeof setTimeout> | null = null;
let entryCounter = 0;

function abort() {
  if (timer) clearInterval(timer);
  if (toolTimer) clearTimeout(toolTimer);
  timer = null;
  toolTimer = null;
  busy.value = false;
  for (const entry of entries.value) {
    if (entry.streaming) entry.streaming = false;
  }
}

function finish(entry: ChatEntry, suggestions: string[]) {
  entry.streaming = false;
  busy.value = false;
  suggestions.value = suggestions;
}

function streamText(entry: ChatEntry, text: string, suggestions: string[]) {
  const words = text.split(" ");
  let index = 0;
  entry.streaming = true;
  timer = setInterval(() => {
    entry.content += (index > 0 ? " " : "") + words[index];
    index += 1;
    if (index >= words.length) {
      if (timer) clearInterval(timer);
      timer = null;
      finish(entry, suggestions);
    }
  }, 28);
}

function send(value: string) {
  const text = value.trim();
  if (!text || busy.value) return;
  abort();

  entryCounter += 1;
  entries.value.push({ id: `m${entryCounter}`, role: "user", content: text });

  const script =
    SCRIPTS.find((entry) => entry.match.some((keyword) => text.toLowerCase().includes(keyword))) ??
    null;

  entryCounter += 1;
  const reply: ChatEntry = {
    id: `m${entryCounter}`,
    role: "assistant",
    content: "",
    reasoning: script?.reasoning,
    tool: script?.tool,
    toolStatus: script?.tool ? "pending" : undefined,
    streaming: true,
  };
  entries.value.push(reply);
  busy.value = true;
  suggestions.value = [];

  const startText = () =>
    streamText(reply, script?.text ?? FALLBACK_TEXT, script?.suggestions ?? FALLBACK_SUGGESTIONS);

  if (reply.tool) {
    const tool = reply.tool;
    // pending → running → completed, then the prose begins.
    toolTimer = setTimeout(() => {
      reply.toolStatus = "running";
      toolTimer = setTimeout(() => {
        reply.toolStatus = "completed";
        startText();
      }, 1100);
    }, 400);
  } else {
    startText();
  }
}

const FALLBACK_TEXT =
  "There is no documentation on that yet. The shelves cover the design system's tokens, components, " +
  "and workflows — try asking about theming, density, or any component family.";

// Keep the newest stroke in view as the transcript grows.
watch(
  entries,
  () => {
    void nextTick(() => {
      logEl.value?.scrollTo({ top: logEl.value.scrollHeight });
    });
  },
  { deep: true },
);

onBeforeUnmount(abort);
</script>

<template>
  <div class="grid gap-4">
    <div
      ref="logEl"
      class="max-h-[min(60dvh,40rem)] overflow-y-auto bg-surface p-5"
      aria-label="Conversation"
    >
      <Ai.Conversation>
        <template v-for="entry in entries" :key="entry.id">
          <Ai.Message v-if="entry.role === 'user'" role="user">
            <AiContent>{{ entry.content }}</AiContent>
          </Ai.Message>
          <Ai.Message v-else role="assistant">
            <AiTool
              v-if="entry.tool"
              :name="entry.tool.name"
              :status="entry.toolStatus ?? 'pending'"
              default-open
            >
              <template #input>{{ entry.tool.input }}</template>
              <template v-if="entry.toolStatus === 'completed'" #output>{{
                entry.tool.output
              }}</template>
            </AiTool>
            <Ai.Reasoning v-if="entry.reasoning" label="Thinking">
              {{ entry.reasoning }}
            </Ai.Reasoning>
            <AiResponse v-if="entry.content" :content="entry.content" />
            <AiLoader v-else-if="entry.streaming">Thinking</AiLoader>
          </Ai.Message>
        </template>
      </Ai.Conversation>
    </div>

    <div v-if="suggestions.length && !busy" class="flex flex-wrap gap-2">
      <AiSuggestion
        v-for="suggestion in suggestions"
        :key="suggestion"
        :prompt="suggestion"
        @select="prompt = $event"
      />
    </div>

    <AiPromptInput v-model="prompt" :busy="busy" @submit="send" @stop="abort">
      <template #footer>
        <Badge tone="ink" variant="outline">Simulated — no network</Badge>
      </template>
    </AiPromptInput>
  </div>
</template>
