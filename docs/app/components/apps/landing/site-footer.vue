<script setup lang="ts">
import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).footer);
</script>

<template>
  <footer id="contact" class="scroll-mt-20 border-t border-border bg-surface-1">
    <div class="mx-auto max-w-[64rem] px-6 py-12">
      <div class="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div class="flex flex-col gap-3">
          <p class="m-0 flex items-center gap-2">
            <span
              class="grid size-5 place-items-center rounded-sm bg-primary text-[0.6875rem] font-semibold text-primary-text"
              aria-hidden="true"
              >S</span
            >
            <span class="text-sm font-semibold">{{ copy.brand }}</span>
          </p>
          <p class="m-0 max-w-[18rem] text-sm text-secondary">{{ copy.blurb }}</p>
          <a
            href="mailto:hello@songyan.example"
            class="text-sm text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
          >
            hello@songyan.example
          </a>
        </div>

        <nav
          v-for="column in copy.columns"
          :key="column.title"
          class="flex flex-col gap-2"
          :aria-label="column.title"
        >
          <span class="text-xs uppercase tracking-[0.12em] text-tertiary">
            {{ column.title }}
          </span>
          <a
            v-for="link in column.links"
            :key="link"
            href="#top"
            class="text-sm text-secondary no-underline transition-colors hover:text-foreground"
          >
            {{ link }}
          </a>
        </nav>
      </div>

      <div
        class="m-0 mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-tertiary"
      >
        <span>{{ copy.legal }}</span>
        <span>{{ copy.credit }}</span>
      </div>
    </div>
  </footer>
</template>
