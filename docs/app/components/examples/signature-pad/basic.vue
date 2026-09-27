<script setup lang="ts">
import { Icon, SignaturePad } from "@bysages/vue";
</script>

<template>
  <SignaturePad.Root>
    <SignaturePad.Label>Sign below</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment />
      <SignaturePad.ClearTrigger>
        <Icon name="rotate-ccw" />
      </SignaturePad.ClearTrigger>
      <SignaturePad.Guide />
    </SignaturePad.Control>
    <SignaturePad.HiddenInput />
  </SignaturePad.Root>
</template>
