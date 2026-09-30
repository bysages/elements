<script setup lang="ts">
import { Avatar, Card } from "@bysages/vue";

import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).voices);
</script>

<template>
  <section id="voices" class="mx-auto max-w-[64rem] scroll-mt-20 px-6 py-14">
    <header class="mb-8 max-w-[36rem]">
      <p class="m-0 mb-3 text-xs uppercase tracking-[0.14em] text-tertiary">{{ copy.kicker }}</p>
      <h2 class="m-0 font-serif text-3xl leading-tight">{{ copy.title }}</h2>
    </header>

    <div class="grid gap-5 lg:grid-cols-3">
      <Card.Root v-for="voice in copy.items" :key="voice.author">
        <Card.Content>
          <blockquote class="m-0 font-serif text-lg italic leading-snug">
            &ldquo;{{ voice.quote }}&rdquo;
          </blockquote>
        </Card.Content>
        <!-- The credits sink to the footer like the blog cards — quotes
            of unequal length still line their bylines up at the base. -->
        <Card.Footer>
          <figure class="m-0 flex items-center gap-3">
            <Avatar.Root size="sm">
              <Avatar.Fallback>{{ voice.initials }}</Avatar.Fallback>
            </Avatar.Root>
            <figcaption class="flex flex-col">
              <span class="text-sm font-medium">{{ voice.author }}</span>
              <span class="text-xs text-tertiary">{{ voice.role }}</span>
            </figcaption>
          </figure>
        </Card.Footer>
      </Card.Root>
    </div>
  </section>
</template>
