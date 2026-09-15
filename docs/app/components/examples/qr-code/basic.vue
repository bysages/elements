<script setup lang="ts">
import { QrCode } from "@bysages/vue";
</script>

<template>
  <QrCode.Root value="https://elements.bysages.com">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
  </QrCode.Root>
</template>
