<script setup lang="ts">
import { check, x } from "@bysages/icons";
import { Editable, Icon } from "@bysages/vue";
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Editable.EditTrigger>
      <Editable.SubmitTrigger aria-label="Submit">
        <Icon :glyph="check" />
      </Editable.SubmitTrigger>
      <Editable.CancelTrigger aria-label="Cancel">
        <Icon :glyph="x" />
      </Editable.CancelTrigger>
    </Editable.Control>
  </Editable.Root>
</template>
