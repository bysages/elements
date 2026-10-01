<script setup lang="ts">
import { Masonry } from "@bysages/vue";

import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).gallery);
</script>

<template>
  <section id="work" class="mx-auto max-w-[64rem] scroll-mt-20 px-(--bs-padding-xl) py-16">
    <header class="mb-(--bs-margin-2xl) max-w-[36rem]">
      <p
        class="m-0 mb-(--bs-margin-md) text-xs uppercase tracking-(--bs-tracking-eyebrow) text-tertiary"
      >
        {{ copy.kicker }}
      </p>
      <h2 class="m-0 font-serif text-3xl leading-tight">{{ copy.title }}</h2>
      <p class="m-0 mt-(--bs-margin-md) text-secondary">{{ copy.lede }}</p>
    </header>

    <Masonry :columns="3" min-column="12rem" gap="lg">
      <template v-for="(item, i) in copy.items" :key="i">
        <!-- The tint cards let the pigment carry them: one accent
             attribute recolors surface and ink together. -->
        <div
          v-if="item.kind === 'tint'"
          :data-accent="item.accent"
          class="flex flex-col gap-(--bs-gap-md) rounded-lg border border-border bg-primary-subtle p-(--bs-padding-lg) sm:p-(--bs-padding-xl)"
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
          class="m-0 flex flex-col gap-(--bs-gap-lg) rounded-lg border border-border bg-surface-1 p-(--bs-padding-lg) sm:p-(--bs-padding-xl)"
        >
          <blockquote class="m-0 font-serif text-xl italic leading-snug">
            &ldquo;{{ item.quote }}&rdquo;
          </blockquote>
          <figcaption class="text-sm text-tertiary">
            {{ item.attribution }}
          </figcaption>
        </figure>

        <div
          v-else-if="item.kind === 'count'"
          class="flex flex-col items-center gap-(--bs-gap-sm) rounded-lg border border-border bg-surface-2 p-(--bs-padding-lg) sm:p-(--bs-padding-xl) text-center"
        >
          <span class="font-serif text-5xl sm:text-6xl leading-none">{{ item.count }}</span>
          <span class="text-sm text-tertiary">{{ item.caption }}</span>
        </div>

        <p
          v-else-if="item.kind === 'note'"
          class="m-0 rounded-lg border border-border bg-surface-1 p-(--bs-padding-lg) sm:p-(--bs-padding-xl) text-sm leading-relaxed text-secondary"
        >
          {{ item.body }}
        </p>

        <div
          v-else
          class="flex flex-col gap-(--bs-gap-lg) rounded-lg border border-border bg-surface-1 p-(--bs-padding-lg) sm:p-(--bs-padding-xl)"
        >
          <div class="flex h-28 items-end justify-center gap-(--bs-gap-sm)" aria-hidden="true">
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
