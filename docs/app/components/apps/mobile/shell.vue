<script setup lang="ts">
import { createToaster, Toast, Toaster } from "@bysages/vue";
import { provide, ref, type Component } from "vue";

import BadgePage from "./pages/badge.vue";
import ButtonPage from "./pages/button.vue";
import DialogPage from "./pages/dialog.vue";
import FormPage from "./pages/form.vue";
import HomePage from "./pages/index.vue";
import ListPage from "./pages/list.vue";
import MsgPage from "./pages/msg.vue";
import ProgressPage from "./pages/progress.vue";
import TabbarPage from "./pages/tabbar.vue";
import ToastPage from "./pages/toast.vue";

/** The classic open mobile-spec sample station, replicated whole: one
 * index of grouped cells, every entry opening a live page inside the
 * same frame — navigation, dialogs, toasts and forms all run for real. */
const pages: Record<string, { title: string; comp: Component }> = {
  home: { title: "元件示例", comp: HomePage },
  button: { title: "Button 按钮", comp: ButtonPage },
  form: { title: "Form 表单", comp: FormPage },
  list: { title: "List 列表", comp: ListPage },
  badge: { title: "Badge 徽章", comp: BadgePage },
  progress: { title: "Progress 进度条", comp: ProgressPage },
  dialog: { title: "Dialog 对话框", comp: DialogPage },
  toast: { title: "Toast 轻提示", comp: ToastPage },
  msg: { title: "Msg 结果页", comp: MsgPage },
  tabbar: { title: "Tabbar 标签栏", comp: TabbarPage },
};

const current = ref("home");
const page = () => pages[current.value];

function go(name: string) {
  current.value = name;
}

const toaster = createToaster({ placement: "bottom", max: 2 });

provide("phone-nav", { go });
provide("phone-toast", (title: string) =>
  toaster.create({ title, type: "success", duration: 1800 }),
);
</script>

<template>
  <div
    data-phone
    class="relative flex h-[40rem] w-[24.375rem] max-w-full flex-col overflow-hidden rounded-xl border border-border bg-surface-0"
  >
    <header
      class="flex shrink-0 items-center gap-2 border-b border-border bg-surface-2 px-2 py-2.5"
    >
      <button
        v-if="current !== 'home'"
        class="grid size-8 cursor-pointer place-items-center rounded-sm bg-transparent text-secondary"
        aria-label="返回"
        type="button"
        @click="go('home')"
      >
        <Icon name="i-lucide-chevron-left" class="size-6" />
      </button>
      <span v-else class="size-8" />
      <span class="flex-1 text-center text-[17px] font-medium text-foreground">{{
        page().title
      }}</span>
      <span class="size-8" />
    </header>
    <div class="min-h-0 flex-1 overflow-y-auto">
      <component :is="page().comp" />
    </div>
    <Toaster :toaster="toaster" v-slot="toast">
      <Toast.Root>
        <Toast.Title>{{ toast.title }}</Toast.Title>
      </Toast.Root>
    </Toaster>
  </div>
</template>

<style>
/* Popups born inside the frame stay in the frame: the sample station
   disables the portal, so the overlay layers re-anchor from the
   viewport to this relative box. */
[data-phone] [data-scope="dialog"][data-part="positioner"],
[data-phone] [data-scope="dialog"][data-part="backdrop"] {
  position: absolute;
}
</style>
