<script setup lang="ts">
import { Button, Input, InputGroup } from "@bysages/vue";
</script>

<template>
  <InputGroup style="max-inline-size: 24rem">
    <InputGroup.Addon>
      <Button variant="ghost" square aria-label="Insert handle">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
        </svg>
      </Button>
    </InputGroup.Addon>
    <Input placeholder="username" />
    <InputGroup.Addon>.com</InputGroup.Addon>
  </InputGroup>
</template>
