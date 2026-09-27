<script setup lang="ts">
import { Button, Card } from "@bysages/vue";

import { swatches } from "./data";

// The document's smooth scroll carries plain anchors; the CTAs are real
// buttons, so they walk the same path by hand.
function goTo(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section
    id="top"
    class="mx-auto grid max-w-[64rem] gap-10 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
  >
    <div>
      <p class="m-0 mb-4 text-xs uppercase tracking-[0.14em] text-tertiary">
        Songyan Press · a stationery works
      </p>
      <h1 class="m-0 font-serif text-5xl leading-[1.08] text-balance sm:text-6xl">
        Paper that answers to the hand.
      </h1>
      <p class="m-0 mt-5 max-w-[34rem] text-lg text-secondary">
        Letterpress stationery from a two-press studio in Huizhou — set by hand, inked in twelve
        house pigments, bound to outlast the inbox it announces.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <Button @click="goTo('#work')">Browse the work</Button>
        <Button variant="outline" @click="goTo('#studio')">Meet the inks</Button>
      </div>
    </div>

    <!-- A type specimen plate: the glyph is the product, the swatch dots
         read their pigment from the accent each one declares. -->
    <Card.Root class="w-full max-w-[24rem] justify-self-center">
      <Card.Header>
        <Card.Description>Ink No. 04 — Qinghua</Card.Description>
      </Card.Header>
      <Card.Content class="flex flex-col items-center gap-6">
        <span class="font-serif text-[7rem] leading-none" aria-hidden="true">圓</span>
        <div class="flex w-full justify-between">
          <div
            v-for="sw in swatches"
            :key="sw.name"
            class="flex flex-col items-center gap-2"
            :data-accent="sw.accent"
          >
            <span class="size-6 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-xs text-tertiary">{{ sw.name }}</span>
          </div>
        </div>
      </Card.Content>
      <Card.Footer class="justify-between! text-xs text-tertiary">
        <span>Cobalt ground from lapis</span>
        <span>Sheets 110–320 gsm</span>
      </Card.Footer>
    </Card.Root>
  </section>
</template>
