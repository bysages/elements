<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import { Button, Card, FormField, Input, Select, Switch } from "@bysages/vue";
import { reactive } from "vue";

import { consoleSettings } from "./data";
import { toaster } from "./toast";

const timezones = createListCollection({
  items: [
    { label: "GMT+8 Shanghai", value: "GMT+8" },
    { label: "GMT+0 London", value: "GMT+0" },
    { label: "GMT-5 New York", value: "GMT-5" },
    { label: "GMT+9 Tokyo", value: "GMT+9" },
  ],
});

const form = reactive({ ...consoleSettings });

function save() {
  toaster.create({
    title: "Settings saved",
    description: "The workspace now runs on the new values.",
    type: "success",
  });
}
</script>

<template>
  <div class="grid content-start gap-5 lg:grid-cols-2">
    <Card.Root>
      <Card.Header>
        <Card.Title>Workspace</Card.Title>
        <Card.Description>Who this console belongs to.</Card.Description>
      </Card.Header>
      <Card.Content class="grid content-start gap-4">
        <FormField name="workspace" label="Workspace name">
          <Input v-model="form.workspace" placeholder="By Sages Console" />
        </FormField>
        <FormField name="email" label="Billing email">
          <Input v-model="form.email" type="email" placeholder="billing@example.com" />
        </FormField>
        <FormField name="timezone" label="Timezone">
          <Select.Root
            :collection="timezones"
            :model-value="[form.timezone]"
            @update:model-value="(values: string[]) => (form.timezone = values[0] ?? 'GMT+8')"
          >
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Pick a zone" />
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
        <Card.Title>Notifications</Card.Title>
        <Card.Description>What reaches the inbox, and when.</Card.Description>
      </Card.Header>
      <Card.Content class="grid content-start gap-3">
        <Switch.Root v-model="form.digest">
          <Switch.Control><Switch.Thumb /></Switch.Control>
          <Switch.Label>Daily digest</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Root>
        <Switch.Root v-model="form.anomalyAlerts">
          <Switch.Control><Switch.Thumb /></Switch.Control>
          <Switch.Label>Anomaly alerts</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Root>
        <Switch.Root v-model="form.weeklyReport">
          <Switch.Control><Switch.Thumb /></Switch.Control>
          <Switch.Label>Weekly report</Switch.Label>
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
            title: 'Settings saved',
            description: 'The workspace now runs on the new values.',
            type: 'success',
          })
        "
      >
        Save changes
      </Button>
    </div>
  </div>
</template>
