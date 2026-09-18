<script setup lang="ts">
import { Menubar } from "@bysages/vue";
import { ref } from "vue";

const status = ref("Nothing chosen yet.");

const menus = [
  {
    label: "File",
    items: [
      { label: "New document", value: "file.new" },
      { label: "Open recent…", value: "file.open", disabled: true },
      { label: "Save", value: "file.save" },
      { label: "Delete draft", value: "file.delete", danger: true },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", value: "edit.undo" },
      { label: "Redo", value: "edit.redo" },
      { label: "Paste without format", value: "edit.paste", disabled: true },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Toggle sidebar", value: "view.sidebar" },
      { label: "Focus mode", value: "view.focus" },
    ],
  },
];

const choose = (value: string) => {
  status.value = `Chose ${value}`;
};
</script>

<template>
  <section
    style="
      background: var(--bs-color-surface-1);
      border: 1px solid var(--bs-color-border);
      border-radius: var(--bs-radius-lg);
      padding: var(--bs-space-4);
    "
  >
    <h2
      style="
        margin: 0 0 var(--bs-space-4);
        font-family: var(--bs-font-serif);
        font-size: var(--bs-font-size-lg);
      "
    >
      Draft: The paper-and-ink system
    </h2>
    <Menubar :items="menus" @select="choose" />
    <p
      role="status"
      style="
        margin-block-start: var(--bs-space-4);
        font-size: var(--bs-font-size-sm);
        color: var(--bs-color-text-tertiary);
      "
    >
      {{ status }}
    </p>
  </section>
</template>
