<script setup lang="ts">
import { Button, createToaster, Toaster } from "@bysages/vue";

const toaster = createToaster({
  placement: "bottom-end",
  max: 3,
});

function announce() {
  toaster.create({
    title: "Deposited",
    description: "The scroll joined the archive.",
    type: "success",
  });
}
</script>

<template>
  <Button @click="announce">Show notice</Button>
  <Toaster :toaster="toaster" />
</template>
