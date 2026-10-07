<script setup lang="ts">
import { Button, Dialog } from "@bysages/vue";

const { locale } = useI18n();
const toast = inject("phone-toast") as (title: string) => void;
const actions = [
  { id: "camera", label: { en: "Camera", zh: "拍摄" } },
  { id: "album", label: { en: "Choose from album", zh: "从相册选择" } },
  { id: "cancel", label: { en: "Cancel", zh: "取消" } },
];

const copy = {
  en: {
    alertButton: "Alert",
    alert: {
      title: "Alert",
      description: "This is an alert message describing what just happened.",
      confirm: "OK",
    },
    confirmButton: "Confirm",
    confirm: {
      title: "Delete item",
      description: "This action cannot be undone. Delete this record?",
      cancel: "Cancel",
      delete: "Delete",
      deleted: "Deleted",
    },
    sheetButton: "Action sheet",
    performed: (action: string) => `Ran “${action}”`,
  },
  zh: {
    alertButton: "提示对话框",
    alert: {
      title: "提示",
      description: "这里是一条提示信息，说明当前发生的事情。",
      confirm: "确定",
    },
    confirmButton: "确认对话框",
    confirm: {
      title: "确认删除",
      description: "删除后不可恢复，确定要删除这条记录吗？",
      cancel: "取消",
      delete: "删除",
      deleted: "已删除",
    },
    sheetButton: "动作面板",
    performed: (action: string) => `已执行「${action}」`,
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

function runAction(action: (typeof actions)[number], index: number) {
  if (index >= actions.length - 1) return;
  const language = locale.value as "en" | "zh";
  toast(text.value.performed(action.label[language]));
}
</script>

<template>
  <div class="space-y-(--bs-margin-md) p-(--bs-padding-lg)">
    <Dialog.Root :portalled="false">
      <Dialog.Trigger as-child>
        <Button class="w-full" variant="outline">{{ text.alertButton }}</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content class="w-72">
          <Dialog.Title class="pt-(--bs-padding-lg) text-center">{{
            text.alert.title
          }}</Dialog.Title>
          <Dialog.Description
            class="px-(--bs-padding-xl) py-(--bs-padding-lg) text-center text-sm text-secondary"
          >
            {{ text.alert.description }}
          </Dialog.Description>
          <div class="border-t border-border">
            <Dialog.CloseTrigger as-child>
              <button
                class="w-full cursor-pointer bg-transparent py-(--bs-padding-md) text-center text-md text-primary"
                type="button"
              >
                {{ text.alert.confirm }}
              </button>
            </Dialog.CloseTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>

    <Dialog.Root :portalled="false">
      <Dialog.Trigger as-child>
        <Button class="w-full" variant="outline">{{ text.confirmButton }}</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content class="w-72">
          <Dialog.Title class="pt-(--bs-padding-lg) text-center">{{
            text.confirm.title
          }}</Dialog.Title>
          <Dialog.Description
            class="px-(--bs-padding-xl) py-(--bs-padding-lg) text-center text-sm text-secondary"
          >
            {{ text.confirm.description }}
          </Dialog.Description>
          <div class="grid grid-cols-2 border-t border-border">
            <Dialog.CloseTrigger as-child>
              <button
                class="cursor-pointer border-r border-border bg-transparent py-(--bs-padding-md) text-center text-md text-secondary"
                type="button"
              >
                {{ text.confirm.cancel }}
              </button>
            </Dialog.CloseTrigger>
            <Dialog.CloseTrigger as-child>
              <button
                class="cursor-pointer bg-transparent py-(--bs-padding-md) text-center text-md text-danger"
                type="button"
                @click="toast(text.confirm.deleted)"
              >
                {{ text.confirm.delete }}
              </button>
            </Dialog.CloseTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>

    <Dialog.Root :portalled="false">
      <Dialog.Trigger as-child>
        <Button class="w-full" variant="outline">{{ text.sheetButton }}</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner class="items-end">
        <Dialog.Content class="w-full rounded-b-none border-x-0 border-b-0">
          <div class="divide-y divide-border py-(--bs-padding-sm)">
            <Dialog.CloseTrigger
              v-for="(action, i) in actions"
              :key="action.id"
              as-child
            >
              <button
                class="w-full cursor-pointer bg-transparent py-(--bs-padding-md) text-center text-md"
                :class="i === actions.length - 1 ? 'text-secondary' : 'text-foreground'"
                type="button"
                @click="runAction(action, i)"
              >
                {{ action.label[locale] }}
              </button>
            </Dialog.CloseTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  </div>
</template>
