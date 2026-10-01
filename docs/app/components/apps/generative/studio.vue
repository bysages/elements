<script setup lang="ts">
import { Alert, Button, Input, Spinner, Stack, Typography } from "@bysages/vue";
import { registry } from "@bysages/vue/generative";
import {
  ActionProvider,
  Renderer,
  StateProvider,
  VisibilityProvider,
  useUIStream,
  ValidationProvider,
} from "@json-render/vue";
import { computed, nextTick, onUnmounted, ref, watch } from "vue";

const { locale } = useI18n();

const copy = {
  en: {
    placeholder: "Describe the interface — a revenue dashboard, a signup form…",
    generate: "Generate",
    generating: "Generating…",
    empty: "Describe an interface and it renders here, in the system's own components.",
    failure: "Generation failed",
    noContent: "The replay returned nothing — try again in a moment.",
    process: "Generation log",
    patches: "patches",
    seconds: "s",
    suggestions: [
      "A revenue dashboard with four metrics and a progress overview",
      "A signup form with name, email and a terms switch",
      "A team roster with avatars, badges and roles",
    ],
  },
  zh: {
    placeholder: "描述你想要的界面，比如一个营收仪表盘、一张报名表……",
    generate: "生成",
    generating: "生成中……",
    empty: "描述一个界面，它会在这里用 Elements 自己的组件渲染出来。",
    failure: "生成失败",
    noContent: "回放没有返回内容——请重试。",
    process: "生成日志",
    patches: "条变更",
    seconds: "秒",
    suggestions: [
      "做一个营收仪表盘：四项指标和进度总览",
      "生成一份报名表：姓名、邮箱和条款开关",
      "做一个团队名录：头像、徽章和角色",
    ],
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

// A stream can close without a single patch — an upstream that timed
// out server-side. Record it so the silence has an explanation.
const empty = ref(false);

const { spec, isStreaming, error, rawLines, send } = useUIStream({
  api: "/api/generate",
  onComplete: (final) => {
    empty.value = !final.root;
  },
});

const prompt = ref("");

function run(value: string) {
  const trimmed = value.trim();
  if (!trimmed || isStreaming.value) return;
  empty.value = false;
  send(trimmed);
}

// The process on the record: elapsed seconds plus the JSONL patches as
// they land — the generation is never a silent wait.
const elapsed = ref(0);
let ticker: ReturnType<typeof setInterval> | undefined;

watch(isStreaming, (streaming) => {
  if (streaming) {
    elapsed.value = 0;
    ticker = setInterval(() => {
      elapsed.value += 1;
    }, 1000);
  } else if (ticker) {
    clearInterval(ticker);
    ticker = undefined;
  }
});
onUnmounted(() => ticker && clearInterval(ticker));

const logEl = ref<HTMLElement | null>(null);
watch(
  () => rawLines.value.length,
  async () => {
    await nextTick();
    if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight;
  },
);
</script>

<template>
  <Stack direction="column" gap="lg">
    <Stack direction="row" gap="sm" align="center">
      <Input
        v-model="prompt"
        :placeholder="text.placeholder"
        class="min-w-0 flex-1"
        @keydown.enter.prevent="run(prompt)"
      />
      <Button :disabled="isStreaming" @click="run(prompt)">
        {{ isStreaming ? text.generating : text.generate }}
      </Button>
    </Stack>

    <Stack direction="row" gap="sm" wrap>
      <Button
        v-for="suggestion in text.suggestions"
        :key="suggestion"
        variant="subtle"
        size="sm"
        @click="run(suggestion)"
      >
        {{ suggestion }}
      </Button>
    </Stack>

    <Alert v-if="!isStreaming && empty && !spec?.root" status="warning">
      <Alert.Icon />
      <Alert.Body>
        <Alert.Title>{{ text.failure }}</Alert.Title>
        <Alert.Description>{{ text.noContent }}</Alert.Description>
      </Alert.Body>
    </Alert>

    <Alert v-if="error" status="danger">
      <Alert.Icon />
      <Alert.Body>
        <Alert.Title>{{ text.failure }}</Alert.Title>
        <Alert.Description>{{ error.message }}</Alert.Description>
      </Alert.Body>
    </Alert>

    <Stack
      v-if="isStreaming && !spec?.root"
      direction="row"
      gap="sm"
      align="center"
      justify="center"
      class="py-16"
    >
      <Spinner />
      <Typography.Muted>{{ text.generating }}</Typography.Muted>
    </Stack>

    <div
      v-else-if="spec"
      class="min-h-[24rem] rounded-lg border border-border bg-surface p-(--bs-padding-xl)"
    >
      <StateProvider :initial-state="spec.state ?? {}">
        <VisibilityProvider>
          <ValidationProvider>
            <ActionProvider>
              <Renderer :spec="spec" :registry="registry" :loading="isStreaming" />
            </ActionProvider>
          </ValidationProvider>
        </VisibilityProvider>
      </StateProvider>
    </div>

    <Typography.Muted v-else class="py-16 text-center">{{ text.empty }}</Typography.Muted>

    <div v-if="rawLines.length">
      <div class="mb-2 flex items-baseline justify-between">
        <Typography.Label>{{ text.process }}</Typography.Label>
        <Typography.Muted class="font-mono text-xs">
          {{ rawLines.length }} {{ text.patches }} · {{ elapsed }}{{ text.seconds }}
        </Typography.Muted>
      </div>
      <div
        ref="logEl"
        class="max-h-48 overflow-y-auto rounded-md border border-border bg-surface-2 p-3 font-mono text-xs leading-relaxed text-secondary"
      >
        <div v-for="(line, index) in rawLines" :key="index" class="whitespace-pre-wrap break-all">
          {{ line }}
        </div>
      </div>
    </div>
  </Stack>
</template>
