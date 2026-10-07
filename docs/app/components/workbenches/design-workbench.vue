<script setup lang="ts">
import { Button, Card, Input, PageHeader, Switch } from "@bysages/vue";
import { computed, ref } from "vue";

import DesignPanel from "./design-panel.vue";

const { locale } = useI18n();

const email = ref("");
const digest = ref(false);

const copy = {
  en: {
    heading: "Design",
    lede: "Pair a scene with pigment, contrast, density and every token the system publishes — then take it with you as CSS.",
    preview: "Preview",
    sample: {
      title: "The scene, made legible",
      description: "A control, a field and a notice share one source of light.",
      label: "Email",
      placeholder: "reader@example.com",
      notice: "You will hear back within two working days.",
      action: "Continue",
      secondary: "Secondary",
      digest: "Weekly digest",
    },
  },
  zh: {
    heading: "设计",
    lede: "挑一个场景，配好主色、对比度、密度，再微调系统发布的任意变量，最后把整套 CSS 带走。",
    preview: "预览",
    sample: {
      title: "让场景自己说话",
      description: "控件、输入框和提示共用同一束光。",
      label: "邮箱",
      placeholder: "reader@example.com",
      notice: "两个工作日内答复。",
      action: "继续",
      secondary: "次要",
      digest: "每周摘要",
    },
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);
</script>

<template>
  <div class="grid content-start gap-(--bs-gap-xl)">
    <PageHeader>
      <PageHeader.Heading>
        <div class="min-w-0">
          <PageHeader.Title>{{ text.heading }}</PageHeader.Title>
          <PageHeader.Description>{{ text.lede }}</PageHeader.Description>
        </div>
      </PageHeader.Heading>
    </PageHeader>

    <div class="grid items-start gap-(--bs-gap-lg) xl:grid-cols-[20rem_minmax(0,1fr)_24rem]">
      <ClientOnly>
        <DesignPanel preview-id="workbench-design-preview" />
      </ClientOnly>

      <Card class="overflow-hidden xl:col-start-2 xl:row-start-1">
        <Card.Header>
          <Card.Title as-child
            ><h2>{{ text.preview }}</h2></Card.Title
          >
        </Card.Header>
        <Card.Content>
          <div
            id="workbench-design-preview"
            class="grid gap-(--bs-gap-lg) rounded-sm border border-border bg-surface-0 p-(--bs-padding-xl) transition-colors"
            data-theme="light"
            data-density="default"
          >
            <div class="grid gap-(--bs-gap-sm)">
              <h3 class="m-0 font-serif text-2xl leading-tight text-primary">
                {{ text.sample.title }}
              </h3>
              <p class="m-0 text-secondary">{{ text.sample.description }}</p>
            </div>
            <div class="grid gap-(--bs-gap-sm)">
              <label class="grid content-start gap-(--bs-gap-xs) text-sm font-medium">
                {{ text.sample.label }}
                <Input v-model="email" :placeholder="text.sample.placeholder" type="email" />
              </label>
              <Switch v-model="digest" :label="text.sample.digest" />
            </div>
            <div class="flex flex-wrap items-center gap-(--bs-gap-sm)">
              <Button>{{ text.sample.action }}</Button>
              <Button variant="outline">{{ text.sample.secondary }}</Button>
            </div>
            <p class="m-0 border-t border-border pt-(--bs-padding-md) text-sm text-tertiary">
              {{ text.sample.notice }}
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  </div>
</template>
