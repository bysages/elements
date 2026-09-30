<script setup lang="ts">
import TasksApp from "../../components/apps/tasks/tasks-app.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Tasks example",
      description:
        "A task board with status filters, a priority select, completion checkboxes, and a create dialog.",
    },
    header: {
      kicker: "Example",
      title: "Tasks",
      lede: "A small press-room board: filter by state, pick a priority, tick the boxes off, and add new tasks in a dialog — every count and card moves as you work.",
    },
  },
  zh: {
    seo: {
      title: "任务清单示例",
      description: "带状态筛选、优先级选择、完成勾选与新建对话框的任务看板。",
    },
    header: {
      kicker: "示例",
      title: "任务清单",
      lede: "印坊里的小看板:按状态筛选、选优先级、勾掉完成的事，新建任务在对话框里落笔——计数与卡片随手上的活一起动。",
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
        <TasksApp />
      </div>
    </ExampleCanvas>
  </div>
</template>
