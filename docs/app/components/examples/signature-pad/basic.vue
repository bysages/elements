<script setup lang="ts">
import { rotate_ccw } from "@bysages/icons";
import { Icon, SignaturePad } from "@bysages/vue";
</script>

<template>
  <SignaturePad.Root>
    <SignaturePad.Label>Sign below</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment />
      <SignaturePad.ClearTrigger>
        <Icon :glyph="rotate_ccw" />
      </SignaturePad.ClearTrigger>
      <SignaturePad.Guide />
    </SignaturePad.Control>
    <SignaturePad.HiddenInput />
  </SignaturePad.Root>
</template>
