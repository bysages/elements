<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import { Button, Card, FormField, Input, Select, Switch } from "@bysages/vue";
import { computed, reactive } from "vue";

import { consoleSettings, type Locale } from "./data";
import { toaster } from "./toast";

const { locale } = useI18n();

const copy = {
  en: {
    workspace: {
      title: "Workspace",
      description: "Who this console belongs to.",
      name: "Workspace name",
      namePlaceholder: "By Sages Console",
      email: "Billing email",
      emailPlaceholder: "billing@example.com",
      timezone: "Timezone",
      timezonePlaceholder: "Pick a zone",
      zones: {
        "GMT+8": "GMT+8 Shanghai",
        "GMT+0": "GMT+0 London",
        "GMT-5": "GMT-5 New York",
        "GMT+9": "GMT+9 Tokyo",
      },
    },
    notifications: {
      title: "Notifications",
      description: "What reaches the inbox, and when.",
      dailyDigest: "Daily digest",
      anomalyAlerts: "Anomaly alerts",
      weeklyReport: "Weekly report",
    },
    save: "Save changes",
    savedTitle: "Settings saved",
    savedBody: "The workspace now runs on the new values.",
  },
  zh: {
    workspace: {
      title: "工作区",
      description: "这方控制台归谁使用。",
      name: "工作区名称",
      namePlaceholder: "By Sages Console",
      email: "账单邮箱",
      emailPlaceholder: "billing@example.com",
      timezone: "时区",
      timezonePlaceholder: "选择时区",
      zones: {
        "GMT+8": "GMT+8 上海",
        "GMT+0": "GMT+0 伦敦",
        "GMT-5": "GMT-5 纽约",
        "GMT+9": "GMT+9 东京",
      },
    },
    notifications: {
      title: "通知",
      description: "哪些消息会进入收件箱，以及何时送达。",
      dailyDigest: "每日摘要",
      anomalyAlerts: "异常提醒",
      weeklyReport: "每周报表",
    },
    save: "保存更改",
    savedTitle: "设置已保存",
    savedBody: "工作区已按新配置生效。",
  },
} as const;

const text = computed(() => copy[locale.value as Locale]);

const timezones = computed(() =>
  createListCollection({
    items: ["GMT+8", "GMT+0", "GMT-5", "GMT+9"].map((value) => ({
      value,
      label: text.value.workspace.zones[value as keyof typeof text.value.workspace.zones],
    })),
  }),
);

const form = reactive({ ...consoleSettings });

function save() {
  toaster.create({
    title: text.value.savedTitle,
    description: text.value.savedBody,
    type: "success",
  });
}
</script>

<template>
  <div class="grid content-start gap-5 lg:grid-cols-2">
    <Card.Root>
      <Card.Header>
        <Card.Title>{{ text.workspace.title }}</Card.Title>
        <Card.Description>{{ text.workspace.description }}</Card.Description>
      </Card.Header>
      <Card.Content class="grid content-start gap-4">
        <FormField name="workspace" :label="text.workspace.name">
          <Input v-model="form.workspace" :placeholder="text.workspace.namePlaceholder" />
        </FormField>
        <FormField name="email" :label="text.workspace.email">
          <Input v-model="form.email" type="email" :placeholder="text.workspace.emailPlaceholder" />
        </FormField>
        <FormField name="timezone" :label="text.workspace.timezone">
          <Select.Root
            :collection="timezones"
            :model-value="[form.timezone]"
            @update:model-value="(values: string[]) => (form.timezone = values[0] ?? 'GMT+8')"
          >
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText :placeholder="text.workspace.timezonePlaceholder" />
              </Select.Trigger>
              <Select.Indicator>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Select.Indicator>
            </Select.Control>
            <Teleport to="body">
              <Select.Positioner>
                <Select.Content>
                  <Select.Item v-for="item in timezones.items" :key="item.value" :item="item">
                    <Select.ItemText>{{ item.label }}</Select.ItemText>
                  </Select.Item>
                </Select.Content>
              </Select.Positioner>
            </Teleport>
            <Select.HiddenSelect />
          </Select.Root>
        </FormField>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header>
        <Card.Title>{{ text.notifications.title }}</Card.Title>
        <Card.Description>{{ text.notifications.description }}</Card.Description>
      </Card.Header>
      <Card.Content class="grid content-start gap-3">
        <Switch.Root v-model:checked="form.digest">
          <Switch.Control><Switch.Thumb /></Switch.Control>
          <Switch.Label>{{ text.notifications.dailyDigest }}</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Root>
        <Switch.Root v-model:checked="form.anomalyAlerts">
          <Switch.Control><Switch.Thumb /></Switch.Control>
          <Switch.Label>{{ text.notifications.anomalyAlerts }}</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Root>
        <Switch.Root v-model:checked="form.weeklyReport">
          <Switch.Control><Switch.Thumb /></Switch.Control>
          <Switch.Label>{{ text.notifications.weeklyReport }}</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Root>
      </Card.Content>
    </Card.Root>

    <!-- The save belongs to the whole form, not to either card — an
         empty vessel just to host a button would be a fake object. -->
    <div class="flex justify-end lg:col-span-2">
      <Button
        @click="
          toaster.create({
            title: text.savedTitle,
            description: text.savedBody,
            type: 'success',
          })
        "
      >
        {{ text.save }}
      </Button>
    </div>
  </div>
</template>
