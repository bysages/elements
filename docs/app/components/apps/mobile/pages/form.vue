<script setup lang="ts">
import { Button, CheckboxGroup, Input, RadioGroup, Switch, Textarea } from "@bysages/vue";

const toast = inject("phone-toast") as (title: string) => void;

const name = ref("");
const bio = ref("");
const notify = ref(true);
const gender = ref("female");
const interests = ref<string[]>(["reading"]);

const interestOptions = [
  { label: "阅读", value: "reading" },
  { label: "运动", value: "sport" },
  { label: "旅行", value: "travel" },
];

function submit() {
  toast(name.value ? `已提交：${name.value}` : "已提交");
}
</script>

<template>
  <div class="pb-6">
    <div class="divide-y divide-border bg-surface-2">
      <label class="flex items-center gap-3 px-4 py-2.5">
        <span class="w-12 shrink-0 text-sm text-foreground">姓名</span>
        <Input v-model="name" placeholder="填写姓名" class="flex-1" />
      </label>
      <div class="flex items-center gap-3 px-4 py-2.5">
        <span class="w-12 shrink-0 text-sm text-foreground">简介</span>
        <Textarea v-model="bio" placeholder="几句话介绍自己" class="flex-1" />
      </div>
      <Switch.Root
        v-model="notify"
        class="flex w-full cursor-pointer items-center justify-between px-4 py-3"
      >
        <span class="text-sm text-foreground">邮件通知</span>
        <span class="flex items-center gap-3">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.HiddenInput />
        </span>
      </Switch.Root>
    </div>
    <div class="mt-4 bg-surface-2 px-4 py-3">
      <p class="pb-2 text-xs text-tertiary">性别</p>
      <RadioGroup.Root v-model="gender" class="flex gap-6">
        <RadioGroup.Item
          v-for="g in ['male', 'female']"
          :key="g"
          :value="g"
          class="flex cursor-pointer items-center gap-2"
        >
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText class="text-sm text-foreground">{{
            g === "male" ? "男" : "女"
          }}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      </RadioGroup.Root>
    </div>
    <div class="mt-4 bg-surface-2 px-4 py-3">
      <p class="pb-2 text-xs text-tertiary">兴趣</p>
      <CheckboxGroup v-model="interests" :options="interestOptions" />
    </div>
    <div class="px-4 pt-5">
      <Button class="w-full" @click="submit">提交</Button>
    </div>
  </div>
</template>
