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
import { computed, onBeforeUnmount, reactive, ref } from "vue";

import { FALLBACK_SUGGESTIONS, FALLBACK_TEXT, GREETING, SCRIPTS } from "./data";

const { locale } = useI18n();

const copy = {
  en: {
    conversation: "Conversation",
    thinking: "Thinking",
    simulated: "Scripted demo — no network",
  },
  zh: {
    conversation: "对话",
    thinking: "思考中",
    simulated: "脚本演示——不联网",
  },
} as const;

interface ChatEntry {
  id: string;
  role: "user" | "assistant";
  content: string;
  reasoning?: string;
  tool?: { name: string; input: string; output: string };
  toolStatus?: "pending" | "running" | "completed";
  streaming?: boolean;
}

const text = computed(() => copy[locale.value as "en" | "zh"]);
const greetingText = computed(() => GREETING[locale.value as "en" | "zh"]);

const prompt = ref("");

const entries = ref<ChatEntry[]>([]);
const busy = ref(false);
const suggestions = ref<string[]>([]);

let timer: ReturnType<typeof setInterval> | null = null;
let toolTimer: ReturnType<typeof setTimeout> | null = null;
let entryCounter = 0;

function scriptAbort() {
  if (timer) clearInterval(timer);
  if (toolTimer) clearTimeout(toolTimer);
  timer = null;
  toolTimer = null;
  busy.value = false;
  for (const entry of entries.value) {
    if (entry.streaming) entry.streaming = false;
  }
}

function scriptFinish(entry: ChatEntry, next: string[]) {
  entry.streaming = false;
  busy.value = false;
  suggestions.value = next;
}

// CJK streams one character at a time; latin keeps its words — the
// splitter carries each run's own spacing so the join is the text.
function scriptStream(entry: ChatEntry, body: string, next: string[]) {
  const parts = body.match(
    /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]|[^\s\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]+\s*|\s+/g,
  ) ?? [body];
  let index = 0;
  entry.streaming = true;
  timer = setInterval(() => {
    entry.content += parts[index];
    index += 1;
    if (index >= parts.length) {
      if (timer) clearInterval(timer);
      timer = null;
      scriptFinish(entry, next);
    }
  }, 28);
}

function send(value: string) {
  const body = value.trim();
  if (!body || busy.value) return;
  scriptAbort();

  entryCounter += 1;
  entries.value.push({ id: `m${entryCounter}`, role: "user", content: body });

  const script =
    SCRIPTS.find((entry) => entry.match.some((keyword) => body.toLowerCase().includes(keyword))) ??
    null;

  entryCounter += 1;
  // The entry must be a proxy of its own: the streamer writes content
  // in place, and only a reactive write wakes the transcript render.
  const reply = reactive<ChatEntry>({
    id: `m${entryCounter}`,
    role: "assistant",
    content: "",
    reasoning: script?.reasoning?.[locale.value as "en" | "zh"],
    tool: script?.tool,
    toolStatus: script?.tool ? "pending" : undefined,
    streaming: true,
  });
  entries.value.push(reply);
  busy.value = true;
  suggestions.value = [];

  const lang = locale.value as "en" | "zh";
  const startText = () =>
    scriptStream(
      reply,
      script?.text[lang] ?? FALLBACK_TEXT[lang],
      script?.suggestions[lang] ?? FALLBACK_SUGGESTIONS[lang],
    );

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

// The opening suggestions stand in until a script offers its own next steps.
const visibleSuggestions = computed(() => {
  if (busy.value) return [];
  return suggestions.value.length
    ? suggestions.value
    : FALLBACK_SUGGESTIONS[locale.value as "en" | "zh"];
});

onBeforeUnmount(scriptAbort);
</script>

<template>
  <div class="grid gap-(--bs-gap-lg)">
    <Ai.Conversation
      class="max-h-[min(60dvh,40rem)] overflow-y-auto bg-surface p-(--bs-padding-lg)"
      :aria-label="text.conversation"
    >
      <Ai.Message role="assistant">
        <AiContent>{{ greetingText }}</AiContent>
      </Ai.Message>
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
          <Ai.Reasoning v-if="entry.reasoning" :label="text.thinking">
            {{ entry.reasoning }}
          </Ai.Reasoning>
          <AiResponse v-if="entry.content" :content="entry.content" />
          <AiLoader v-else-if="entry.streaming">{{ text.thinking }}</AiLoader>
        </Ai.Message>
      </template>
    </Ai.Conversation>

    <div v-if="visibleSuggestions.length" class="flex flex-wrap gap-(--bs-gap-sm)">
      <AiSuggestion
        v-for="suggestion in visibleSuggestions"
        :key="suggestion"
        :prompt="suggestion"
        @select="prompt = $event"
      />
    </div>

    <AiPromptInput v-model="prompt" :busy="busy" @submit="send" @stop="scriptAbort">
      <template #footer>
        <Badge tone="ink" variant="outline">{{ text.simulated }}</Badge>
      </template>
    </AiPromptInput>
  </div>
</template>
