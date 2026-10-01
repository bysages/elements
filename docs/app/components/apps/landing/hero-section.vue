<script setup lang="ts">
import { Button, Card } from "@bysages/vue";

import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).hero);

// The document's smooth scroll carries plain anchors; the CTAs are real
// buttons, so they walk the same path by hand.
function goTo(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section
    id="top"
    class="mx-auto grid max-w-[64rem] gap-10 px-(--bs-padding-xl) pb-16 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
  >
    <div>
      <p
        class="m-0 mb-(--bs-margin-lg) text-xs uppercase tracking-(--bs-tracking-eyebrow) text-tertiary"
      >
        {{ copy.eyebrow }}
      </p>
      <h1 class="m-0 font-serif text-5xl leading-[1.08] text-balance sm:text-6xl">
        {{ copy.title }}
      </h1>
      <p class="m-0 mt-(--bs-margin-lg) max-w-[34rem] text-lg text-secondary">
        {{ copy.lede }}
      </p>
      <div class="mt-(--bs-margin-2xl) flex flex-wrap gap-(--bs-gap-md)">
        <Button @click="goTo('#work')">{{ copy.primaryCta }}</Button>
        <Button variant="outline" @click="goTo('#studio')">{{ copy.secondaryCta }}</Button>
      </div>
    </div>

    <!-- A type specimen plate: the glyph is the product, the swatch dots
         read their pigment from the accent each one declares. -->
    <Card.Root class="w-full max-w-[24rem] justify-self-center">
      <Card.Header>
        <Card.Description>{{ copy.specimen.title }}</Card.Description>
      </Card.Header>
      <Card.Content class="flex flex-col items-center gap-(--bs-gap-xl)">
        <span class="font-serif text-[7rem] leading-none" aria-hidden="true">
          {{ copy.specimen.glyph }}
        </span>
        <div class="flex w-full justify-between">
          <div
            v-for="sw in copy.specimen.swatches"
            :key="sw.accent"
            class="flex flex-col items-center gap-(--bs-gap-sm)"
            :data-accent="sw.accent"
          >
            <span class="size-6 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-xs text-tertiary">{{ sw.name }}</span>
          </div>
        </div>
      </Card.Content>
      <Card.Footer class="justify-between! text-xs text-tertiary">
        <span v-for="note in copy.specimen.notes" :key="note">{{ note }}</span>
      </Card.Footer>
    </Card.Root>
  </section>
</template>
