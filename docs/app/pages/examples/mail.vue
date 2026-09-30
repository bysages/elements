<script setup lang="ts">
import MailApp from "../../components/apps/mail/mail-app.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Mail example",
      description:
        "A three-tray mail workbench — folders, a letter list with unread and stars, and a reading pane with a composer.",
    },
    header: {
      kicker: "Example",
      title: "Mail",
      lede: "A letter room in three trays: folders on the left, a list with unread dots and stars, and a reading pane where replies and new letters are drafted in a dialog.",
    },
  },
  zh: {
    seo: {
      title: "邮件示例",
      description: "三栏邮件工作台——文件夹、带未读与星标的信件列表，以及可撰写新信的阅读栏。",
    },
    header: {
      kicker: "示例",
      title: "邮件",
      lede: "三栏的信房：左边是文件夹，中间是带未读点与星标的信件列表，右边是阅读栏——回信与新信都在对话框里落笔。",
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
        <MailApp />
      </div>
    </ExampleCanvas>
  </div>
</template>
