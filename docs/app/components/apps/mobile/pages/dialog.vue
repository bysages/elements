<script setup lang="ts">
import { Button, Dialog } from "@bysages/vue";
import { ref } from "vue";

const toast = inject("phone-toast") as (title: string) => void;
const alertOpen = ref(false);
const confirmOpen = ref(false);
const sheetOpen = ref(false);

const actions = ["拍摄", "从相册选择", "取消"];
</script>

<template>
  <div class="space-y-3 p-4">
    <Button class="w-full" variant="outline" @click="alertOpen = true">提示对话框</Button>
    <Button class="w-full" variant="outline" @click="confirmOpen = true">确认对话框</Button>
    <Button class="w-full" variant="outline" @click="sheetOpen = true">动作面板</Button>

    <Dialog.Root v-model:open="alertOpen" :portalled="false">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content class="w-72">
          <Dialog.Title class="pt-5 text-center">提示</Dialog.Title>
          <Dialog.Description class="px-6 py-4 text-center text-sm text-secondary">
            这里是一条提示信息,说明当前发生的事情。
          </Dialog.Description>
          <div class="border-t border-border">
            <button
              class="w-full cursor-pointer bg-transparent py-3 text-center text-[17px] text-primary"
              type="button"
              @click="alertOpen = false"
            >
              确定
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>

    <Dialog.Root v-model:open="confirmOpen" :portalled="false">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content class="w-72">
          <Dialog.Title class="pt-5 text-center">确认删除</Dialog.Title>
          <Dialog.Description class="px-6 py-4 text-center text-sm text-secondary">
            删除后不可恢复,确定要删除这条记录吗?
          </Dialog.Description>
          <div class="grid grid-cols-2 border-t border-border">
            <button
              class="cursor-pointer border-r border-border bg-transparent py-3 text-center text-[17px] text-secondary"
              type="button"
              @click="confirmOpen = false"
            >
              取消
            </button>
            <button
              class="cursor-pointer bg-transparent py-3 text-center text-[17px] text-primary"
              type="button"
              @click="
                confirmOpen = false;
                toast('已删除');
              "
            >
              删除
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
              :key="action"
              class="w-full cursor-pointer bg-transparent py-3.5 text-center text-[17px]"
              :class="i === actions.length - 1 ? 'text-secondary' : 'text-foreground'"
              @click="
                sheetOpen = false;
                i < actions.length - 1 && toast(`执行了「${action}」`);
              "
            >
              {{ action }}

              type="button" >
              {{ action }}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  </div>
</template>
