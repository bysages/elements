<script setup lang="ts">
import { Marquee } from "@bysages/vue";

import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).brands);
</script>

<template>
  <section class="mx-auto max-w-[64rem] px-(--bs-padding-xl) py-10">
    <p
      class="m-0 mb-(--bs-margin-lg) text-center text-xs uppercase tracking-(--bs-tracking-eyebrow) text-tertiary"
    >
      {{ copy.kicker }}
    </p>
    <Marquee.Root spacing="1.5rem">
      <Marquee.Viewport>
        <Marquee.Content>
          <Marquee.Item v-for="brand in copy.names" :key="brand" class="text-tertiary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3 3 9l9 12 9-12-9-6Z" />
            </svg>
            <span class="text-sm uppercase tracking-(--bs-tracking-eyebrow)">{{ brand }}</span>
          </Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="start" />
      <Marquee.Edge side="end" />
    </Marquee.Root>
  </section>
</template>
