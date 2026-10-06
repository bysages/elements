<script setup lang="ts">
import { Button, createToaster, Toast, Toaster } from "@bysages/vue";

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
  <Toaster :toaster="toaster" v-slot="toast">
    <Toast.Root>
      <Toast.Title>{{ toast.title }}</Toast.Title>
      <Toast.Description>{{ toast.description }}</Toast.Description>
      <Toast.CloseTrigger aria-label="Close">×</Toast.CloseTrigger>
    </Toast.Root>
  </Toaster>
</template>
