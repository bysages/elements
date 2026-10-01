<script setup lang="ts">
import { Button, Dialog } from "@bysages/vue";
import { ref } from "vue";

const { locale } = useI18n();
const toast = inject("phone-toast") as (title: string) => void;
const alertOpen = ref(false);
const confirmOpen = ref(false);
const sheetOpen = ref(false);

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
  sheetOpen.value = false;
  if (index >= actions.length - 1) return;
  const language = locale.value as "en" | "zh";
  toast(text.value.performed(action.label[language]));
}
</script>

<template>
  <div class="space-y-3 p-4">
    <Button class="w-full" variant="outline" @click="alertOpen = true">{{
      text.alertButton
    }}</Button>
    <Button class="w-full" variant="outline" @click="confirmOpen = true">{{
      text.confirmButton
    }}</Button>
    <Button class="w-full" variant="outline" @click="sheetOpen = true">{{
      text.sheetButton
    }}</Button>

    <Dialog.Root v-model:open="alertOpen" :portalled="false">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content class="w-72">
          <Dialog.Title class="pt-5 text-center">{{ text.alert.title }}</Dialog.Title>
          <Dialog.Description class="px-6 py-4 text-center text-sm text-secondary">
            {{ text.alert.description }}
          </Dialog.Description>
          <div class="border-t border-border">
            <button
              class="w-full cursor-pointer bg-transparent py-3 text-center text-md text-primary"
              type="button"
              @click="alertOpen = false"
            >
              {{ text.alert.confirm }}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>

    <Dialog.Root v-model:open="confirmOpen" :portalled="false">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content class="w-72">
          <Dialog.Title class="pt-5 text-center">{{ text.confirm.title }}</Dialog.Title>
          <Dialog.Description class="px-6 py-4 text-center text-sm text-secondary">
            {{ text.confirm.description }}
          </Dialog.Description>
          <div class="grid grid-cols-2 border-t border-border">
            <button
              class="cursor-pointer border-r border-border bg-transparent py-3 text-center text-md text-secondary"
              type="button"
              @click="confirmOpen = false"
            >
              {{ text.confirm.cancel }}
            </button>
            <button
              class="cursor-pointer bg-transparent py-3 text-center text-md text-danger"
              type="button"
              @click="
                confirmOpen = false;
                toast(text.confirm.deleted);
              "
            >
              {{ text.confirm.delete }}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>

    <Dialog.Root v-model:open="sheetOpen" :portalled="false">
      <Dialog.Backdrop />
      <Dialog.Positioner class="items-end">
        <Dialog.Content class="w-full rounded-b-none border-x-0 border-b-0">
          <div class="divide-y divide-border py-2">
            <button
              v-for="(action, i) in actions"
              :key="action.id"
              class="w-full cursor-pointer bg-transparent py-3.5 text-center text-md"
              :class="i === actions.length - 1 ? 'text-secondary' : 'text-foreground'"
              type="button"
              @click="runAction(action, i)"
            >
              {{ action.label[locale] }}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  </div>
</template>
