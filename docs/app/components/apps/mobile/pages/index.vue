<script setup lang="ts">
const { locale } = useI18n();
const nav = inject("phone-nav") as { go(name: string): void };

const groups = [
  {
    id: "form",
    label: { en: "Forms", zh: "表单" },
    items: [
      { id: "button", label: { en: "Button", zh: "Button 按钮" } },
      { id: "form", label: { en: "Form", zh: "Form 表单" } },
      { id: "list", label: { en: "List", zh: "List 列表" } },
    ],
  },
  {
    id: "base",
    label: { en: "Basics", zh: "基础组件" },
    items: [
      { id: "badge", label: { en: "Badge", zh: "Badge 徽章" } },
      { id: "progress", label: { en: "Progress", zh: "Progress 进度条" } },
    ],
  },
  {
    id: "feedback",
    label: { en: "Feedback", zh: "操作反馈" },
    items: [
      { id: "dialog", label: { en: "Dialog", zh: "Dialog 对话框" } },
      { id: "toast", label: { en: "Toast", zh: "Toast 轻提示" } },
      { id: "msg", label: { en: "Msg page", zh: "Msg 结果页" } },
    ],
  },
  {
    id: "navigation",
    label: { en: "Navigation", zh: "导航" },
    items: [{ id: "tabbar", label: { en: "Tabbar", zh: "Tabbar 标签栏" } }],
  },
];

const copy = {
  en: { live: "All examples run live inside this frame." },
  zh: { live: "以下示例均在本框内实时运行" },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);
</script>

<template>
  <div class="pb-(--bs-padding-lg)">
    <section v-for="group in groups" :key="group.id">
      <p
        class="px-(--bs-padding-lg) pt-(--bs-padding-lg) pb-(--bs-padding-xs) text-xs text-tertiary"
      >
        {{ group.label[locale] }}
      </p>
      <div class="divide-y divide-border bg-surface-2">
        <button
          v-for="item in group.items"
          :key="item.id"
          class="flex w-full cursor-pointer items-center justify-between bg-transparent px-(--bs-padding-lg) py-(--bs-padding-md) text-left text-md text-foreground"
          type="button"
          @click="nav.go(item.id)"
        >
          {{ item.label[locale] }}
          <Icon name="i-lucide-chevron-right" class="size-5 text-tertiary" />
        </button>
      </div>
    </section>
    <p class="px-(--bs-padding-lg) pt-(--bs-padding-lg) text-center text-xs text-tertiary">
      {{ text.live }}
    </p>
  </div>
</template>
