<script setup lang="ts">
import { Terminal } from "@bysages/vue";
import { ref } from "vue";

const lines = ref(["paper 0.1.0", "Type help to see what the console knows."]);

function run(text: string) {
  if (text === "clear") {
    lines.value = [];
    return;
  }
  lines.value.push(`❯ ${text}`);
  lines.value.push(text === "help" ? "Commands: help, clear" : `unknown command: ${text}`);
}
</script>

<template>
  <Terminal
    :lines="lines"
    prompt="❯"
    placeholder="Type a command…"
    label="Paper console"
    class="w-full max-w-xl"
    @command="run"
  />
</template>
