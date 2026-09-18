<script setup lang="ts">
import { Button, FocusTrap, Input } from "@bysages/vue";
import { ref } from "vue";

const trapped = ref(false);
</script>

<template>
  <div style="display: grid; gap: var(--bs-space-4); inline-size: 100%">
    <Button @click="trapped = !trapped">
      {{ trapped ? "Release the trap" : "Trap the focus" }}
    </Button>
    <FocusTrap
      :disabled="!trapped"
      style="
        display: grid;
        gap: var(--bs-space-3);
        justify-items: start;
        inline-size: 100%;
        padding: var(--bs-space-4);
        border: 1px dashed var(--bs-color-border-strong);
        border-radius: var(--bs-radius-sm);
      "
    >
      <p
        style="margin: 0; font-size: var(--bs-font-size-sm); color: var(--bs-color-text-secondary)"
      >
        While the trap is on, Tab cycles inside this panel — the way out is the button below, and
        focus returns to where it came from.
      </p>
      <Input placeholder="First stop" style="inline-size: 16rem" />
      <Input placeholder="Second stop" style="inline-size: 16rem" />
      <Button variant="outline" @click="trapped = false">Done — release</Button>
    </FocusTrap>
  </div>
</template>
