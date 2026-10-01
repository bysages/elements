<script setup lang="ts">
import { Button, CheckboxGroup, Input, RadioGroup, Switch, Textarea } from "@bysages/vue";

const { locale } = useI18n();
const toast = inject("phone-toast") as (title: string) => void;

const name = ref("");
const bio = ref("");
const notify = ref(true);
const gender = ref("female");
const interests = ref<string[]>(["reading"]);

const genders = [
  { value: "male", label: { en: "Male", zh: "男" } },
  { value: "female", label: { en: "Female", zh: "女" } },
];

const copy = {
  en: {
    name: "Name",
    namePlaceholder: "Enter a name",
    bio: "Bio",
    bioPlaceholder: "Tell us about yourself in a few words",
    notifications: "Email notifications",
    gender: "Gender",
    interests: "Interests",
    interestOptions: {
      reading: "Reading",
      sport: "Sports",
      travel: "Travel",
    },
    submit: "Submit",
    submitted: "Submitted",
    submittedWithName: (value: string) => `Submitted: ${value}`,
  },
  zh: {
    name: "姓名",
    namePlaceholder: "填写姓名",
    bio: "简介",
    bioPlaceholder: "几句话介绍自己",
    notifications: "邮件通知",
    gender: "性别",
    interests: "兴趣",
    interestOptions: {
      reading: "阅读",
      sport: "运动",
      travel: "旅行",
    },
    submit: "提交",
    submitted: "已提交",
    submittedWithName: (value: string) => `已提交：${value}`,
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);
const interestOptions = computed(() => [
  { label: text.value.interestOptions.reading, value: "reading" },
  { label: text.value.interestOptions.sport, value: "sport" },
  { label: text.value.interestOptions.travel, value: "travel" },
]);

function submit() {
  toast(name.value ? text.value.submittedWithName(name.value) : text.value.submitted);
}
</script>

<template>
  <div class="pb-6">
    <div class="divide-y divide-border bg-surface-2">
      <label class="flex items-center gap-3 px-4 py-2.5">
        <span class="w-12 shrink-0 text-sm text-foreground">{{ text.name }}</span>
        <Input v-model="name" :placeholder="text.namePlaceholder" class="flex-1" />
      </label>
      <div class="flex items-center gap-3 px-4 py-2.5">
        <span class="w-12 shrink-0 text-sm text-foreground">{{ text.bio }}</span>
        <Textarea v-model="bio" :placeholder="text.bioPlaceholder" class="flex-1" />
      </div>
      <Switch.Root
        v-model="notify"
        class="flex w-full cursor-pointer items-center justify-between px-4 py-3"
      >
        <span class="text-sm text-foreground">{{ text.notifications }}</span>
        <span class="flex items-center gap-3">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.HiddenInput />
        </span>
      </Switch.Root>
    </div>
    <div class="mt-4 bg-surface-2 px-4 py-3">
      <p class="pb-2 text-xs text-tertiary">{{ text.gender }}</p>
      <RadioGroup.Root v-model="gender" class="flex gap-6">
        <RadioGroup.Item
          v-for="option in genders"
          :key="option.value"
          :value="option.value"
          class="flex cursor-pointer items-center gap-2"
        >
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText class="text-sm text-foreground">{{
            option.label[locale]
          }}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      </RadioGroup.Root>
    </div>
    <div class="mt-4 bg-surface-2 px-4 py-3">
      <p class="pb-2 text-xs text-tertiary">{{ text.interests }}</p>
      <CheckboxGroup v-model="interests" :options="interestOptions" />
    </div>
    <div class="px-4 pt-5">
      <Button class="w-full" @click="submit">{{ text.submit }}</Button>
    </div>
  </div>
</template>
