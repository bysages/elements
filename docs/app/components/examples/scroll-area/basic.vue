<script setup lang="ts">
import { ScrollArea } from "@bysages/vue";
</script>

<template>
  <ScrollArea.Root style="height: 120px">
    <ScrollArea.Viewport>
      <ScrollArea.Content>
        <p>
          The ground rests in ambient shade, and content is laid down as ink. Hierarchy rises from
          light, never from boxes or heavy rules.
        </p>
        <p>
          Surfaces keep a quiet ladder — the page, the card, the vessel — and hairlines divide where
          a heavier stroke would shout.
        </p>
        <p>
          Motion obeys the same grammar: shadows settle slowly, panels dissolve in, and the hand is
          never hurried.
        </p>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar>
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner />
  </ScrollArea.Root>
</template>
