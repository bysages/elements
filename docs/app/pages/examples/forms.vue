<script setup lang="ts">
import FormsApp from "../../components/apps/forms/forms-app.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Forms example",
      description:
        "A form workbench — a validated profile card and a notification preferences card, side by side.",
    },
    header: {
      kicker: "Example",
      title: "Forms",
      lede: "The form workbench: a profile card validated as you type, beside a preferences card of switches, a digest cadence, and a save state that answers back.",
    },
  },
  zh: {
    seo: {
      title: "表单示例",
      description: "表单工作台——一张边输边校验的资料卡，配一张通知偏好卡。",
    },
    header: {
      kicker: "示例",
      title: "表单",
      lede: "表单工作台：左边一张资料卡，边输边校验；右边一张偏好卡——开关、摘要节奏，以及一声会回应的保存。",
    },
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

useSeoMeta({
  title: () => text.value.seo.title,
  description: () => text.value.seo.description,
});
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      :kicker="text.header.kicker"
      :title="text.header.title"
      :lede="text.header.lede"
      class="mb-7"
    />

    <ExampleCanvas>
      <div class="p-6 sm:p-10">
        <FormsApp />
      </div>
    </ExampleCanvas>
  </div>
</template>
