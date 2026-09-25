<script setup lang="ts">
import { Button, Tour, useTour } from "@bysages/vue";

const tour = useTour({
  steps: [
    {
      id: "welcome",
      type: "dialog",
      title: "Welcome",
      description: "A short walk through the room before the ink settles.",
      actions: [{ label: "Start", action: "next" }],
    },
    {
      id: "anchor",
      type: "tooltip",
      title: "The worktable",
      description: "Everything stays on the paper; nothing leaves the page.",
      target: () => document.getElementById("tour-anchor"),
      actions: [{ label: "Finish", action: "dismiss" }],
    },
  ],
});
</script>

<template>
  <Tour.Root :tour="tour">
    <Button @click="tour.start()">Start tour</Button>
    <div id="tour-anchor" class="p-4 border border-dashed border-border">Anchor element</div>
    <Teleport to="body">
      <Tour.Backdrop />
      <Tour.Spotlight />
      <Tour.Positioner>
        <Tour.Content>
          <Tour.ProgressText />
          <Tour.Title />
          <Tour.Description />
          <Tour.Control>
            <Tour.Actions v-slot="actions">
              <Tour.ActionTrigger v-for="action in actions" :key="action.label" :action="action">
                {{ action.label }}
              </Tour.ActionTrigger>
            </Tour.Actions>
          </Tour.Control>
        </Tour.Content>
      </Tour.Positioner>
    </Teleport>
  </Tour.Root>
</template>
