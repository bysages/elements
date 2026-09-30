<script setup lang="ts">
import { Card } from "@bysages/vue";

import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).features);
</script>

<template>
  <section id="studio" class="mx-auto max-w-[64rem] scroll-mt-20 px-6 py-14">
    <header class="mb-8 max-w-[36rem]">
      <p class="m-0 mb-3 text-xs uppercase tracking-[0.14em] text-tertiary">{{ copy.kicker }}</p>
      <h2 class="m-0 font-serif text-3xl leading-tight">{{ copy.title }}</h2>
    </header>

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <Card.Root v-for="feature in copy.items" :key="feature.title">
        <Card.Content class="grid content-start gap-3">
          <span
            class="grid size-9 place-items-center rounded-sm border border-border bg-surface-2 text-secondary"
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path :d="feature.icon" />
            </svg>
          </span>
          <Card.Title class="text-lg!">{{ feature.title }}</Card.Title>
          <p class="m-0 text-sm leading-relaxed text-secondary">{{ feature.body }}</p>
        </Card.Content>
      </Card.Root>
    </div>
  </section>
</template>
