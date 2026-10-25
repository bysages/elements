<script setup lang="ts">
import { AiPromptInput } from "@bysages/vue";
import { ref } from "vue";

const prompt = ref("");
const sent = ref("");
const selected = ref("");

const entries = [
  {
    label: "Lin Hua",
    value: "lin",
    group: "People",
    description: "Design systems",
    icon: "pencil",
  },
  {
    label: "Mei Chen",
    value: "mei",
    group: "People",
    description: "Editorial",
    icon: "star",
  },
  {
    label: "Search web",
    value: "search-web",
    group: "Commands",
    description: "Find current sources",
    insertText: "/search-web ",
    icon: "file",
  },
  {
    label: "Create image",
    value: "create-image",
    group: "Commands",
    description: "Draft a visual",
    insertText: "/image ",
    icon: "image",
  },
];

const onSubmit = (value: string) => {
  sent.value = value;
  prompt.value = "";
};
</script>

<template>
  <div class="grid w-full gap-3">
    <AiPromptInput
      v-model="prompt"
      placeholder="Ask the room — @Lin or /Search…"
      :mentions="{ items: entries, triggers: ['@', '/'] }"
      @select="selected = $event.label"
      @submit="onSubmit"
    />
    <p class="m-0 text-sm text-tertiary" role="status">
      {{
        sent
          ? `Sent: ${sent}`
          : selected
            ? `Selected: ${selected}`
            : "Type @ for people or / for commands."
      }}
    </p>
  </div>
</template>
