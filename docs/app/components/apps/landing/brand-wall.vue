<script setup lang="ts">
import { Marquee } from "@bysages/vue";

import { brands } from "./data";
</script>

<template>
  <section class="mx-auto max-w-[64rem] px-6 py-10">
    <p class="m-0 mb-5 text-center text-xs uppercase tracking-[0.14em] text-tertiary">
      Printed for
    </p>
    <Marquee.Root spacing="1.5rem">
      <Marquee.Viewport>
        <Marquee.Content>
          <Marquee.Item v-for="brand in brands" :key="brand" class="text-tertiary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3 3 9l9 12 9-12-9-6Z" />
            </svg>
            <span class="text-sm uppercase tracking-[0.14em]">{{ brand }}</span>
          </Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="start" />
      <Marquee.Edge side="end" />
    </Marquee.Root>
  </section>
</template>
