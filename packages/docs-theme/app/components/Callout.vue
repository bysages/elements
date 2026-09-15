<script setup lang="ts">
import { Alert } from "@bysages/vue";

const props = withDefaults(
  defineProps<{
    type?: string;
  }>(),
  { type: "note" },
);

/** GitHub alert flavors land on our fixed pigments; "important" keeps
 * the solemn ink register. */
const STATUS: Record<string, string> = {
  note: "info",
  tip: "success",
  important: "ink",
  warning: "warning",
  caution: "danger",
};

const status = computed(() => STATUS[props.type.toLowerCase()] ?? "info");
</script>

<template>
  <Alert.Root :status="status" class="bs-docs-callout">
    <Alert.Icon />
    <Alert.Body>
      <Alert.Title>{{ type.charAt(0).toUpperCase() + type.slice(1) }}</Alert.Title>
      <Alert.Description><slot /></Alert.Description>
    </Alert.Body>
  </Alert.Root>
</template>
