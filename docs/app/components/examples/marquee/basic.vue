<script setup lang="ts">
import { Marquee } from "@bysages/vue";

const entries = ["Qinghua", "Celadon", "Zhusha", "Ultramarine", "Gamboge", "Indigo"];
</script>

<template>
  <Marquee.Root spacing="1.5rem">
    <Marquee.Viewport>
      <Marquee.Content class="gap-6">
        <Marquee.Item v-for="name in entries" :key="name">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3 3 9l9 12 9-12-9-6Z" />
          </svg>
          <span>{{ name }}</span>
        </Marquee.Item>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
</template>
