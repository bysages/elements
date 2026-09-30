<script setup lang="ts">
import { Badge, Button, Card } from "@bysages/vue";

import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).pricing);

function goTo(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section id="editions" class="mx-auto max-w-[64rem] scroll-mt-20 px-6 py-14">
    <header class="mb-8 max-w-[36rem]">
      <p class="m-0 mb-3 text-xs uppercase tracking-[0.14em] text-tertiary">{{ copy.kicker }}</p>
      <h2 class="m-0 font-serif text-3xl leading-tight">{{ copy.title }}</h2>
      <p class="m-0 mt-3 text-secondary">{{ copy.lede }}</p>
    </header>

    <div class="grid items-stretch gap-5 lg:grid-cols-3">
      <Card.Root
        v-for="plan in copy.plans"
        :key="plan.name"
        :class="plan.featured && 'border-primary'"
      >
        <Card.Header>
          <div class="flex items-center justify-between gap-2">
            <Card.Title>{{ plan.name }}</Card.Title>
            <Badge v-if="plan.featured" tone="info" variant="subtle">{{
              copy.featuredBadge
            }}</Badge>
          </div>
          <Card.Description>{{ plan.tagline }}</Card.Description>
        </Card.Header>
        <Card.Content class="grid content-start gap-5">
          <p class="m-0">
            <span class="font-serif text-4xl">{{ copy.currency }}{{ plan.price }}</span>
            <span class="text-sm text-tertiary">{{ copy.unit }}</span>
          </p>
          <ul class="m-0 flex list-none flex-col gap-2 p-0 text-sm text-secondary">
            <li v-for="line in plan.features" :key="line" class="flex items-start gap-2">
              <span class="mt-0.5 text-primary" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.5 8.5l3 3 6-7"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span>{{ line }}</span>
            </li>
          </ul>
        </Card.Content>
        <Card.Footer>
          <Button
            class="w-full!"
            :variant="plan.featured ? 'solid' : 'outline'"
            @click="goTo('#contact')"
          >
            {{ plan.cta }}
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  </section>
</template>
