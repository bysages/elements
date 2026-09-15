<script setup lang="ts">
import { Editable } from "@bysages/vue";
</script>

<template>
  <Editable.Root placeholder="Enter text…" default-value="Hello World">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Preview />
      <Editable.Input />
    </Editable.Area>
    <Editable.Control>
      <Editable.EditTrigger aria-label="Edit">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </Editable.EditTrigger>
      <Editable.SubmitTrigger aria-label="Submit">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </Editable.SubmitTrigger>
      <Editable.CancelTrigger aria-label="Cancel">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </Editable.CancelTrigger>
    </Editable.Control>
  </Editable.Root>
</template>
