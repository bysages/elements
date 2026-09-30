<script setup lang="ts">
import { Accordion } from "@bysages/vue";

import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).faq);
</script>

<template>
  <section id="faq" class="mx-auto max-w-[44rem] scroll-mt-20 px-6 py-14">
    <header class="mb-8">
      <p class="m-0 mb-3 text-xs uppercase tracking-[0.14em] text-tertiary">{{ copy.kicker }}</p>
      <h2 class="m-0 font-serif text-3xl leading-tight">{{ copy.title }}</h2>
    </header>

    <Accordion.Root :default-value="['run']">
      <Accordion.Item v-for="item in copy.items" :key="item.value" :value="item.value">
        <Accordion.ItemTrigger>
          {{ item.question }}
          <Accordion.ItemIndicator>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>{{ item.answer }}</p>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  </section>
</template>
