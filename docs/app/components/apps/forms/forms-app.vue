<script setup lang="ts">
import {
  Button,
  Card,
  Field,
  Form,
  FormField,
  Input,
  Select,
  Switch,
  Textarea,
  useForm,
} from "@bysages/vue";
import { computed, ref } from "vue";
import { z } from "zod";

const { locale } = useI18n();

const copy = {
  en: {
    profile: {
      title: "Profile",
      lede: "How the colophon signs your work.",
      name: "Display name",
      namePlaceholder: "How you sign the press",
      email: "Email",
      bio: "Bio",
      bioPlaceholder: "A few lines for the About leaf",
      save: "Save changes",
      saved: "Saved.",
    },
    notify: {
      title: "Notifications",
      lede: "What is allowed to interrupt the quiet.",
      orders: "Order updates",
      letters: "Letters from the bindery",
      weekly: "Weekly digest",
      frequency: "Digest frequency",
      daily: "Daily",
      weeklyLabel: "Weekly",
      monthly: "Monthly",
      save: "Save preferences",
      saved: "Preferences saved.",
    },
  },
  zh: {
    profile: {
      title: "个人资料",
      lede: "版权页如何署你的名。",
      name: "显示名称",
      namePlaceholder: "你在版权页上的签名",
      email: "邮箱",
      bio: "简介",
      bioPlaceholder: "写给「关于」页的几行",
      save: "保存修改",
      saved: "已保存。",
    },
    notify: {
      title: "通知偏好",
      lede: "什么可以打断安静。",
      orders: "订单动态",
      letters: "装订坊来信",
      weekly: "每周摘要",
      frequency: "摘要频率",
      daily: "每天",
      weeklyLabel: "每周",
      monthly: "每月",
      save: "保存偏好",
      saved: "偏好已保存。",
    },
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

const profileStatus = ref("");

const profileForm = useForm({
  defaultValues: {
    name: "Sage Wei",
    email: "sage@songyan.press",
    bio: "Keeper of the composing stick at a two-press studio in Huizhou.",
  },
  validators: {
    onChange: z.object({
      name: z
        .string()
        .min(1, locale.value === "zh" ? "请填写显示名称。" : "The display name is required."),
      email: z
        .string()
        .email(locale.value === "zh" ? "邮箱格式不对。" : "That is not an email address."),
      bio: z
        .string()
        .max(
          160,
          locale.value === "zh" ? "简介不超过一百六十字。" : "Keep the bio under 160 characters.",
        ),
    }),
  },
  onSubmit: () => {
    profileStatus.value = text.value.profile.saved;
  },
});

const notifyStatus = ref("");
const orders = ref(true);
const letters = ref(true);
const weekly = ref(false);

const frequencyOptions = computed(() =>
  (["daily", "weekly", "monthly"] as const).map((value) => ({
    value,
    label: text.value.notify[value === "weekly" ? "weeklyLabel" : value],
  })),
);
const frequency = ref("weekly");
</script>

<template>
  <div class="grid gap-(--bs-gap-xl) lg:grid-cols-2">
    <Card>
      <Card.Header>
        <Card.Title>{{ text.profile.title }}</Card.Title>
        <Card.Description>{{ text.profile.lede }}</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form :form="profileForm" class="w-full max-w-full!">
          <FormField name="name" :label="text.profile.name" required>
            <template #default="{ field }">
              <Input
                :model-value="field.state.value"
                :placeholder="text.profile.namePlaceholder"
                @update:model-value="field.handleChange"
                @blur="field.handleBlur"
              />
            </template>
          </FormField>
          <FormField name="email" :label="text.profile.email" required>
            <template #default="{ field }">
              <Input
                :model-value="field.state.value"
                type="email"
                @update:model-value="field.handleChange"
                @blur="field.handleBlur"
              />
            </template>
          </FormField>
          <FormField
            name="bio"
            :label="text.profile.bio"
            :hint="locale === 'zh' ? '一百六十字以内' : 'Under 160 characters'"
          >
            <template #default="{ field }">
              <Textarea
                :model-value="field.state.value"
                :rows="4"
                :placeholder="text.profile.bioPlaceholder"
                @update:model-value="field.handleChange"
                @blur="field.handleBlur"
              />
            </template>
          </FormField>
          <Button type="submit">{{ text.profile.save }}</Button>
        </Form>
        <p role="status" class="m-0 mt-(--bs-margin-md) text-sm text-tertiary">
          {{ profileStatus }}
        </p>
      </Card.Content>
    </Card>

    <Card>
      <Card.Header>
        <Card.Title>{{ text.notify.title }}</Card.Title>
        <Card.Description>{{ text.notify.lede }}</Card.Description>
      </Card.Header>
      <Card.Content class="grid content-start gap-(--bs-gap-xs)">
        <label
          class="flex items-center justify-between gap-(--bs-gap-lg) border-b border-border py-(--bs-padding-md)"
        >
          <span class="text-sm">{{ text.notify.orders }}</span>
          <Switch v-model="orders" />
        </label>
        <label
          class="flex items-center justify-between gap-(--bs-gap-lg) border-b border-border py-(--bs-padding-md)"
        >
          <span class="text-sm">{{ text.notify.letters }}</span>
          <Switch v-model="letters" />
        </label>
        <label
          class="flex items-center justify-between gap-(--bs-gap-lg) border-b border-border py-(--bs-padding-md)"
        >
          <span class="text-sm">{{ text.notify.weekly }}</span>
          <Switch v-model="weekly" />
        </label>

        <Field.Root class="mt-(--bs-margin-lg)">
          <Field.Label>{{ text.notify.frequency }}</Field.Label>
          <Select v-model="frequency" :options="frequencyOptions" :clearable="false" />
        </Field.Root>

        <div class="mt-(--bs-margin-lg)">
          <Button @click="notifyStatus = text.notify.saved">{{ text.notify.save }}</Button>
        </div>
        <p role="status" class="m-0 text-sm text-tertiary">
          {{ notifyStatus }}
        </p>
      </Card.Content>
    </Card>
  </div>
</template>
