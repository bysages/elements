<script setup lang="ts">
import { Masonry } from "@bysages/vue";

import { wallItems } from "./data";
</script>

<template>
  <section id="work" class="mx-auto max-w-[64rem] scroll-mt-20 px-6 py-14">
    <header class="mb-8 max-w-[36rem]">
      <p class="m-0 mb-3 text-xs uppercase tracking-[0.14em] text-tertiary">Work</p>
      <h2 class="m-0 font-serif text-3xl leading-tight">Recent presses.</h2>
      <p class="m-0 mt-3 text-secondary">
        Cards from the past season — series, proofs, and the numbers behind them.
      </p>
    </header>

    <Masonry :columns="3" min-column="12rem" gap="lg">
      <template v-for="(item, i) in wallItems" :key="i">
        <!-- The tint cards let the pigment carry them: one accent
             attribute recolors surface and ink together. -->
        <div
          v-if="item.kind === 'tint'"
          :data-accent="item.accent"
          class="flex flex-col gap-3 rounded-lg border border-border bg-primary-subtle p-5 sm:p-7"
        >
          <span
            class="font-serif text-4xl sm:text-5xl leading-none text-primary"
            aria-hidden="true"
          >
            {{ item.glyph }}
          </span>
          <span class="text-sm text-secondary">{{ item.series }}</span>
        </div>

        <figure
          v-else-if="item.kind === 'quote'"
          class="m-0 flex flex-col gap-4 rounded-lg border border-border bg-surface-1 p-5 sm:p-7"
        >
          <blockquote class="m-0 font-serif text-xl italic leading-snug">
            &ldquo;{{ item.quote }}&rdquo;
          </blockquote>
          <figcaption class="text-sm text-tertiary">{{ item.attribution }}</figcaption>
        </figure>

        <div
          v-else-if="item.kind === 'count'"
          class="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface-2 p-5 sm:p-7 text-center"
        >
          <span class="font-serif text-5xl sm:text-6xl leading-none">{{ item.count }}</span>
          <span class="text-sm text-tertiary">{{ item.caption }}</span>
        </div>

        <p
          v-else-if="item.kind === 'note'"
          class="m-0 rounded-lg border border-border bg-surface-1 p-5 sm:p-7 text-sm leading-relaxed text-secondary"
        >
          {{ item.body }}
        </p>

        <div
          v-else
          class="flex flex-col gap-4 rounded-lg border border-border bg-surface-1 p-5 sm:p-7"
        >
          <div class="flex h-28 items-end justify-center gap-2" aria-hidden="true">
            <span
              v-for="(bar, bi) in item.bars"
              :key="bi"
              class="w-4 rounded-t-sm bg-primary"
              :style="{ height: bar + '%' }"
            />
          </div>
          <span class="text-center text-sm text-tertiary">{{ item.caption }}</span>
        </div>
      </template>
    </Masonry>
  </section>
</template>
