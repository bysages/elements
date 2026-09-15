<script setup lang="ts">
import { SignaturePad } from "@bysages/vue";
</script>

<template>
  <SignaturePad.Root>
    <SignaturePad.Label>Sign below</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment />
      <SignaturePad.ClearTrigger>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="M3 7v6h6M3.5 13a9 9 0 1 0 2-7.5" />
        </svg>
      </SignaturePad.ClearTrigger>
      <SignaturePad.Guide />
    </SignaturePad.Control>
    <SignaturePad.HiddenInput />
  </SignaturePad.Root>
</template>
