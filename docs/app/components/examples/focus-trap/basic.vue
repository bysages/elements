<script setup lang="ts">
import { Button, FocusTrap, Input } from "@bysages/vue";
import { ref } from "vue";

const trapped = ref(false);
</script>

<template>
  <div class="grid gap-4 w-full">
    <Button @click="trapped = !trapped">
      {{ trapped ? "Release the trap" : "Trap the focus" }}
    </Button>
    <FocusTrap
      :disabled="!trapped"
      class="grid gap-3 justify-items-start w-full p-4 border border-dashed border-border-strong rounded-sm"
    >
      <p class="m-0 text-sm text-secondary">
        While the trap is on, Tab cycles inside this panel — the way out is the button below, and
        focus returns to where it came from.
      </p>
      <Input placeholder="First stop" class="w-64!" />
      <Input placeholder="Second stop" class="w-64!" />
      <Button variant="outline" @click="trapped = false">Done — release</Button>
    </FocusTrap>
  </div>
</template>
