<script setup lang="ts">
const nav = inject("phone-nav") as { go(name: string): void };

const groups = [
  {
    label: "表单",
    items: [
      { id: "button", label: "Button 按钮" },
      { id: "form", label: "Form 表单" },
      { id: "list", label: "List 列表" },
    ],
  },
  {
    label: "基础组件",
    items: [
      { id: "badge", label: "Badge 徽章" },
      { id: "progress", label: "Progress 进度条" },
    ],
  },
  {
    label: "操作反馈",
    items: [
      { id: "dialog", label: "Dialog 对话框" },
      { id: "toast", label: "Toast 轻提示" },
      { id: "msg", label: "Msg 结果页" },
    ],
  },
  {
    label: "导航",
    items: [{ id: "tabbar", label: "Tabbar 标签栏" }],
  },
];
</script>

<template>
  <div class="pb-4">
    <section v-for="group in groups" :key="group.label">
      <p class="px-4 pt-4 pb-1.5 text-xs text-tertiary">{{ group.label }}</p>
      <div class="divide-y divide-border bg-surface-2">
        <button
          v-for="item in group.items"
          :key="item.id"
          class="flex w-full cursor-pointer items-center justify-between bg-transparent px-4 py-3.5 text-left text-[17px] text-foreground"
          type="button"
          @click="nav.go(item.id)"
        >
          {{ item.label }}
          <Icon name="i-lucide-chevron-right" class="size-5 text-tertiary" />
        </button>
      </div>
    </section>
    <p class="px-4 pt-5 text-center text-xs text-tertiary">以下示例均在本框内实时运行</p>
  </div>
</template>
