<script setup lang="ts">
import { Button, Presence } from "@bysages/vue";
import { ref } from "vue";

const shown = ref(true);
</script>

<template>
  <div class="grid w-full gap-4">
    <Button @click="shown = !shown">
      {{ shown ? "Withdraw the note" : "Show the note" }}
    </Button>
    <!-- The presence root itself carries data-state="open" / "closed";
         hang the enter and exit animations there and unmounting waits
         for the exit to finish. -->
    <Presence
      :present="shown"
      lazy-mount
      unmount-on-exit
      class="note w-full rounded-sm border border-border bg-surface-2 p-4 text-sm text-secondary"
    >
      <p class="m-0">
        Present means mounted: the element arrives with its entrance and, on the way out, stays
        mounted until the exit animation has finished.
      </p>
    </Presence>
  </div>
</template>

<style scoped>
/* The enter and exit are the demo's subject: raw keyframes riding the
 * machine's data-state, kept as the hand-written CSS it documents. */
.note[data-state="open"] {
  animation: bs-docs-note-in var(--bs-duration-slow) var(--bs-ease-out);
}

.note[data-state="closed"] {
  animation: bs-docs-note-out var(--bs-duration-base) var(--bs-ease-in);
}

@keyframes bs-docs-note-in {
  from {
    opacity: 0;
    filter: blur(4px);
  }
}

@keyframes bs-docs-note-out {
  to {
    opacity: 0;
    filter: blur(4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .note[data-state] {
    animation-duration: 1ms;
  }
}
</style>
