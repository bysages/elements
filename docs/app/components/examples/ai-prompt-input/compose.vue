<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import {
  AiAttachment,
  AiAttachments,
  AiPromptInput,
  Button,
  Menu,
  Select,
  Toggle,
} from "@bysages/vue";
import { ref } from "vue";

// The composer at full dress: attachments above, and one tool row
// beneath the text — the plus menu, the web-search toggle and the
// model picker at the left, the seal closing the row at the right.
// Only the seal submits the form — every other trigger opts out.
const prompt = ref("");
const busy = ref(false);
const webSearch = ref(false);
const sent = ref("");

const files = ref([
  { name: "colophon.png", size: 48213, status: "ready" as "ready" | "uploading" | "error" },
  { name: "notes.md", size: 1024, status: "uploading" as "ready" | "uploading" | "error" },
]);

const models = createListCollection({
  items: [
    { label: "Hunyuan", value: "hunyuan" },
    { label: "Qinghua", value: "qinghua" },
    { label: "Celadon", value: "celadon" },
  ],
});

const picker = ref<HTMLInputElement>();

const onPicked = (event: Event) => {
  const input = event.target as HTMLInputElement;
  for (const file of input.files ?? []) {
    files.value.push({ name: file.name, size: file.size, status: "uploading" });
    setTimeout(() => {
      const found = files.value.find((f) => f.name === file.name);
      if (found) found.status = "ready";
    }, 1000);
  }
  input.value = "";
};

const remove = (name: string) => {
  files.value = files.value.filter((f) => f.name !== name);
};

const send = (value: string) => {
  sent.value = value;
  busy.value = true;
  setTimeout(() => {
    busy.value = false;
  }, 2000);
};
</script>

<template>
  <div style="display: grid; gap: 0.75rem; inline-size: 100%">
    <input ref="picker" type="file" multiple hidden @change="onPicked" />
    <AiPromptInput v-model="prompt" :busy="busy" @submit="send" @stop="busy = false">
      <template #header>
        <AiAttachments>
          <AiAttachment
            v-for="file in files"
            :key="file.name"
            :name="file.name"
            :size="file.size"
            :status="file.status"
            @remove="remove(file.name)"
          />
        </AiAttachments>
      </template>
      <template #footer>
        <Menu.Root>
          <Menu.Trigger as-child>
            <Button variant="ghost" square aria-label="Attach">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="square"
                aria-hidden="true"
              >
                <path d="M8 3.5v9M3.5 8h9" />
              </svg>
            </Button>
          </Menu.Trigger>
          <Teleport to="body">
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="image" @select="picker?.click()">Upload image</Menu.Item>
                <Menu.Item value="file" @select="picker?.click()">Upload file</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Teleport>
        </Menu.Root>
        <Toggle.Root v-model:pressed="webSearch" type="button">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="square"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="5.5" />
            <path d="M2.5 8h11M8 2.5c-3.2 3.4-3.2 7.6 0 11M8 2.5c3.2 3.4 3.2 7.6 0 11" />
          </svg>
          <span>Web search</span>
        </Toggle.Root>
      </template>
      <template #footerEnd>
        <Select.Root :collection="models" default-value="hunyuan">
          <Select.Trigger type="button" aria-label="Model">
            <Select.ValueText placeholder="Model" />
            <Select.Indicator>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="square"
                aria-hidden="true"
              >
                <path d="m4 6 4 4 4-4" />
              </svg>
            </Select.Indicator>
          </Select.Trigger>
          <Teleport to="body">
            <Select.Positioner>
              <Select.Content>
                <Select.Item v-for="item in models.items" :key="item.value" :item="item">
                  <Select.ItemText>{{ item.label }}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              </Select.Content>
            </Select.Positioner>
          </Teleport>
        </Select.Root>
      </template>
    </AiPromptInput>
    <p style="margin: 0; color: var(--bs-color-text-tertiary); font-size: var(--bs-font-size-sm)">
      {{
        busy
          ? "Working — the seal is a stop now; Enter holds its breath."
          : sent
            ? `Sent: ${sent}`
            : "Attach, pick a model, type and press Enter."
      }}
    </p>
  </div>
</template>
