<script setup lang="ts">
import { menu, messages_square, panel_left_close, panel_left_open, plus, x } from "@bysages/icons";
import {
  Ai,
  AiContent,
  AiLoader,
  AiPromptInput,
  AiReasoning,
  AiSuggestion,
  AiTool,
  Avatar,
  Badge,
  Button,
  Drawer,
  Icon,
  Layout,
  Popover,
  Select,
} from "@bysages/vue";
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from "vue";

import { FALLBACK_SUGGESTIONS, FALLBACK_TEXT, GREETING, SCRIPTS } from "./data";
import ThreadList from "./thread-list.vue";

const { locale } = useI18n();

const copy = {
  en: {
    workspace: "Elements AI",
    newChat: "New chat",
    recent: "Recent",
    emptyHistory: "Your local chats will appear here.",
    history: "Conversation history",
    collapseSidebar: "Collapse sidebar",
    expandSidebar: "Expand sidebar",
    closeHistory: "Close history",
    openHistory: "Open history",
    conversation: "Conversation",
    thinking: "Thinking",
    simulated: "Scripted demo — no network",
    ask: "Ask Elements AI",
    model: "Local script",
    assistant: "Elements Assistant",
    local: "Local",
    greetingTitle: "What should we make next?",
    greetingBody:
      "Ask about tokens, components, and workflow patterns. The demo streams a local script, so your words stay on this page.",
    account: "By Sages Studio",
    plan: "Studio",
  },
  zh: {
    workspace: "Elements AI",
    newChat: "新对话",
    recent: "最近",
    emptyHistory: "本地对话会显示在这里。",
    history: "对话历史",
    collapseSidebar: "折叠侧栏",
    expandSidebar: "展开侧栏",
    closeHistory: "关闭历史",
    openHistory: "打开历史",
    conversation: "对话",
    thinking: "思考中",
    simulated: "脚本演示——不联网",
    ask: "向 Elements 提问",
    model: "本地脚本",
    assistant: "Elements 助手",
    local: "本地",
    greetingTitle: "接下来做点什么？",
    greetingBody: "可以问令牌、组件与工作流模式。演示使用本地脚本，输入内容不会离开这个页面。",
    account: "By Sages Studio",
    plan: "Studio",
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

interface ChatThread {
  id: string;
  title: string;
  preview: string;
  entries: ChatEntry[];
  suggestions: string[];
}

const text = computed(() => copy[locale.value as "en" | "zh"]);
const greetingText = computed(() => GREETING[locale.value as "en" | "zh"]);
const lang = computed(() => locale.value as "en" | "zh");

const modelOptions = computed(() => [{ label: text.value.model, value: "local-script" }]);

const model = ref("local-script");

let idCounter = 0;
function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

function createThread(): ChatThread {
  return {
    id: nextId("thread"),
    title: text.value.newChat,
    preview: greetingText.value,
    entries: [],
    suggestions: [],
  };
}

const threads = ref<ChatThread[]>([createThread()]);
const activeId = ref(threads.value[0].id);
const activeThread = computed(
  () => threads.value.find((thread) => thread.id === activeId.value) ?? threads.value[0],
);
const hasConversation = computed(() => activeThread.value.entries.length > 0);

const prompt = ref("");
const busy = ref(false);
const navOpen = ref(false);
const railCollapsed = ref(false);
const historyOpen = ref(false);
const transcript = ref<HTMLElement | null>(null);

let timer: ReturnType<typeof setInterval> | null = null;
let toolTimer: ReturnType<typeof setTimeout> | null = null;

function scriptAbort() {
  if (timer) clearInterval(timer);
  if (toolTimer) clearTimeout(toolTimer);
  timer = null;
  toolTimer = null;
  busy.value = false;
  for (const entry of activeThread.value.entries) {
    if (entry.streaming) entry.streaming = false;
  }
}

function scriptFinish(entry: ChatEntry, next: string[]) {
  entry.streaming = false;
  busy.value = false;
  activeThread.value.suggestions = next;
  activeThread.value.preview = entry.content.replace(/[#*`[\]]/g, "").trim();
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

  const thread = activeThread.value;
  if (thread.title === text.value.newChat) thread.title = body;
  thread.preview = body;

  thread.entries.push({ id: nextId("message"), role: "user", content: body });

  const script =
    SCRIPTS.find((entry) => entry.match.some((keyword) => body.toLowerCase().includes(keyword))) ??
    null;

  // The entry must be a proxy of its own: the streamer writes content
  // in place, and only a reactive write wakes the transcript render.
  const reply = reactive<ChatEntry>({
    id: nextId("message"),
    role: "assistant",
    content: "",
    reasoning: script?.reasoning?.[lang.value],
    tool: script?.tool,
    toolStatus: script?.tool ? "pending" : undefined,
    streaming: true,
  });
  thread.entries.push(reply);
  busy.value = true;
  thread.suggestions = [];

  const startText = () =>
    scriptStream(
      reply,
      script?.text[lang.value] ?? FALLBACK_TEXT[lang.value],
      script?.suggestions[lang.value] ?? FALLBACK_SUGGESTIONS[lang.value],
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

function toggleRail() {
  railCollapsed.value = !railCollapsed.value;
  historyOpen.value = false;
}

function newConversation() {
  scriptAbort();
  prompt.value = "";
  if (!hasConversation.value) {
    navOpen.value = false;
    return;
  }
  const thread = createThread();
  threads.value.unshift(thread);
  activeId.value = thread.id;
  navOpen.value = false;
  historyOpen.value = false;
}

function selectThread(id: string) {
  navOpen.value = false;
  historyOpen.value = false;
  if (id === activeId.value) return;
  scriptAbort();
  activeId.value = id;
}

const visibleSuggestions = computed(() => {
  if (busy.value) return [];
  return activeThread.value.suggestions.length
    ? activeThread.value.suggestions
    : FALLBACK_SUGGESTIONS[lang.value];
});

watch(
  () => activeThread.value.entries,
  async () => {
    await nextTick();
    transcript.value?.scrollTo({ top: transcript.value.scrollHeight, behavior: "smooth" });
  },
  { deep: true, flush: "post" },
);

onBeforeUnmount(scriptAbort);
</script>

<template>
  <Layout.Root sider="start" class="ai-workbench @container h-full min-h-0!">
    <Layout.Sider
      v-model:collapsed="railCollapsed"
      width="17rem"
      collapsed-width="4.5rem"
      class="ai-rail overflow-visible! @max-[60rem]:hidden!"
      :aria-label="text.history"
    >
      <template #default="{ collapsed }">
        <div class="ai-rail-body">
          <div class="ai-brand">
            <Avatar size="sm" aria-hidden="true">
              <Avatar.Fallback>AI</Avatar.Fallback>
            </Avatar>
            <span v-if="!collapsed" class="min-w-0 flex-1 truncate">{{ text.workspace }}</span>
            <Button
              variant="ghost"
              size="sm"
              square
              :aria-label="collapsed ? text.expandSidebar : text.collapseSidebar"
              @click="toggleRail"
            >
              <Icon :glyph="collapsed ? panel_left_open : panel_left_close" />
            </Button>
          </div>

          <div class="ai-rail-actions">
            <Button
              variant="ghost"
              size="sm"
              :class="collapsed ? '' : 'w-full! justify-start!'"
              :square="collapsed"
              @click="newConversation"
            >
              <Icon :glyph="plus" />
              <span v-if="!collapsed">{{ text.newChat }}</span>
            </Button>

            <Popover.Root
              v-if="collapsed"
              :open="historyOpen"
              :positioning="{ placement: 'right-start' }"
              @update:open="historyOpen = $event"
            >
              <Popover.Trigger as-child>
                <Button
                  variant="ghost"
                  size="sm"
                  square
                  :aria-label="text.history"
                  :aria-expanded="historyOpen"
                >
                  <Icon :glyph="messages_square" />
                </Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content class="ai-history-panel">
                  <Popover.Title class="ai-rail-label">{{ text.recent }}</Popover.Title>
                  <ThreadList
                    compact
                    :threads="threads"
                    :active-id="activeId"
                    :empty-text="text.emptyHistory"
                    @select="selectThread"
                  />
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          </div>

          <div v-if="!collapsed" class="ai-rail-scroll">
            <p class="ai-rail-label">{{ text.recent }}</p>
            <ThreadList
              :threads="threads"
              :active-id="activeId"
              :empty-text="text.emptyHistory"
              @select="selectThread"
            />
          </div>
          <div v-else class="flex-1" />

          <div class="ai-account">
            <Avatar size="sm">
              <Avatar.Fallback>BS</Avatar.Fallback>
            </Avatar>
            <div v-if="!collapsed" class="min-w-0">
              <p class="m-0 truncate text-sm">{{ text.account }}</p>
              <p class="m-0 text-xs text-tertiary">{{ text.plan }}</p>
            </div>
          </div>
        </div>
      </template>
    </Layout.Sider>

    <Layout.Header>
      <Button
        variant="ghost"
        size="sm"
        square
        class="hidden! @max-[60rem]:flex!"
        :aria-label="text.openHistory"
        @click="navOpen = true"
      >
        <Icon :glyph="menu" />
      </Button>
      <h2 class="m-0 min-w-0 flex-1 truncate text-base font-semibold">
        {{ activeThread.title }}
      </h2>
      <Select
        v-model="model"
        :options="modelOptions"
        :placeholder="text.model"
        :clearable="false"
        size="sm"
        class="max-[38rem]:hidden! w-44!"
      />
      <Badge tone="success" variant="subtle">{{ text.local }}</Badge>
    </Layout.Header>

    <Layout.Content class="ai-workspace" :class="{ 'ai-workspace-empty': !hasConversation }">
      <div v-if="hasConversation" ref="transcript" class="ai-transcript">
        <Ai.Conversation class="mx-auto w-full max-w-[46rem]" :aria-label="text.conversation">
          <Ai.Message role="assistant">
            <AiContent>{{ greetingText }}</AiContent>
          </Ai.Message>

          <template v-for="entry in activeThread.entries" :key="entry.id">
            <Ai.Message :role="entry.role">
              <AiLoader v-if="!entry.reasoning && entry.streaming && !entry.content" />
              <template v-else-if="entry.reasoning">
                <AiReasoning :label="text.thinking">{{ entry.reasoning }}</AiReasoning>
                <AiTool
                  v-if="entry.tool"
                  :name="entry.tool.name"
                  :input="entry.tool.input"
                  :status="entry.toolStatus"
                >
                  {{ entry.tool.output }}
                </AiTool>
                <Ai.Response v-if="entry.content" :content="entry.content" />
              </template>
              <template v-else-if="entry.tool">
                <AiTool
                  :name="entry.tool.name"
                  :input="entry.tool.input"
                  :status="entry.toolStatus"
                >
                  {{ entry.tool.output }}
                </AiTool>
                <AiContent>{{ entry.content }}</AiContent>
              </template>
              <AiContent v-else>{{ entry.content }}</AiContent>
            </Ai.Message>
          </template>
        </Ai.Conversation>
      </div>

      <div v-else class="ai-welcome">
        <p class="ai-welcome-eyebrow">{{ text.workspace }}</p>
        <h1 class="ai-welcome-title">{{ text.greetingTitle }}</h1>
        <p class="ai-welcome-body">{{ text.greetingBody }}</p>
      </div>

      <div class="mx-auto w-full max-w-[46rem]">
        <div v-if="visibleSuggestions.length" class="ai-suggestions">
          <AiSuggestion
            v-for="suggestion in visibleSuggestions"
            :key="suggestion"
            :prompt="suggestion"
            @select="send"
          />
        </div>
        <AiPromptInput
          v-model="prompt"
          :placeholder="text.ask"
          :busy="busy"
          @submit="send"
          @stop="scriptAbort"
        >
          <template #footer>
            <Badge tone="ink" variant="outline">{{ text.simulated }}</Badge>
          </template>
        </AiPromptInput>
      </div>
    </Layout.Content>
  </Layout.Root>

  <Drawer.Root :open="navOpen" swipe-direction="left" @update:open="navOpen = $event">
    <Teleport to="body">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content :aria-label="text.history" class="ai-sheet">
          <Drawer.Title class="sr-only">{{ text.history }}</Drawer.Title>
          <div class="flex items-center justify-between gap-(--bs-gap-md)">
            <span class="text-base font-semibold">{{ text.workspace }}</span>
            <Button
              variant="ghost"
              size="sm"
              square
              :aria-label="text.closeHistory"
              @click="navOpen = false"
            >
              <Icon :glyph="x" />
            </Button>
          </div>
          <Button class="w-full!" @click="newConversation">
            <Icon :glyph="plus" />
            {{ text.newChat }}
          </Button>
          <div class="min-h-0 flex-1 overflow-y-auto">
            <p class="ai-rail-label">{{ text.recent }}</p>
            <ThreadList
              :threads="threads"
              :active-id="activeId"
              :empty-text="text.emptyHistory"
              @select="selectThread"
            />
          </div>
        </Drawer.Content>
      </Drawer.Positioner>
    </Teleport>
  </Drawer.Root>
</template>

<style scoped>
.ai-workbench {
  block-size: 100%;
  overflow: clip;
  background: var(--bs-color-surface-0);
}

.ai-rail {
  padding: var(--bs-padding-lg);
}

.ai-rail[data-collapsed] {
  padding: var(--bs-padding-sm);
}

.ai-rail-body {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-md);
  block-size: 100%;
  min-block-size: 0;
}

.ai-brand,
.ai-account {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
}

.ai-brand {
  color: var(--bs-color-text-primary);
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-lg);
}

.ai-rail[data-collapsed] .ai-brand,
.ai-rail[data-collapsed] .ai-account {
  flex-direction: column;
  align-self: center;
}

.ai-rail-actions {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
}

.ai-rail[data-collapsed] .ai-rail-actions {
  align-items: center;
}

.ai-rail-scroll {
  flex: 1 1 auto;
  min-block-size: 0;
  overflow-y: auto;
  padding-inline-end: calc(var(--bs-padding-xs) / 2);
}

.ai-rail-label {
  margin: 0 0 var(--bs-margin-sm);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  text-transform: uppercase;
}

.ai-account {
  padding-block-start: var(--bs-padding-sm);
  border-block-start: 1px solid var(--bs-color-border);
}

.ai-rail[data-collapsed] .ai-account {
  padding-block-start: 0;
  border-block-start: 0;
}

.ai-workspace {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-lg);
  min-block-size: 0;
}

.ai-workspace-empty {
  justify-content: center;
}

.ai-transcript {
  flex: 1 1 auto;
  min-block-size: 0;
  overflow-y: auto;
  padding-inline: var(--bs-padding-xs);
}

.ai-welcome {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.ai-welcome-eyebrow {
  margin: 0 0 var(--bs-margin-sm);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  text-transform: uppercase;
}

.ai-welcome-title {
  margin: 0 0 var(--bs-margin-md);
  color: var(--bs-color-text-primary);
  font-family: var(--bs-font-serif);
  font-size: clamp(var(--bs-font-size-2xl), 5vw, var(--bs-font-size-4xl));
  line-height: var(--bs-line-height-tight);
}

.ai-welcome-body {
  max-inline-size: 38rem;
  margin: 0;
  color: var(--bs-color-text-secondary);
  line-height: var(--bs-line-height-relaxed);
}

.ai-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bs-gap-sm);
  margin-block-end: var(--bs-margin-md);
}

.ai-history-panel {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
  inline-size: min(18rem, calc(100vw - 6rem));
  max-block-size: min(60dvh, 28rem);
  overflow-y: auto;
}

.ai-sheet {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-md);
  min-block-size: 50dvh;
}

@media (prefers-reduced-motion: reduce) {
  .ai-transcript {
    scroll-behavior: auto;
  }
}
</style>
