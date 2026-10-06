<script setup lang="ts">
import { Terminal } from "@bysages/vue";
import { onMounted, onUnmounted, ref } from "vue";

const lines = ref(["Browser console bridge ready. Try: log Hello from the page."]);
let restoreConsole: (() => void) | null = null;

function format(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.stack ?? value.message;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function append(line: string) {
  lines.value.push(line);
}

function run(text: string) {
  append(`❯ ${text}`);
  const [command = "", ...arguments_] = text.trim().split(/\s+/);
  const message = arguments_.join(" ") || "Hello from the page.";

  if (command === "clear") {
    lines.value = [];
    return;
  }
  if (command === "help") {
    append("Commands: help, clear, log, info, warn, error");
    return;
  }
  if (command === "log" || command === "info" || command === "warn" || command === "error") {
    console[command](message);
    return;
  }
  append(`unknown command: ${text}`);
}

onMounted(() => {
  const original = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
  };
  const levels = ["log", "info", "warn", "error"] as const;

  for (const level of levels) {
    console[level] = (...args: unknown[]) => {
      original[level](...args);
      append(`[${level}] ${args.map(format).join(" ")}`);
    };
  }

  restoreConsole = () => {
    for (const level of levels) console[level] = original[level];
  };
});

onUnmounted(() => restoreConsole?.());
</script>

<template>
  <Terminal
    :lines="lines"
    prompt="❯"
    placeholder="Type a command…"
    label="Browser console"
    class="w-full max-w-xl"
    @command="run"
  />
</template>
